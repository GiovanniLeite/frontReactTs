import styled, { css } from 'styled-components';

export const Container = styled.footer`
  ${({ theme }) => css`
    text-align: center;
    margin: ${theme.spacings.medium};
    color: ${theme.colors.gray};
    font-size: ${theme.font.sizes.small};
    padding-bottom: ${theme.spacings.medium};

    div {
      border-bottom: 1px solid ${theme.colors.gray};
      width: 100px;
      margin: 0 auto;
      margin-bottom: 5px;
    }
  `}
`;
