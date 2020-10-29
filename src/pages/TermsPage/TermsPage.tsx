import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import TermsBox from '../../components/TermsBox/TermsBox';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';
import { TermsBoxShowingType } from '../../types-and-interfaces/components/TermsBox.types';

// Types
import { TermsPageType } from '../../types-and-interfaces/pages/TermsPage.types';

// Utils
import { setPageTitle } from '../../utils';

// Styles
import { GlobalStyle } from './styles';

const TermsOfUsePage = () => {
  const translation = useTranslation('TermsPage');

  const { termsType } = useParams<TermsPageType>();
  const history = useHistory();

  const [showingInTermsBox, setShowingInTermsBox] = useState<
    TermsBoxShowingType
  >();

  useEffect(() => {
    if (
      termsType !== 'termos-de-uso' &&
      termsType !== 'politica-de-privacidade'
    ) {
      history.push('/pagina-nao-encontrada');
    }

    setPageTitle(translation?.[termsType]?.pageTitle);

    setShowingInTermsBox(
      termsType === 'termos-de-uso' ? 'terms-of-use' : 'privacy-policy'
    );
  }, [translation]);

  return (
    <>
      <GlobalStyle />

      {showingInTermsBox && <TermsBox showing={showingInTermsBox} />}
    </>
  );
};

export default TermsOfUsePage;
