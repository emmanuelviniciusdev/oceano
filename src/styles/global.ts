import { createGlobalStyle } from 'styled-components';
import { readableColor } from 'polished';
import theme from './theme';

// Assets
import octopus1 from '../assets/images/octopus-1.png';
import octopus3 from '../assets/images/octopus-3.png';

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
        
        /* TODO: Work on it */
        /* background-image: url(${octopus3}), url(${octopus1});
        background-position: top left, top right;
        background-size: auto, 600px;
        background-repeat: no-repeat; */
        
        background-color: ${theme.primary};
        color: ${readableColor(theme.primary)};
        font-kerning: normal;
        word-wrap: break-word;
        font-family: 'Inter', sans-serif;
    }
`;

export default GlobalStyle;
