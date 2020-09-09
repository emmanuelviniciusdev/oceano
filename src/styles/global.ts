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

        &:focus {
            outline: 3px solid ${theme.colors.gray};
        }
    }

    body {
        width: 100%;
        height: 100%;
        background-color: ${theme.colors.primary};
        color: ${readableColor(theme.colors.primary)};
        font-kerning: normal;
        word-wrap: break-word;
        font-family: 'Inter', sans-serif;
    }

    button, select {
        cursor: pointer;
    }

    ::selection {
        background-color: ${theme.colors.gray};
    }
`;

export default GlobalStyle;
