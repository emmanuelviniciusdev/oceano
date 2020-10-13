import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
  useLocation,
} from 'react-router-dom';
import { motion } from 'framer-motion';

// Pages
import IndexPage from './pages/IndexPage/IndexPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import NotesPage from './pages/NotesPage/NotesPage';
import MyNotePage from './pages/MyNotePage/MyNotePage';

// Custom hooks
import useTranslation from './hooks/useTranslation';

/**
 *
 * @param title The title of the page. Note: it goes after the predefined prefix.
 */
const renderPageWithTitle = (props?: RouteComponentProps) => {
  return (component: JSX.Element, title?: string): JSX.Element => {
    const prefix = 'oceano';
    document.title = title ? prefix + ' — ' + title : prefix;

    return component;
  };
};

const Routes = () => {
  /**
   * Page titles are being defined one by one for performance reasons.
   *
   * As it is not possible to abstract the 'useTranslation' inside a function
   * and it would be costly to render the whole translations object at once,
   * I decided to keep each page title in a unique constant.
   */
  const notFoundPageTitle = useTranslation('NotFoundPage').pageTitle ?? '';
  const notesPageTitle = useTranslation('NotesPage').pageTitle ?? '';

  const currentLocation = useLocation();

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
            render={() => renderPageWithTitle()(<IndexPage />)}
          />
          <Route
            path="/notas"
            render={() => renderPageWithTitle()(<NotesPage />, notesPageTitle)}
          />
          <Route
            path="/minha-nota"
            render={() => renderPageWithTitle()(<MyNotePage />)}
          />
          <Route
            path="/pagina-nao-encontrada"
            render={() =>
              renderPageWithTitle()(<NotFoundPage />, notFoundPageTitle)
            }
          />

          <Redirect to="/pagina-nao-encontrada" />
        </Switch>
      </motion.div>
    </>
  );
};

export default Routes;
