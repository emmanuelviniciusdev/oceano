import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Setup
import Routes from './Routes';
import { AppContext } from './store';
import languageReducer from './store/reducers/language';
import userReducer from './store/reducers/user';

// Styles
import GlobalStyle from './styles/global';
import { Container } from './styles/general';

// Components
import Footer from './components/Footer/Footer';
import OctopusBackground from './components/OctopusBackground/OctopusBackground';
import SharksBackground from './components/SharksBackground/SharksBackground';
import TopBar from './components/TopBar/TopBar';

// Firebase
import firebase from './firebase';
import 'firebase/auth';

// Services
import { checkIfUserExistsInCollectionByUID } from './services/user';

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
     * It keeps watching for changes on user authentication status.
     */
    firebase.auth().onAuthStateChanged(async (user) => {
      try {
        // console.log(user);

        if (!user) {
          globalContext.user?.dispatch(
            userReducer.actionCreators.setUser(null)
          );
          return;
        }

        const areTermsAccepted = await checkIfUserExistsInCollectionByUID(
          user.uid
        );

        globalContext.user?.dispatch(
          userReducer.actionCreators.setUser({
            uid: user.uid,
            isEmailVerified: user.emailVerified,
            areTermsAccepted,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } catch (err) {
        console.error(err);
      }
    });

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
      {JSON.stringify(globalContext.user)}

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
