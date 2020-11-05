import React, { useContext, useLayoutEffect, useState } from 'react';
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
import { AppContext } from './store';

// Pages
import IndexPage from './pages/IndexPage/IndexPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import NotesPage from './pages/NotesPage/NotesPage';
import MyNotePage from './pages/MyNotePage/MyNotePage';
import OfflinePage from './pages/OfflinePage/OfflinePage';
import TermsPage from './pages/TermsPage/TermsPage';

// Custom hooks
import useTranslation from './hooks/useTranslation';

// Types
import { RenderMiddlewareAdditionalPropsType } from './types-and-interfaces/Routes.types';

// Utils
import { setPageTitle } from './utils';

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

  const { user: userContext } = useContext(AppContext);

  const [isUserReallyLoggedIn, setIsUserReallyLoggedIn] = useState<boolean>();

  useLayoutEffect(() => {
    /**
     * User authentication verification is made using both firebase API and 'userContext'.
     *
     * This is because 'userContext.state' will start as null and then, if user is logged in,
     * it could be switched to some non-null value.
     *
     * In the meanwhile of this process, if the user is logged in, it results in a double update
     * of 'isUserReallyLoggedIn' state, because in this case 'isUserReallyLoggedIn' will be set
     * to true. This updation makes the page to have a double renderization (using just 'useLayoutEffect'
     * without 'firebase.auth().onAuthStateChanged()' didn't work because I couldn't be able to know
     * if 'userContext' would be uṕdated or not, what forced me to set 'isUserReallyLoggedIn' as false
     * in the first rendering of 'useLayoutEffect', with the risk of the 'userContext' be updated again...).
     */
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();

      // console.log(user);

      if (!user) {
        setIsUserReallyLoggedIn(false);
        return;
      }

      if (user && userContext?.state) {
        setIsUserReallyLoggedIn(
          userContext.state.areTermsAccepted &&
            userContext.state.isEmailVerified
        );
      }
    });
  }, [userContext]);

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
    /**
     * It does nothing while we don't have a reference to user auth state.
     */
    if (isUserReallyLoggedIn === undefined) return;

    if (isPrivate && isUserReallyLoggedIn === false) {
      return <Redirect to="/" />;
    }

    if (isBlockedFromAuthenticatedUsers && isUserReallyLoggedIn === true) {
      return <Redirect to="/notas" />;
    }

    /**
     * It sets page title.
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
      {/* <HashRouter /> is defined in 'index.tsx' to make it possible
      to use router hooks inside any component of the application. */}
      <motion.div
        key={currentLocation.pathname}
        initial="initialPage"
        animate="animatePage"
        variants={{
          initialPage: {
            opacity: 0,
          },
          animatePage: {
            opacity: 1,
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
            path="/notas/:folderId?"
            render={() =>
              renderMiddleware(<NotesPage />, {
                pageTitle: notesPageTitle,
                isPrivate: true,
              })
            }
          />
          <Route
            path="/minha-nota/:noteId"
            render={() => renderMiddleware(<MyNotePage />, { isPrivate: true })}
          />
          <Route
            path="/termos/:termsType"
            render={() => renderMiddleware(<TermsPage />, {})}
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
  );
};

export default Routes;
