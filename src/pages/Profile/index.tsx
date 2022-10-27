import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as val from 'validator';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { authActions } from '../../redux/features/auth/slice';

import MainContainer from '../../components/MainContainer';
import Loading from '../../components/Loading';
import { Container } from './styled';

export default function Profile() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const userStored = useAppSelector((state) => state.auth.user);
  const id = userStored?.id ? userStored?.id : 0;
  const nameStored = userStored?.name ? userStored.name : '';
  const emailStored = userStored?.email ? userStored?.email : '';
  const admStored = userStored?.adm ? userStored?.adm : 0;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    setName(nameStored);
    setEmail(emailStored);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formErrors = false;

    if (name.length < 3 || name.length > 50) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 50 caracteres');
      const nameInput = document.getElementById('name') as HTMLInputElement;
      nameInput.style.borderColor = '#ff0000';
    }

    if (!val.default.isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
      const emailInput = document.getElementById('email') as HTMLInputElement;
      emailInput.style.borderColor = '#ff0000';
    }

    const pass = document.getElementById('password') as HTMLInputElement;
    const passConfirm = document.getElementById(
      'passwordConfirmation',
    ) as HTMLInputElement;

    if (password.length < 8 || password.length > 16) {
      formErrors = true;
      toast.error('Senha deve ter entre 8 e 16 caracteres');
      pass.style.border = '1px solid #ff0000';
      passConfirm.style.border = '1px solid #ff0000';
    }

    if (password !== passwordConfirmation) {
      formErrors = true;
      toast.error('Senha e confirmação devem ser iguais');
      pass.style.border = '1px solid #ff0000';
      passConfirm.style.border = '1px solid #ff0000';
    }

    if (formErrors) return;

    dispatch(
      authActions.registerRequest({
        id,
        name,
        adm: admStored,
        email,
        password,
      }),
    );
  };

  return (
    <>
      <Helmet>
        <title>Perfil | Agenda</title>
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
        <Loading isLoading={isLoading} />
        <Container>
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2>Perfil</h2>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
              title="Nome"
            />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@outlook.com"
              title="exemplo@outlook.com"
            />
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
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
            <button type="submit">Salvar</button>
          </form>
        </Container>
      </MainContainer>
    </>
  );
}
