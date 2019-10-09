import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdControlPoint } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data, { resetForm }) {
    dispatch(updateProfileRequest(data));
    resetForm({ name: data.name, email: data.email });
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de email" />

        <hr />

        <Input name="oldPassword" type="password" placeholder="Senha atual" />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />

        <button type="submit">
          <MdControlPoint size={22} />
          Salvar perfil
        </button>
      </Form>
    </Container>
  );
}

export default Profile;
