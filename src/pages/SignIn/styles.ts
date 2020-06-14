import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 160px;
  width: 620px;
  margin-top: 90px;
  background-color: #f5f5f7;
  border-radius: 14px;
  padding: 0 40px;

  @media (max-width: 900px) {
    max-width: 90vw;
  }

  section {
    font-family: 'Baloo Bhai 2', cursive;
    margin-right: 10px;

    h1 {
      text-align: center;
      font-size: 36px;
    }
  }

  > img {
    margin-top: -80px;
  }
`;

export const FormContainer = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    margin-top: 50px;
  }

  > h3 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
  }
`;
