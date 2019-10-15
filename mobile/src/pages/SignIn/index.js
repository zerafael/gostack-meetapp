import React, { useRef, useState } from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  LinkText,
} from './styles';

function SignIn({ navigation }) {
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            placeholder="Sua senha secreta"
            secureTextEntry
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={() => {}}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton>Entrar</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar conta grátis</LinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

export default SignIn;
