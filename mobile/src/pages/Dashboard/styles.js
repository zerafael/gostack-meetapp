import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const DateView = styled.View`
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const DateText = styled.Text`
  font-size: 20;
  font-weight: bold;
  color: #fff;
  margin: 0 15px;
`;

export const MeetupsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 0 20px 0;
`;
