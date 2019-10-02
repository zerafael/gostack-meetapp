import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 0 30px;
`;

export const Content = styled.div`
  display: flex;
  max-width: 900px;
  height: 92px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;

  img {
    height: 32px;
    width: 32px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    text-align: right;
    padding: 0 30px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      font-size: 12px;
      margin-top: 2px;
      color: #999;
    }
  }

  button {
    background: #d44059;
    color: #fff;
    border: 0;
    border-radius: 4px;
    height: 42px;
    width: 71px;
    font-weight: bold;
    transition: background 0.02s;

    &:hover {
      background: ${darken(0.03, '#d44059')};
    }
  }
`;
