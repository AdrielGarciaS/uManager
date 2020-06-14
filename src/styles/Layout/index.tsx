import React from 'react';
import { FiHome, FiUsers, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, Header } from './styles';

const LayoutDefault: React.FC = ({ children }) => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      {!!user && (
        <Header>
          <h1>uManager.</h1>
          <aside>
            <div>
              <Link to="/dashboard">
                <FiHome />
              </Link>
              <Link to="/user">
                <FiUsers />
              </Link>
            </div>

            <button type="button" onClick={() => signOut()}>
              <FiLogOut />
            </button>
          </aside>
        </Header>
      )}
      {children}
    </Container>
  );
};

export default LayoutDefault;
