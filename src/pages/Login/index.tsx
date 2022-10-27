import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import * as val from 'validator';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { authActions } from '../../redux/features/auth/slice';

import MainContainer from '../../components/MainContainer';
import { Container } from './styled';
import Loading from '../../components/Loading';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [userDataRegister, setUserDataRegister] = useState({
    name: '',
    adm: 0,
    email: '',
    password: '',
  });
  const [userDataLogin, setUserDataLogin] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    register: boolean,
  ) => {
    const { name, value } = e.target;

    if (register) {
      setUserDataRegister({ ...userDataRegister, [name]: value });
    } else {
      setUserDataLogin({ ...userDataLogin, [name]: value });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    register: boolean,
  ) => {
    e.preventDefault();

    let formErrors = false;

    if (register) {
      if (
        userDataRegister.name.length < 3 ||
        userDataRegister.name.length > 50
      ) {
        formErrors = true;
        toast.error('Nome deve ter entre 3 e 50 caracteres');
        const name = document.getElementById('name') as HTMLInputElement;
        name.style.border = '1px solid #ff0000';
      }

      if (!val.default.isEmail(userDataRegister.email)) {
        formErrors = true;
        toast.error('Email inválido');
        const email = document.getElementById(
          'emailRegister',
        ) as HTMLInputElement;
        email.style.border = '1px solid #ff0000';
      }

      const pass = document.getElementById(
        'passwordRegister',
      ) as HTMLInputElement;
      const passConfirm = document.getElementById(
        'passwordConfirmation',
      ) as HTMLInputElement;

      if (
        userDataRegister.password.length < 8 ||
        userDataRegister.password.length > 16
      ) {
        formErrors = true;
        toast.error('Senha deve ter entre 8 e 16 caracteres');
        pass.style.border = '1px solid #ff0000';
        passConfirm.style.border = '1px solid #ff0000';
      }

      if (userDataRegister.password !== passwordConfirmation) {
        formErrors = true;
        toast.error('Senha e confirmação devem ser iguais');
        pass.style.border = '1px solid #ff0000';
        passConfirm.style.border = '1px solid #ff0000';
      }

      if (formErrors) return;
      dispatch(authActions.registerRequest({ ...userDataRegister }));
    } else {
      if (userDataLogin.email.trim() === '') {
        formErrors = true;
        toast.error('Campo Email não deve estar vazio');
        const email = document.getElementById('emailLogin') as HTMLInputElement;
        email.style.border = '1px solid #ff0000';
      }

      if (userDataLogin.password.trim() === '') {
        formErrors = true;
        toast.error('Campo Senha não deve estar vazio');
        const password = document.getElementById(
          'passwordLogin',
        ) as HTMLInputElement;
        password.style.border = '1px solid #ff0000';
      }

      if (formErrors) return;
      dispatch(authActions.loginRequest({ ...userDataLogin }));
    }
  };

  return (
    <>
      <Helmet>
        <title>{'Login - Registro | Agenda'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <MainContainer>
        <Container>
          <Loading isLoading={isLoading} />
          <section className="leftContent">
            <div className="loginSub">
              <form onSubmit={(e) => handleSubmit(e, false)}>
                <h2>Login</h2>
                <input
                  id="emailLogin"
                  type="email"
                  name="email"
                  onChange={(e) => handleChange(e, false)}
                  placeholder="exemplo@outlook.com"
                  title="Email"
                />
                <input
                  id="passwordLogin"
                  type="password"
                  name="password"
                  onChange={(e) => handleChange(e, false)}
                  placeholder="Senha"
                  title="Senha"
                />
                <button type="submit">Entrar</button>
              </form>
            </div>
          </section>
          <section className="rightContent">
            <form onSubmit={(e) => handleSubmit(e, true)}>
              <h2>Registro</h2>
              <input
                id="name"
                type="text"
                name="name"
                onChange={(e) => handleChange(e, true)}
                placeholder="Nome"
                title="Nome"
              />
              <input
                id="emailRegister"
                type="email"
                name="email"
                onChange={(e) => handleChange(e, true)}
                placeholder="exemplo@outlook.com"
                title="exemplo@outlook.com"
              />
              <input
                id="passwordRegister"
                type="password"
                name="password"
                onChange={(e) => handleChange(e, true)}
                placeholder="Senha"
                title="Senha"
              />
              <input
                id="passwordConfirmation"
                type="password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Cofirmação de senha"
                title="Cofirmação de senha"
              />
              <button type="submit">Registrar-se</button>
            </form>
          </section>
        </Container>
      </MainContainer>
    </>
  );
}
