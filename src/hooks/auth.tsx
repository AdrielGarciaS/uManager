import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

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
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@uManager:token');
    const user = localStorage.getItem('@uManager:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
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
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@uManager:token');
    localStorage.removeItem('@uManager:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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
