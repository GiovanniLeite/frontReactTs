import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};
    padding-top: 90px;

    form {
      max-width: 320px;
      background-color: #fff;
      padding: ${theme.spacings.small};
      text-align: center;
      border-top: 10px solid ${theme.colors.primary};
      box-shadow: 0 0 10px ${theme.colors.gray2};
      color: ${theme.colors.gray2};
      margin: 0 auto;
    }

    h2 {
      padding-bottom: ${theme.spacings.medium};
    }

    input {
      width: 100%;
      padding: ${theme.spacings.small};
      display: block;
      margin-bottom: ${theme.spacings.small};
      text-align: center;
      background-color: ${theme.colors.lightGray};
      border: none;
    }

    input:focus {
      outline: none;
    }

    button {
      cursor: pointer;
      background-color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};
      color: #fff;
      padding: 10px;
      width: 100%;

      &:hover {
        background-color: #fff;
        color: ${theme.colors.primary};
      }
    }
  `}
`;
