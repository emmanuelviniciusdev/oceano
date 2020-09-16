import React from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';

// Styles
import { WrapperContent } from './styles';

// Components
import OceanoButton from '../../components/OceanoButton/OceanoButton';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const NotFoundPage = () => {
  const translation = useTranslation('NotFoundPage');
  const history = useHistory();

  return (
    <>
      <WrapperContent>
        <div className="content">
          <p className="not-found-code">404</p>
          <h1>{translation?.h1}</h1>
          <h2>{translation?.h2}</h2>
          <OceanoButton
            onClick={() => history.push('/')}
            className="button-return"
            text={translation?.buttonReturn?.text}
            aria-label={translation?.buttonReturn?.text}
            icon={<ArrowBack />}
          />
        </div>
      </WrapperContent>
    </>
  );
};

export default NotFoundPage;
