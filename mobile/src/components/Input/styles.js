import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 20px;
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
})`
  flex: 1;
  font-size: 18px;
  color: #fff;
`;
