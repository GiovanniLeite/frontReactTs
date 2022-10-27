import { Helmet } from 'react-helmet-async';

import MainContainer from '../../components/MainContainer';
import { Container } from './styled';

export default function Page404() {
  return (
    <>
      <Helmet>
        <title>Erro 404 | Agenda</title>
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
          <h2>Página não encontrada</h2>
        </Container>
      </MainContainer>
    </>
  );
}
