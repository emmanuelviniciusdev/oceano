import styled from 'styled-components';
import theme from '../../styles/theme';

export const Footer = styled.footer`
  width: 100%;
  height: 60px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  background: ${theme.colors.strongPrimary};
`;

export const WrapperContent = styled.div`
  /* background: green; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 15px;

  @media (min-width: 600px) {
    margin-left: 30px;
  }
`;

export const MobileContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .tag-version {
    width: 120px;
  }

  @media (min-width: 600px) {
    .tag-version {
      width: auto;
    }
  }

  @media (min-width: 960px) {
    display: none;
  }
`;

export const Content = styled.div`
  display: none;

  @media (min-width: 960px) {
    display: block;

    a {
      color: ${theme.colors.white};
      font-weight: 500;
      text-decoration: none;
      margin-right: 15px;
    }
  }
`;

export const LinksSelect = styled.select`
  height: 40px;
  background: transparent;
  color: ${theme.colors.white};
  font-weight: bold;
  border: none;
  padding: 10px;
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.25);

  option {
    color: ${theme.colors.black};
  }

  option:disabled {
    color: ${theme.colors.gray};
  }
`;

export const TagVersion = styled.span`
  font-weight: 500;
  margin-right: 15px;
`;
