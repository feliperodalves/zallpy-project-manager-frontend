import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';
import {} from '~/components/DefaultStyle';
import logo from '~/assets/logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="Logo" />
        </Link>

        <Profile>
          <Link to="/profile">{`${userProfile.name}`}</Link>
          <div>
            <button type="button" onClick={handleSignOut}>
              Sair
            </button>
          </div>
        </Profile>
      </Content>
    </Container>
  );
}
