import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

// Pages
import IndexPage from './pages/IndexPage/IndexPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import NotesPage from './pages/NotesPage/NotesPage';

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
  return (
    <>
      {/* <HashRouter /> is defined in 'index.tsx' to make it possible
      to use router hooks inside any component of the application */}
      <Switch>
        <Route
          path="/"
          exact
          render={() => renderPageWithTitle()(<IndexPage />)}
        />
        <Route
          path="/notas"
          render={() => renderPageWithTitle()(<NotesPage />, 'minhas notas')}
        />
        <Route
          path="/pagina-nao-encontrada"
          render={() =>
            renderPageWithTitle()(<NotFoundPage />, 'página não encontrada')
          }
        />

        <Redirect to="/pagina-nao-encontrada" />
      </Switch>
    </>
  );
};

export default Routes;
