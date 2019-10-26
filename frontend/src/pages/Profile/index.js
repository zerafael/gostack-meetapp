import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdControlPoint } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email valido')
    .required('O email é obrigatório'),
  oldPassword: Yup.string()
    .min(6)
    .transform(value => (!value ? null : value))
    .nullable(),
  password: Yup.string()
    .transform(value => (!value ? null : value))
    .nullable()
    .min(6)
    .when('oldPassword', (oldPassword, field) =>
      oldPassword ? field.required() : field
    ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password ? field.required().oneOf([Yup.ref('password')]) : field
  ),
});

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data, { resetForm }) {
    dispatch(updateProfileRequest(data));
    resetForm({ name: data.name, email: data.email });
  }

  return (
    <Container>
      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
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
