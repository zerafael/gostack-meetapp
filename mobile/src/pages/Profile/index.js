import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import NavBar from '~/components/NavBar';

function Profile() {
  return (
    <Background>
      <NavBar />
      <Text>Profile</Text>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={25} color={tintColor} />
  ),
};

export default Profile;
