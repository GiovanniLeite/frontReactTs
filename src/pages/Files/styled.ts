import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};
    padding-top: 90px;

    div.box {
      max-width: 480px;
      margin: 20px auto;
      padding: 30px;
      box-shadow: 0 0 10px ${theme.colors.gray2};
      color: ${theme.colors.gray2};
      background: #fff;

      @media only screen and (max-width: 530px) {
        max-width: 350px;
        margin: ${theme.spacings.small} auto;
        padding: ${theme.spacings.small};
      }

      form {
        h4 {
          text-align: center;
          margin-bottom: ${theme.spacings.medium};
        }

        label {
          cursor: pointer;
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${theme.colors.white2};
          border: 5px dashed ${theme.colors.primary};
          margin: 30px auto;
          margin-top: 5px;
          overflow: hidden;

          &:hover {
            opacity: 0.8;
          }

          img {
            width: 280px;
            height: 280px;
          }
        }

        input {
          display: none;
        }
      }

      div.removeFile {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        div {
          width: calc(50% - 5px);

          img {
            width: 100%;
          }

          button {
            cursor: pointer;
            background-color: ${theme.colors.primary};
            border: 1px solid ${theme.colors.primary};
            border-radius: 3px;
            color: #fff;
            padding: 5px;
            margin: 0 auto;
            width: 100%;

            &:hover {
              background-color: #fff;
              color: ${theme.colors.primary};
            }
          }
        }
      }
    }
  `}
`;
