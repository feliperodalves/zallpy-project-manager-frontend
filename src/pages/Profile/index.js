import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSave } from 'react-icons/md';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Form, Input } from '~/components/DefaultStyle';
import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Endereço de Email" />
        <hr />
        <Input name="oldPassword" type="password" placeholder="Senha antiga" />
        <Input name="password" type="password" placeholder="Nova Senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de Senha"
        />
        <button type="submit">
          <MdSave size={24} color="#fff" />
          Atualizar perfil
        </button>
      </Form>
    </Container>
  );
}
