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

      &:focus {
        outline: none;
      }

      &:disabled {
        color: ${theme.colors.gray};
      }
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

export const Picture = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 20px;
    position: relative;
    margin-bottom: ${theme.spacings.small};

    img {
      width: 60px;
      border-radius: 50%;
    }

    a.icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      position: absolute;
      bottom: 5px;
      color: ${theme.colors.primary};
      background: #fff;
      width: 30px;
      height: 30px;
      border-radius: 50%;

      &:hover {
        opacity: 0.8;
        border: 1px solid ${theme.colors.primary};
      }
    }
  `}
`;
