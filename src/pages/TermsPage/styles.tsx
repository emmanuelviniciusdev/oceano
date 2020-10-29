import { createGlobalStyle } from 'styled-components';
import theme from '../../styles/theme';
import spacedSeashell from '../../assets/images/spaced-seashell.png';

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${theme.colors.strongPrimary};
        background-image: url(${spacedSeashell});
        background-size: 150px 110px;
    }

    @media (min-width: 600px) {
        body {
            background-size: 200px 146.67px;
        }
    }

    @media (min-width: 960px) {
        body {
            background-size: 350px 256.67px;
        }
    }
`;
