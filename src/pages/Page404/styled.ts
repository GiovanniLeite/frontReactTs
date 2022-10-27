import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    padding-top: 90px;
    height: 600px;
    background-color: ${theme.colors.white2};

    h2 {
      text-align: center;
      margin-top: 200px;
    }
  `}
`;
