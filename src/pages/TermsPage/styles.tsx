import { lighten } from 'polished';
import { createGlobalStyle } from 'styled-components';
import theme from '../../styles/theme';
import seashells from '../../assets/images/seashells.png';

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${lighten(0.2, theme.colors.secondary)};
        background-image: url(${seashells});
        background-size: 120px 97px;
    }

    @media (min-width: 600px) {
        body {
            background-size: 150px 127px;
        }
    }

    @media (min-width: 960px) {
        body {
            background-size: 200px 155px;
        }
    }
`;
