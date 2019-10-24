import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const MeetupsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 20px 20px 0;
`;
