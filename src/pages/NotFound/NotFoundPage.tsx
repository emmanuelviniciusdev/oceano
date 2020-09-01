import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';

// Styles
import { WrapperContent } from './styles';

// Components
import PurpledButton from '../../components/PurpledButton/PurpledButton';

function NotFoundPage() {
  return (
    <>
      <WrapperContent>
        <div className="content">
          <p className="not-found-code">404</p>
          <h1>página não encontrada</h1>
          <h2>perdido, marinheiro?</h2>
          <PurpledButton
            className="button-return"
            text="retornar"
            aria-label="retornar"
            icon={<ArrowBack />}
          />
        </div>
      </WrapperContent>
    </>
  );
}

export default NotFoundPage;
