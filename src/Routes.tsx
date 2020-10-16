import React from 'react';
import {
  Route,
  RouteComponentProps,
  useLocation,
  useHistory,
  Redirect,
  Switch,
} from 'react-router-dom';
import { motion } from 'framer-motion';

// Pages
import IndexPage from './pages/IndexPage/IndexPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import NotesPage from './pages/NotesPage/NotesPage';
import MyNotePage from './pages/MyNotePage/MyNotePage';
import OfflinePage from './pages/OfflinePage/OfflinePage';

// Custom hooks
import useTranslation from './hooks/useTranslation';

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

  // TODO: Move this type to '/types-and-interfaces'
  type RenderMiddlewareAdditionalPropsType = {
    pageTitle?: string;
  };

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
  ): JSX.Element => {
    const { pageTitle } = additionalProps;

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
            render={() => renderMiddleware(<IndexPage />, {})}
          />
          <Route
            path="/notas"
            render={() =>
              renderMiddleware(<NotesPage />, { pageTitle: notesPageTitle })
            }
          />
          <Route
            path="/minha-nota"
            render={() => renderMiddleware(<MyNotePage />, {})}
          />
          <Route
            path="/offline"
            render={() =>
              renderMiddleware(<OfflinePage />, { pageTitle: offlinePageTitle })
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
