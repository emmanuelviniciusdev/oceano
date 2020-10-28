import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

// Types
import { TermsPageType } from '../../types-and-interfaces/pages/TermsPage.types';

// Utils
import { setPageTitle } from '../../utils';
import { GlobalStyle } from './styles';

const TermsOfUsePage = () => {
  const translation = useTranslation('TermsPage');

  const { termsType } = useParams<TermsPageType>();
  const history = useHistory();

  useEffect(() => {
    setPageTitle(translation?.[termsType]?.pageTitle);

    if (
      termsType !== 'termos-de-uso' &&
      termsType !== 'politica-de-privacidade'
    )
      history.push('/pagina-nao-encontrada');
  }, [translation]);

  return (
    <>
      <GlobalStyle />

      <h1>TermsBox</h1>
    </>
  );
};

export default TermsOfUsePage;
