import React from 'react';

// Types
import { TermsBoxType } from '../../types-and-interfaces/components/TermsBox.types';

// Styles
import { StyledTermsBox } from './styles';

const TermsBox: React.FunctionComponent<TermsBoxType> = () => {
  return (
    <>
      <StyledTermsBox></StyledTermsBox>
    </>
  );
};

export default TermsBox;
