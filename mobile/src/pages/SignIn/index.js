import React from 'react';
import { Text } from 'react-native';

import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

function SignIn() {
  return (
    <Background>
      <Text>SignIn</Text>

      <Input style={{ marginTop: 30 }} placeholder="Digite seu nome" />
      <Button>Teste</Button>
    </Background>
  );
}

export default SignIn;
