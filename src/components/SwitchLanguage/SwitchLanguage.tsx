/**
 * This component was built assuming that the application will support
 * only two languages (portuguese and english).
 */

import React, { useContext, useEffect } from 'react';
import LanguageIcon from '@material-ui/icons/Language';

// Setup
import { AppContext } from '../../store';
import languageReducer from '../../store/reducers/language';

// Styles
import {} from './styles';

// Components
import OceanoButton from '../OceanoButton/OceanoButton';

type SwitchLanguageType = {
  isNotTransparent?: boolean;
};

const SwitchLanguage: React.FunctionComponent<SwitchLanguageType> = ({
  isNotTransparent = false,
}) => {
  const { language } = useContext(AppContext);

  function switchLanguage() {
    const nextLanguage =
      language?.state.default === 'pt-br' ? 'en-us' : 'pt-br';

    localStorage.setItem('defaultLanguage', nextLanguage);

    language?.dispatch(
      languageReducer.actionCreators.setLanguage(nextLanguage)
    );
  }

  return (
    <>
      <OceanoButton
        onClick={switchLanguage}
        data-testid="switch-language-button"
        className="button-menu"
        aria-label={
          language?.state.default === 'pt-br'
            ? 'O idioma selecionado é o Português. Clique para alterar para o Inglês.'
            : 'The selected language is English. Click to change to Portuguese.'
        }
        text={language?.state.language}
        icon={<LanguageIcon />}
        theme={isNotTransparent ? 'purple' : 'transparent'}
      />
    </>
  );
};

export default SwitchLanguage;
