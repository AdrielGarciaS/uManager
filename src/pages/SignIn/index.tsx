import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationError';

import { Container, Content, Header, FormContainer } from './styles';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import hello from '../../assets/hello.png';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Obrigatório'),
          password: Yup.string().required('Obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const { email, password } = data;

        await signIn({
          email,
          password,
        });

        addToast({
          type: 'success',
          title: 'Logon realizado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        if (err.message) {
          addToast({
            type: 'error',
            title: 'Erro no login',
            description: err.message,
          });

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no login',
          description:
            'Ocorreu um erro ao tentar realizar o cadastro, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, signIn],
  );

  return (
    <Container>
      <Content>
        <Header>
          <section>
            <h1>Olá,</h1>
            <p>Que bom ver você de novo!</p>
          </section>

          <img src={hello} alt="Hello" />
        </Header>

        <FormContainer>
          <h3>Faça seu logon</h3>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              placeholder="Senha"
              type="password"
            />

            <Button loading={loading} type="submit">
              Entrar
            </Button>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
