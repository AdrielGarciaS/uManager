import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

import { useToast } from './toast';

export interface User {
  id: number;
  name: string;
  cpf: string;
  email: string;
  password: string;
  address: {
    cep: number;
    street: string;
    number: number;
    neighborhood: string;
    city: string;
  };
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(data: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@uManager:token');
    const user = localStorage.getItem('@uManager:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.get<User[]>('users');

      const user = response.data.find(userDB => {
        return userDB.email === email;
      });

      if (!user || user.password !== password)
        throw new Error('Usuário ou senha incorreta, tente novamente');

      const token = 'token qualquer pq não temos backend';

      api.defaults.headers.authorization = `Bearer ${token}`;

      localStorage.setItem('@uManager:token', token);
      localStorage.setItem('@uManager:user', JSON.stringify(user));

      setData({ token, user });
    },
    [addToast],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@uManager:token');
    localStorage.removeItem('@uManager:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });

      localStorage.setItem('@uManager:user', JSON.stringify(user));
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
