import { createGlobalStyle } from 'styled-components';
import { readableColor } from 'polished';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        font-family: 'Inter', sans-serif;
        font-kerning: normal;
        word-wrap: break-word;

        &:focus {
            outline: 3px solid ${theme.colors.gray};
        }
    }

    body {
        width: 100%;
        height: 100%;
        background-color: ${theme.colors.primary};
        color: ${readableColor(theme.colors.primary)};
    }

    button, select {
        cursor: pointer;
    }

    ::selection {
        background-color: ${theme.colors.gray};
    }

    .oceano-bubble-loading {
      width: 30px;
      height: 30px;
      background-color: #000;

      border-radius: 100%;  
      -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
      animation: sk-scaleout 1.0s infinite ease-in-out;
    }

    @-webkit-keyframes sk-scaleout {
      0% { -webkit-transform: scale(0) }
      100% {
        -webkit-transform: scale(1.0);
        opacity: 0;
      }
    }

    @keyframes sk-scaleout {
      0% { 
        -webkit-transform: scale(0);
        transform: scale(0);
      } 100% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
        opacity: 0;
      }
    }

`;

export default GlobalStyle;
