import React from 'react';
import { useLocation } from 'react-router-dom';

// Setup
import Routes from './Routes';

// Styles
import GlobalStyle from './styles/global';
import { Container } from './styles/general';

// Components
import Footer from './components/Footer/Footer';
import OctopusBackground from './components/OctopusBackground/OctopusBackground';
import SharksBackground from './components/SharksBackground/SharksBackground';

function App() {
  const currentLocation = useLocation();

  return (
    <>
      <GlobalStyle />

      {currentLocation.pathname !== '/pagina-nao-encontrada' ? (
        <OctopusBackground />
      ) : (
        <SharksBackground />
      )}

      <main>
        <Container>
          <Routes />
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;
