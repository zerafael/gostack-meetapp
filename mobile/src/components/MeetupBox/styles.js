import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1 auto;
  align-self: stretch;
  border-radius: 4px;
`;

export const Image = styled.Image`
  align-self: auto;
  height: 150;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Info = styled.View`
  background: #fff;
  padding: 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

export const TextInfo = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: #999;
  margin-left: 5px;
`;

export const MeetupButton = styled(Button)`
  margin-top: 5px;
`;
