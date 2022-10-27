import { Container } from './styled';

export type LoadingProps = {
  isLoading: boolean;
};

export default function Loading({ isLoading }: LoadingProps) {
  if (!isLoading) return <></>;
  return (
    <Container>
      <div />
      <span>Carregando...</span>
    </Container>
  );
}
