import React from 'react';

// Styles
import { StyledOceanoInputText } from './styles';

// Types
import { OceanoInputTextType } from '../../types-and-interfaces/components/OceanoInputText.types';

const OceanoInputText: React.FunctionComponent<
  OceanoInputTextType & React.InputHTMLAttributes<HTMLInputElement>
> = ({ theme = 'transparent', ...props }) => {
  return (
    <>
      <StyledOceanoInputText type="text" styledTheme={theme} {...props} />
    </>
  );
};

export default OceanoInputText;
