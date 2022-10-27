import styled, { css } from 'styled-components';
import { Dialog } from '@mui/material';

export const Container = styled.section`
  ${({ theme }) => css`
    margin: 0 auto;
    padding: 90px ${theme.spacings.small} ${theme.spacings.xLarge}
      ${theme.spacings.small};

    @media only screen and (max-width: 700px) {
      padding-top: 95px;
    }

    .button {
      cursor: pointer;
      color: #fff;
      border: none;
      margin: ${theme.spacings.verySmall} 0;
      padding: ${theme.spacings.small};
      border-radius: 3px;
      font-weight: bold;

      /* to align icon */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    div.searchBar {
      margin-bottom: ${theme.spacings.small};

      div.inputContent {
        padding: ${theme.spacings.verySmall};
        background: ${theme.colors.primary};
        border-radius: 3px;

        div {
          padding-right: ${theme.spacings.verySmall};
          background-color: #fff;
          border-radius: 3px;
        }

        input {
          width: 100%;
          padding: ${theme.spacings.small};
          background: url(${`$/images/search_evmmru.png`}) no-repeat center
            right;
          border: none;
          background-color: #fff;

          &:focus {
            outline: none;
          }
        }
      }

      p {
        padding: ${theme.spacings.verySmall};
      }

      span {
        font-weight: bold;
      }
    }

    a.newPage {
      background: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};
      padding: ${theme.spacings.small};
      margin-bottom: ${theme.spacings.medium};
      letter-spacing: 1px;

      &:hover {
        border: 1px solid ${theme.colors.primary};
        background-color: #fff;
        color: ${theme.colors.primary};
        opacity: 1;
      }

      svg {
        margin-right: ${theme.spacings.verySmall};
      }
    }

    div.result {
      ul {
        list-style: none;
        font-weight: bold;
      }

      li {
        display: grid;
        grid-template-columns: 15% 55% 15% 15%;
        padding: ${theme.spacings.small};
        border-radius: 3px;
        margin-bottom: ${theme.spacings.verySmall};
        color: ${theme.colors.gray2};

        @media only screen and (max-width: 700px) {
          font-size: 90%;
        }

        @media only screen and (max-width: 600px) {
          grid-template-columns: 20% 40% 20% 20%;
        }

        @media only screen and (max-width: 500px) {
          font-size: 70%;
        }
      }

      li:nth-child(2n + 1) {
        background-color: ${theme.colors.white2};
      }

      li:nth-child(2n) {
        background-color: ${theme.colors.white3};
      }

      li a {
        color: ${theme.colors.gray2};
        cursor: pointer;
      }

      .icon {
        color: ${theme.colors.primary};
      }

      li span.center {
        /* to align icon */
        display: flex;
        justify-content: center;
        align-items: center;
      }

      img {
        width: 35px;
        border-radius: 50%;
      }

      div.pagination {
        width: 100%;
        padding: 25px;

        div {
          margin: 0 auto;
          width: 185px;
          overflow: hidden;
          display: flex;
        }

        button {
          background-color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};

          &:hover {
            background-color: #fff;
            color: ${theme.colors.primary};
          }

          &:disabled {
            background: ${theme.colors.lightGray};
            color: #fff;
            border-color: ${theme.colors.lightGray};
            cursor: auto;
          }
        }

        button + button {
          margin-left: 5px;
        }
      }
    }
  `}
`;

export const DialogZ = styled(Dialog)`
  ${({ theme }) => css`
    h2 {
      text-align: center;
      letter-spacing: 0.7px;
    }

    div.divH2 {
      border-bottom: 1px solid ${theme.colors.gray2};
      margin: 0 auto;
      width: 150px;
    }

    h2,
    h3 {
      margin: 15px;
      max-width: 400px;
    }

    h3 {
      text-align: justify;
    }

    h3 strong {
      font-family: 'Open Sans', sans-serif;
    }

    button {
      cursor: pointer;
      background-color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};
      color: #fff;
      margin: ${theme.spacings.verySmall} 0;
      padding: ${theme.spacings.small};
      border-radius: 3px;
      font-weight: bold;

      /* to align icon */
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: #fff;
        color: ${theme.colors.primary};
      }
    }
  `}
`;
