import styled from 'styled-components';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const Form = styled.ScrollView`
  padding: 20px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 20px 0;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin: 10px 0 30px;
  background: #e5556e;
`;

export const LogoutButton = styled(Button)`
  background: #d44059;
`;
