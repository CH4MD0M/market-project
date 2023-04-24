import styled from 'styled-components';

export const ChatBtn = styled.label`
  position: fixed;
  right: 14px;
  bottom: 30px;
  cursor: pointer;
  background-color: blue;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  color: #fff;
  font-size: 22px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  .close {
    display: none;
  }
`;

export const ChatWrapper = styled.div`
  opacity: 0;
  position: fixed;
  right: 20px;
  bottom: 100px;
  z-index: 2;
  width: 300px;
  transition: all 0.4s;
  background-color: #fff;
  border-radius: 5px;
`;

export const ChatHeader = styled.div`
  background-color: blue;
  padding: 13px;
  margin-bottom: 10px;
  border-radius: 5px 5px 0px 0px;
  color: #fff;
`;

export const ChatBody = styled.form`
  padding: 15px;

  input,
  textarea,
  button {
    margin-bottom: 10px;
  }

  textarea {
    resize: none;
  }

  textarea:focus,
  button:focus {
    box-shadow: none;
  }
`;

export const ChatMessage = styled.div`
  max-height: 300px;
  overflow: auto;

  .user-msg {
    text-align: right;
    margin-right: 10px;
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: none !important;
  &:checked {
    ~ ${ChatBtn} {
      i {
        display: block;
      }

      .comment {
        display: none;
      }
    }
    ~ ${ChatWrapper} {
      opacity: 1;
    }
  }
`;
