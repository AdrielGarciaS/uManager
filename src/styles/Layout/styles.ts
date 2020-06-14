import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 15px 20px 15px;
`;

export const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  background-color: #000;
  color: #fff;
  width: 100%;
  max-width: 1120px;
  height: 132px;
  border-radius: 24px;
  margin: 30px 0;
  padding: 0 50px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  h1 {
    font-family: 'Baloo Bhai 2', cursive;
    font-size: 50px;

    @media (max-width: 900px) {
      text-align: center;
    }
  }

  svg {
    height: 35px;
    width: 35px;
  }

  aside {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    margin-left: -75px;

    @media (max-width: 900px) {
      margin-left: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding-bottom: 10px;
    }

    div {
      @media (max-width: 900px) {
        margin-left: auto;
        margin-right: -55px;
      }
      a {
        text-decoration: none;
        color: #fff;
        transition: color 0.5s;

        &:hover {
          color: ${shade(0.2, '#fff')};
        }
      }
      a + a {
        margin-left: 75px;

        @media (max-width: 900px) {
          margin-left: 40px;
        }
      }
    }

    button {
      background: transparent;
      border: none;
      color: #fff;
      transition: color 0.5s;

      @media (max-width: 900px) {
        margin-left: auto;
      }

      &:hover {
        color: ${shade(0.2, '#fff')};
      }
    }
  }
`;
