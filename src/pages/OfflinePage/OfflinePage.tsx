import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Icons
import WifiOffIcon from '@material-ui/icons/WifiOff';

// Assets
import turtleWithBubblesImg from '../../assets/images/turtle-with-bubbles.png';

// Styles
import {
  Content,
  GlobalStyle,
  OceanoTextAtBottom,
  OfflineText,
  TextContent,
  TryingReconnectionText,
  TurtleImg,
} from './styles';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const OfflinePage = () => {
  const translation = useTranslation('OfflinePage');
  const history = useHistory();

  useEffect(() => {
    window.addEventListener('online', () => {
      if (navigator.onLine) {
        history.push('/');
      }
    });

    return () => {
      window.removeEventListener('online', () => {});
    };
  });

  return (
    <>
      <GlobalStyle />

      <Content>
        <TurtleImg
          src={turtleWithBubblesImg}
          alt={translation?.imgTurtle?.alt}
        />

        <TextContent>
          <OfflineText>
            <div className="icon">
              <WifiOffIcon fontSize="inherit" />
            </div>
            <div>
              <h1>{translation?.h1}</h1>
            </div>
          </OfflineText>
          <TryingReconnectionText>{translation?.h2}</TryingReconnectionText>
        </TextContent>

        <OceanoTextAtBottom>oceano</OceanoTextAtBottom>
      </Content>
    </>
  );
};

export default OfflinePage;
