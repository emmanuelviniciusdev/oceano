import { createGlobalStyle } from 'styled-components';
import { readableColor, darken } from 'polished';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }

    body {
        width: 100%;
        height: 100%;
        background-color: ${theme.primary};
        color: ${readableColor(theme.primary)};
        font-kerning: normal;
        word-wrap: break-word;
        font-family: 'Inter', sans-serif;
    }

    ::selection {
        background-color: ${darken(0.2, theme.yellow)};
    }
`;

export default GlobalStyle;
