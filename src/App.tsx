import React from 'react';

// Setup
import Routes from './Routes';

// Styles
import GlobalStyle from './styles/global';
import { Container } from './styles/general';

// Components
import Footer from './components/Footer/Footer';
import OctopusBackgroundAnimation from './components/OctopusBackgroundAnimation/OctopusBackgroundAnimation';
import SharksBackgroundAnimation from './components/SharksBackgroundAnimation/SharksBackgroundAnimation';
import { useLocation } from 'react-router-dom';

function App() {
  const currentLocation = useLocation();

  return (
    <>
      <GlobalStyle />

      {/*
        It renders the octopus background if route is not '/not-found'
        or the sharks background if it is.
      */}
      {currentLocation.pathname !== '/not-found' ? (
        <OctopusBackgroundAnimation />
      ) : (
        <SharksBackgroundAnimation />
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
