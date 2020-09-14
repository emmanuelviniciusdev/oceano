import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

// Setup
import Routes from './Routes';
import { AppContext } from './store';

// Styles
import GlobalStyle from './styles/global';
import { Container } from './styles/general';

// Components
import Footer from './components/Footer/Footer';
import OctopusBackground from './components/OctopusBackground/OctopusBackground';
import SharksBackground from './components/SharksBackground/SharksBackground';

function App() {
  const currentLocation = useLocation();
  const globalContext = useContext(AppContext);

  return (
    <>
      <GlobalStyle />

      {currentLocation.pathname !== '/pagina-nao-encontrada' ? (
        <OctopusBackground />
      ) : (
        <SharksBackground />
      )}

      <main>
        <Container style={{ marginBottom: '100px' }}>
          <p>{JSON.stringify(globalContext.language?.state)}</p>
          <Routes />
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;
