import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.button`
  background: #000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #f5f5f7;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.5s;
  &:hover {
    background: ${lighten(0.4, '#000')};
  }
`;
