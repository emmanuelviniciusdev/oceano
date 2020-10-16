import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Setup
import Routes from './Routes';
import { AppContext } from './store';
import languageReducer from './store/reducers/language';

// Styles
import GlobalStyle from './styles/global';
import { Container } from './styles/general';

// Components
import Footer from './components/Footer/Footer';
import OctopusBackground from './components/OctopusBackground/OctopusBackground';
import SharksBackground from './components/SharksBackground/SharksBackground';
import TopBar from './components/TopBar/TopBar';

function App() {
  const currentLocation = useLocation();
  const globalContext = useContext(AppContext);

  useEffect(() => {
    /**
     * Bootstraps the default language that user may have selected.
     */
    globalContext.language?.dispatch(
      languageReducer.actionCreators.setLanguage(
        localStorage.getItem('defaultLanguage') ?? 'pt-br'
      )
    );

    /**
     * This is to ensure that page will always load or reload
     * with its scroll at the top.
     *
     * This was implemented because page transition effects from
     * 'framer-motion' may impact in scroll position.
     *
     * The timeout is '200' because page transition effect delay
     * is set to 0.2 seconds.
     */
    setTimeout(() => window.scrollTo(0, 0), 200);

    /**
     * Ignore intellisense and leave '[]' empty because this 'useEffect()' has to be
     * triggered only when the app starts by the first time
     */
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <GlobalStyle />

      {currentLocation.pathname === '/pagina-nao-encontrada' && (
        <SharksBackground />
      )}

      {!['/pagina-nao-encontrada', '/minha-nota', '/offline'].includes(
        currentLocation.pathname
      ) && <OctopusBackground />}

      <main>
        <Container style={{ marginBottom: '100px' }}>
          {/* Workaround until implement user authentication */}
          {['/notas', '/minha-nota'].includes(currentLocation.pathname) && (
            <TopBar />
          )}

          <Routes />
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;
