import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;

    input {
      height: 50px;
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      color: #fff;
      font-size: 18px;
      padding: 0 20px;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 20px 0;
    }

    button {
      display: flex;
      align-items: center;
      border: 0;
      border-radius: 4px;
      align-self: flex-end;
      background: #f94d6a;
      color: #fff;
      padding: 12px 20px;
      margin-top: 20px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#f94d6a')};
      }

      svg {
        margin-right: 7px;
      }
    }
  }
`;
