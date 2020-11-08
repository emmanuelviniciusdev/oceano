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

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const Footer = () => {
  const translation = useTranslation('Footer');

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
    /^\/minha-nota\/(?:([^\/]+?))\/?$/i, //eslint-disable-line

    /**
     * /termos/:termsType
     */
    /^\/termos\/(?:([^\/]+?))\/?$/i, //eslint-disable-line

    /**
     * /offline
     */
    /^\/offline\/?$/i, //eslint-disable-line
  ];

  const oceanoVersion = '1.0.0 (beta)';

  const handleLinkSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    window.open(window.location.origin + '/#' + event.target.value, '__blank');
    event.target.value = '';
  };

  return (
    <>
      {!doesRouteMatch(currentLocation.pathname, blockedRouteRegExps) && (
        <StyledFooter data-testid="footer">
          <WrapperContent>
            <MobileContent>
              <TagVersion className="tag-version">
                {translation?.mobileContent?.versionText} {oceanoVersion}
              </TagVersion>
              <LinksSelect defaultValue="" onChange={handleLinkSelect}>
                <option value="" disabled>
                  {translation?.mobileContent?.goToText}
                </option>
                <option value="/termos/termos-de-uso">
                  {translation?.termsOfUseText}
                </option>
                <option value="/termos/politica-de-privacidade">
                  {translation?.privacyPolicyText}
                </option>
              </LinksSelect>
            </MobileContent>

            <Content>
              <TagVersion className="tag-version">
                {translation?.content?.versionText} {oceanoVersion}
              </TagVersion>

              <span style={{ marginRight: '15px' }}>•</span>

              <Link to="/termos/termos-de-uso" target="__blank">
                {translation?.termsOfUseText}
              </Link>
              <Link to="/termos/politica-de-privacidade" target="__blank">
                {translation?.privacyPolicyText}
              </Link>
            </Content>
          </WrapperContent>
        </StyledFooter>
      )}
    </>
  );
};

export default Footer;
