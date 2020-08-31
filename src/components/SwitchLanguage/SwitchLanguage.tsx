import React from 'react';
import Language from '@material-ui/icons/Language';

// Styles
import { WrapperSelect } from './styles';

const SwitchLanguage: React.FunctionComponent = () => {
  return (
    <>
      {/* TODO: Refactor this. */}
      <WrapperSelect>
        <Language className="icon" />

        <select aria-label="selecionar idioma">
          <option>português</option>
          <option>english</option>
        </select>
      </WrapperSelect>
    </>
  );
};

export default SwitchLanguage;
