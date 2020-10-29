import React from 'react';
import { useHistory } from 'react-router-dom';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import ArticleIcon from '@material-ui/icons/Description';
import PolicyIcon from '@material-ui/icons/Policy';

// Types
import { TermsBoxType } from '../../types-and-interfaces/components/TermsBox.types';

// Components
import OceanoButton from '../OceanoButton/OceanoButton';
import TextPrivacyPolicy from '../TextPrivacyPolicy/TextPrivacyPolicy';
import TextTermsOfUse from '../TextTermsOfUse/TextTermsOfUse';

// Styles
import {
  StyledTermsBox,
  TermsContent,
  WrapperStyledTermsBox,
  ActionContent,
} from './styles';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const TermsBox: React.FunctionComponent<TermsBoxType> = ({ showing }) => {
  const translation = useTranslation('TermsBox');

  const history = useHistory();

  return (
    <>
      <WrapperStyledTermsBox>
        <StyledTermsBox>
          <h1>{translation?.titles?.[showing]}</h1>

          <TermsContent>
            {showing === 'terms-of-use' ? (
              <TextTermsOfUse />
            ) : (
              <TextPrivacyPolicy />
            )}
          </TermsContent>

          <ActionContent>
            <OceanoButton
              theme="transparent-for-light-bg"
              icon={<HomeIcon />}
              text={translation?.actionButtons?.buttonHomePage?.text}
              aria-label={translation?.actionButtons?.buttonHomePage?.text}
              onClick={() => history.push('/')}
            />
            <OceanoButton
              data-testid="button-terms-of-use"
              theme="transparent-for-light-bg"
              icon={<ArticleIcon />}
              text={translation?.actionButtons?.buttonTermsOfUse?.text}
              aria-label={translation?.actionButtons?.buttonTermsOfUse?.text}
              disabled={showing === 'terms-of-use'}
              onClick={() => history.push('/termos/termos-de-uso')}
            />
            <OceanoButton
              data-testid="button-privacy-policy"
              theme="transparent-for-light-bg"
              icon={<PolicyIcon />}
              text={translation?.actionButtons?.buttonPrivacyPolicy?.text}
              aria-label={translation?.actionButtons?.buttonPrivacyPolicy?.text}
              disabled={showing === 'privacy-policy'}
              onClick={() => history.push('/termos/politica-de-privacidade')}
            />
          </ActionContent>
        </StyledTermsBox>
      </WrapperStyledTermsBox>
    </>
  );
};

export default TermsBox;
