import React from 'react';
import LanguageIcon from '@material-ui/icons/Language';

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
  return (
    <>
      <OceanoButton
        className="button-menu"
        aria-label="selecionar idioma"
        text="português"
        icon={<LanguageIcon />}
        theme={isNotTransparent ? 'purple' : 'transparent'}
      />
    </>
  );
};

export default SwitchLanguage;
