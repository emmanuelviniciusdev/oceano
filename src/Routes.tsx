import React, { useEffect, useState } from 'react';
import {
  Route,
  RouteComponentProps,
  useLocation,
  useHistory,
  Redirect,
  Switch,
} from 'react-router-dom';
import { motion } from 'framer-motion';

// Setup
import firebase from './firebase';
import 'firebase/auth';

// Pages
import IndexPage from './pages/IndexPage/IndexPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import NotesPage from './pages/NotesPage/NotesPage';
import MyNotePage from './pages/MyNotePage/MyNotePage';
import OfflinePage from './pages/OfflinePage/OfflinePage';

// Custom hooks
import useTranslation from './hooks/useTranslation';

// Types
import { RenderMiddlewareAdditionalPropsType } from './types-and-interfaces/Routes.types';

/**
 * It defines a title to the page after 'oceano' prefix.
 *
 * @param title The title of the page
 */
const setPageTitle = (title?: string) => {
  const prefix = 'oceano';
  document.title = title ? prefix + ' — ' + title : prefix;
};

const Routes: React.FunctionComponent = () => {
  /**
   * Page titles are being defined one by one for performance reasons.
   *
   * As it is not possible to abstract the 'useTranslation' inside a function
   * and it would be costly to render the whole translations object at once,
   * I decided to keep each page title in a unique constant.
   */
  const notFoundPageTitle = useTranslation('NotFoundPage').pageTitle ?? '';
  const notesPageTitle = useTranslation('NotesPage').pageTitle ?? '';
  const offlinePageTitle = useTranslation('OfflinePage').pageTitle ?? '';

  const currentLocation = useLocation();
  const history = useHistory();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>();

  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged((user) => setIsUserLoggedIn(Boolean(user)));
  }, []);

  /**
   * This function is meant to be literally a middleware to apply into the routes. This will execute
   * something and then return the component page.
   *
   * @param component The page component
   * @param additionalProps Additional props
   * @param routeComponentProps The parameter from callback of the 'render' prop from component '<Route />'
   */
  const renderMiddleware = (
    component: JSX.Element,
    additionalProps: RenderMiddlewareAdditionalPropsType,
    routeComponentProps?: RouteComponentProps
  ) => {
    const {
      pageTitle,
      isPrivate,
      isBlockedFromAuthenticatedUsers,
    } = additionalProps;

    if (isPrivate && isUserLoggedIn === false) {
      return <Redirect to="/" />;
    }

    /**
     * //FIXME: IT IS BUGGING
     */
    // if (isBlockedFromAuthenticatedUsers && isUserLoggedIn === true) {
    //   return <Redirect to="/notas" />;
    // }

    /**
     * It sets page title
     */
    setPageTitle(pageTitle);

    /**
     * It redirects user to offline page if the browser's network status is
     * offline.
     */
    if (!navigator.onLine && currentLocation.pathname !== '/offline') {
      history.push('/offline');
    }

    return component;
  };

  return (
    <>
      {/* FIXME: IS IT REALLY NECESSARY? Remember, React Components updates after every state update... */}

      {/* This verification is to ensure that 'isUserLoggedIn' will not be accessed as undefined by 'renderMiddleware'. If this
      happened, it would not be possible to determine if user is logged in or not, because 'firebase.auth().onAuthStateChanged'
      is an asynchronous function, which means that in the first time 'isUserLoggedIn' will be undefined. */}
      {isUserLoggedIn !== undefined && (
        <>
          {/* <HashRouter /> is defined in 'index.tsx' to make it possible
          to use router hooks inside any component of the application */}
          <motion.div
            key={currentLocation.pathname}
            initial="initialPage"
            animate="animatePage"
            variants={{
              initialPage: {
                opacity: 0,
                y: 300,
              },
              animatePage: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2,
                },
              },
            }}
          >
            <Switch>
              <Route
                path="/"
                exact
                render={() =>
                  renderMiddleware(<IndexPage />, {
                    isBlockedFromAuthenticatedUsers: true,
                  })
                }
              />
              <Route
                path="/notas"
                render={() =>
                  renderMiddleware(<NotesPage />, {
                    pageTitle: notesPageTitle,
                    isPrivate: true,
                  })
                }
              />
              <Route
                path="/minha-nota"
                render={() =>
                  renderMiddleware(<MyNotePage />, { isPrivate: true })
                }
              />
              <Route
                path="/offline"
                render={() =>
                  renderMiddleware(<OfflinePage />, {
                    pageTitle: offlinePageTitle,
                  })
                }
              />
              <Route
                path="/pagina-nao-encontrada"
                render={() =>
                  renderMiddleware(<NotFoundPage />, {
                    pageTitle: notFoundPageTitle,
                  })
                }
              />

              <Redirect to="/pagina-nao-encontrada" />
            </Switch>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Routes;
