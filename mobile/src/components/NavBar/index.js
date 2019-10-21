import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import { Container, View } from './styles';

function NavBar() {
  return (
    <Container>
      <View />
      <Image source={logo} size={16} style={{ marginBottom: 20 }} />
    </Container>
  );
}

export default NavBar;
