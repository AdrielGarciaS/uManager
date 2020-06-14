import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1120px;
  padding: 0 50px;

  @media (max-width: 900px) {
    padding: 0;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 900px) {
      flex-direction: column;
      margin-bottom: 10px;
    }

    h1 {
      font-family: 'Baloo Bhai 2', cursive;
      font-weight: bold;
      font-size: 36px;
    }
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;

  background: #f5f5f7;
  height: 40px;
  border-radius: 8px;
  padding: 16px;

  @media (max-width: 900px) {
    width: 100%;
  }

  > svg {
    margin-right: 16px;
  }

  input {
    border: 0;
    background: #f5f5f7;
    width: 100%;
  }

  button {
    background: transparent;
    border: 0;
    display: flex;
    align-self: center;
    justify-content: center;
    padding: 5px;
  }
`;

export const User = styled.li`
  font-family: 'Baloo Bhai 2', cursive;
  list-style: none;
  background: #f5f5f7;
  height: 80px;
  width: 100%;
  border-radius: 14px;
  padding: 8px 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: transform 0.2s;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 1fr;
    height: 100%;
  }

  & + li {
    margin-top: 12px;
  }

  aside {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 20%;

    @media (max-width: 900px) {
      width: 100%;
      display: grid;
      grid-auto-columns: 1fr;
      margin-top: 5px;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      height: 44px;
      padding: 10px 20px;
      background-color: #000;
      border-radius: 8px;

      svg {
        height: 20px;
        width: 20px;
        color: #fff;
      }
    }

    button {
      background: #000;
      color: #fff;
      border: 0;
      margin-left: 20px;
      border-radius: 8px;
      padding: 10px 20px;
      transition: background-color 0.2s;

      @media (max-width: 900px) {
        margin: 5px 0 0 0;
      }

      svg {
        height: 20px;
        width: 20px;
      }

      &:hover {
        background: ${lighten(0.2, '#000')};
      }
    }
  }

  &:hover {
    transform: translateX(30px);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 380px;
  overflow: hidden;
  margin-right: 15px;

  img {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    margin-left: 10px;
    padding: 3px;
    background: #fff;

    @media (max-width: 900px) {
      margin-left: 0;
    }
  }

  span {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    margin-left: 20px;

    strong {
      font-weight: bold;
      font-size: 24px;
    }

    p + p {
      font-weight: bold;
    }
  }
`;

export const UserAddress = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 380px;
  overflow: hidden;
  margin-right: 15px;

  span {
    display: flex;
    flex-direction: column;
    white-space: nowrap;

    strong {
      font-weight: bold;
      font-size: 24px;
    }

    p + p {
      font-weight: bold;
    }
  }

  @media (max-width: 900px) {
    margin: 5px 0 0 0;
  }
`;
