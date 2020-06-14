import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #f5f5f7;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  border: 2px solid #f5f5f7;
  color: ${lighten(0.6, '#000')};
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #000;
      border-color: #000;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #000;
    `}
  input {
    color: #000;
    flex: 1;
    border: 0;
    background: transparent;
    &::placeholder {
      color: ${lighten(0.6, '#000')};
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
