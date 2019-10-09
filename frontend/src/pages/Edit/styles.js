import styled from 'styled-components';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;

    input {
      height: 50px;
      padding: 0 20px;
      margin: 0 0 10px;
      border: 0;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
        font-size: 18px;
      }
    }

    textarea {
      height: 200px;
      padding: 20px;
      margin: 0 0 10px;
      border: 0;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      resize: vertical;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
        font-size: 18px;
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-self: flex-end;
      background: #f94d6a;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      margin-top: 10px;

      svg {
        margin-right: 7px;
      }
    }
  }
`;
