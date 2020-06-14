/* eslint-disable no-alert */
import React, { useState, useEffect, useCallback } from 'react';
import { FiSearch, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import { Container, Search, User, UserInfo, UserAddress } from './styles';

import { User as IUser } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { addToast } = useToast();

  const handleDeleteUser = useCallback(
    async (user: IUser) => {
      try {
        const confirm = window.confirm(
          `Confirma a exclusão do usuário ${user.name}?`,
        );

        if (!confirm) return;

        await api.delete(`users/${user.id}`);

        setUsers(state => {
          return state.filter(filterUser => filterUser.id !== user.id);
        });

        addToast({
          type: 'success',
          title: 'Usuário deletado com sucesso!',
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar usuário',
          description: 'Ocorreu um erro ao deletar o usuário, tente novamente',
        });
      }
    },
    [addToast],
  );

  const handleScroll = useCallback(async () => {
    if (
      document.documentElement.clientHeight +
        document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage(state => state + 1);
    }
  }, []);

  useEffect(() => {
    api
      .get(`users?q=${search}&_page=${page}${!search && '&_limit=20'}`)
      .then(response => {
        setUsers(state => {
          if (search) {
            return response.data;
          }

          if (response.data.length > 0) {
            return [...state, ...response.data];
          }

          return state;
        });
      });
  }, [page, search]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Container>
      <section>
        <h1>Usuários</h1>

        <Search>
          <FiSearch />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="button" onClick={() => setSearch('')}>
            <FiX />
          </button>
        </Search>
      </section>

      <ul>
        {users.map(user => (
          <User key={user.id}>
            <UserInfo>
              <img
                src={`https://api.adorable.io/avatars/64/${user.name}.png`}
                alt={user.name}
              />

              <span>
                <strong>{user.name}</strong>
                <p>{user.email}</p>
              </span>
            </UserInfo>

            <UserAddress>
              <span>
                <p>{user.cpf}</p>
                <p>{`${user.address.street}, ${user.address.number} - ${user.address.city}`}</p>
              </span>
            </UserAddress>

            <aside>
              <Link to={`user/${user.id}`}>
                <FiEdit />
              </Link>
              <button type="button" onClick={() => handleDeleteUser(user)}>
                <FiTrash2 />
              </button>
            </aside>
          </User>
        ))}
      </ul>
    </Container>
  );
};

export default Dashboard;
