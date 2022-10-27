import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    width: 100%;
    max-width: 120rem;
    font-size: ${theme.font.sizes.medium};
    margin: 0 auto;
    z-index: 0;
  `}
`;
