import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import axios from 'axios';
import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationError';

import { useToast } from '../../hooks/toast';

import { Container, FormContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { User as IUser } from '../../hooks/auth';

interface IViaCEPResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  erro?: boolean;
}

interface UserFormData {
  name: string;
  cpf: string;
  email: string;
  password: string;

  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  number: string;
}

const User: React.FC = () => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const params = useParams<{ id: string }>();

  const editing = useMemo(() => !!params.id, [params.id]);

  useEffect(() => {
    async function getUser(): Promise<void> {
      if (params.id) {
        setLoading(true);

        const response = await api.get<IUser>(`users/${params.id}`);

        setUser(response.data);

        setLoading(false);
      }
    }

    getUser();
  }, [params.id]);

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Obrigatório'),
          cpf: Yup.string().required('Obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Obrigatório'),
          password: Yup.string()
            .min(4, 'No mínimo 4 caracteres')
            .required('Obrigatório'),
          address: Yup.object().shape({
            cep: Yup.string().required('Obrigatório'),
            street: Yup.string().required('Obrigatório'),
            number: Yup.number().required('Obrigatório'),
            neighborhood: Yup.string().required('Obrigatório'),
            city: Yup.string().required('Obrigatório'),
          }),
        });

        await schema.validate(data, { abortEarly: false });

        if (params.id) {
          await api.put(`users/${params.id}`, data);
        } else {
          await api.post('users', data);
        }

        addToast({
          type: 'success',
          title: `Usuário ${editing ? 'editado' : 'cadastrado'} com sucesso!`,
        });

        formRef.current?.reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: `Erro ao ${editing ? 'editar' : 'cadastrar'} usuário`,
          description: `Ocorreu um erro ao ${
            editing ? 'editar' : 'realizar'
          } o cadastro, tente novamente.`,
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, editing, params.id],
  );

  const handleChangeCPF = useCallback((cpf: string) => {
    const unformattedCpf = cpf.replace(/(\.|-|\s|\W|[A-Za-z])/g, '');

    const formattedCpf = unformattedCpf.replace(
      /(\d{3}).?(\d{3}).?(\d{3})-?(\d{2})/g,
      '$1.$2.$3-$4',
    );

    formRef.current?.setFieldValue('cpf', formattedCpf);
  }, []);

  const handleChangeCEP = useCallback(
    async (cep: string) => {
      let unformattedCep = cep.replace(/(\.|-|\s|\W|[A-Za-z])/g, '');

      if (unformattedCep.length > 8) {
        unformattedCep = unformattedCep.substring(0, 8);
      }

      if (unformattedCep.length === 8) {
        const { data } = await axios.get<IViaCEPResponse>(
          `https://viacep.com.br/ws/${unformattedCep}/json/`,
        );

        if (data.erro) {
          addToast({
            type: 'error',
            title: 'Falha ao encontrar CEP',
            description: 'Digite um CEP válido.',
          });
        } else {
          formRef.current?.setData({
            address: {
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
            },
          });

          const inputRef = formRef.current?.getFieldRef('address.number');

          inputRef.focus();
        }
      }

      const formattedCep = unformattedCep.replace(/(\d{5})(\d{3})/, '$1-$2');

      formRef.current?.setFieldValue('address.cep', formattedCep);
    },
    [addToast],
  );

  return (
    <Container>
      <FormContainer>
        <h3>{editing ? 'Alterar cadastro' : 'Cadastrar usuário'}</h3>

        <Form ref={formRef} onSubmit={handleSubmit} initialData={user}>
          <Input name="name" placeholder="Nome" />
          <Input
            name="cpf"
            placeholder="CPF"
            onChange={e => handleChangeCPF(e.target.value)}
          />
          <Input name="email" placeholder="E-mail" />
          <Input name="password" placeholder="Senha" type="password" />

          <h4>Endereço</h4>
          <Scope path="address">
            <Input
              name="cep"
              placeholder="CEP"
              onChange={e => handleChangeCEP(e.target.value)}
            />
            <Input name="street" placeholder="Rua" disabled />
            <Input name="neighborhood" placeholder="Bairro" disabled />
            <Input name="city" placeholder="Cidade" disabled />
            <Input name="number" placeholder="Número" />
          </Scope>

          <Button loading={loading} type="submit">
            {editing ? 'Salvar' : 'Cadastrar'}
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default User;
