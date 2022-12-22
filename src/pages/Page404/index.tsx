import { Helmet } from 'react-helmet-async';

import MainContainer from '../../components/MainContainer';
import { Container } from './styled';

export default function Page404() {
  return (
    <>
      <Helmet>
        <title>Erro 404 | Agenda</title>
      </Helmet>
      <MainContainer>
        <Container>
          <h2>Página não encontrada</h2>
        </Container>
      </MainContainer>
    </>
  );
}
