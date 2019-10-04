import styled from 'styled-components';

export const Container = styled.div`
  max-width: 940px;
  margin: 0 auto;
  padding: 50px 0;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }

    div {
      display: flex;

      button {
        display: flex;
        justify-content: space-between;
        border: 0;
        border-radius: 4px;
        color: #fff;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;

        svg {
          margin-right: 7px;
        }
      }

      .edit {
        background: #4dbaf9;
        margin-right: 15px;
      }

      .cancel {
        background: #d44059;
      }
    }
  }
`;

export const Meetup = styled.div`
  img {
    margin: 50px 0;
    border-radius: 4px;
    width: 940px;
    height: 300px;
  }

  p {
    color: #fff;
    font-size: 18px;
    padding-bottom: 30px;
  }

  footer {
    display: flex;
    align-items: center;
    text-align: left;

    span {
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 0.6);

      svg {
        margin-right: 7px;
      }

      & + span {
        margin-left: 30px;
      }
    }
  }
`;
