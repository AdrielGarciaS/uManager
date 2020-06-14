import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1120px;
  padding: 0 50px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h3 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  h4 {
    font-size: 18px;
    margin: 10px 15px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
  }
`;
