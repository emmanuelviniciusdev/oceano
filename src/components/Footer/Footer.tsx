import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Styles
import {
  Footer as StyledFooter,
  WrapperContent,
  MobileContent,
  Content,
  LinksSelect,
  TagVersion,
} from './styles';

// Utils
import { doesRouteMatch } from '../../utils';

const Footer = () => {
  const currentLocation = useLocation();

  /**
   * Routes where footer will not be rendered.
   *
   * Regular expressions generated at:
   * https://forbeslindesay.github.io/express-route-tester/
   */
  const blockedRouteRegExps = [
    /**
     * /minha-nota/:noteId
     */
    /^\/minha-nota\/(?:([^\/]+?))\/?$/i,

    /**
     * /termos/:termsType
     */
    /^\/termos\/(?:([^\/]+?))\/?$/i,

    /**
     * /offline
     */
    /^\/offline\/?$/i,
  ];

  const oceanoVersion = '1.0.0 (beta)';

  return (
    <>
      {!doesRouteMatch(currentLocation.pathname, blockedRouteRegExps) && (
        <StyledFooter data-testid="footer">
          <WrapperContent>
            <MobileContent>
              <TagVersion className="tag-version">
                versão {oceanoVersion}
              </TagVersion>
              <LinksSelect defaultValue="">
                <option value="" disabled>
                  ir para...
                </option>
                <option value="/termos/termos-de-uso">termos de uso</option>
                <option value="/termos/politica-de-privacidade">
                  política de privacidade
                </option>
              </LinksSelect>
            </MobileContent>

            <Content>
              <TagVersion className="tag-version">
                produção independente — versão {oceanoVersion}
              </TagVersion>

              <span style={{ marginRight: '15px' }}>•</span>

              <Link to="/termos/termos-de-uso" target="__blank">
                termos de uso
              </Link>
              <Link to="/termos/politica-de-privacidade" target="__blank">
                política de privacidade
              </Link>
            </Content>
          </WrapperContent>
        </StyledFooter>
      )}
    </>
  );
};

export default Footer;
