import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 0 auto;
  padding: 50px 0;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }

    button {
      display: flex;
      justify-content: space-between;
      background: #f94d6a;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 0 20px;
      height: 42px;
      width: 172px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(1fr, 1fr);
    grid-row-gap: 10px;
    margin-top: 50px;
  }
`;

export const Meetup = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  padding: 0 30px;
  height: 62px;

  strong {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    span {
      margin-right: 20px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;
