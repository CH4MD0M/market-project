import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .dropdown {
    button {
      background: skyblue;
      border: none;
    }
  }
`;

export const Input = styled.input.attrs({ type: 'text' })`
  min-width: 300px;
  min-height: 40px;
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 16px;
  background: transparent;
  box-sizing: border-box;
  border-radius: 50px;
  outline: none;
  border: 1px solid #3e3e3e;
  transition: border 0.3s ease-in-out;

  &:focus {
    border: 1px solid red;
  }
`;
