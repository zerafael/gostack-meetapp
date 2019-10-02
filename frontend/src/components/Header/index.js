import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';

import { Container, Content, Profile } from './styles';

function Header() {
  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="MeetUp" />
        </Link>

        <Profile>
          <div>
            <strong>Fulano de tal</strong>
            <Link to="/profile">Meu perfil</Link>
          </div>
          <button type="button">Sair</button>
        </Profile>
      </Content>
    </Container>
  );
}

export default Header;
