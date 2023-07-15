import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  button:disabled {
    background-color: #ccc;
    border-color: #c7c7c7;
  }
`;
