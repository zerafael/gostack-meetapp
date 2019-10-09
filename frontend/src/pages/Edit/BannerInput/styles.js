import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 20px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 940px;
      height: 300px;
      border-radius: 4px;
    }

    input {
      display: none;
    }
  }
`;

export const EmptyBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 940px;
  height: 300px;
  cursor: pointer;

  background: rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.3);

  strong {
    font-size: 20px;
    font-weight: bold;
  }
`;
