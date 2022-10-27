import { createGlobalStyle, css } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      outline: none;
      box-sizing: border-box;
    }

    html {
      font-size: 62.5%;
      height: 100%;
    }

    body {
      font-family: 'Open Sans', sans-serif;
      font-size: ${theme.font.sizes.medium};
    }

    a {
      text-decoration: none;
      transition: opacity 300ms ease-in-out;
      &:hover {
        opacity: 0.6;
      }
    }
  `}
`;
