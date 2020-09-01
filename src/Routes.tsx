import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import IndexPage from './pages/Index/IndexPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

const Routes = () => {
  return (
    <>
      {/*
      <HashRouter /> was defined in 'index.tsx' to make it possible
      to use router hooks inside any component of the application
    */}
      <Switch>
        <Route path="/" exact component={IndexPage} />

        <Route path="/not-found" component={NotFoundPage} />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
};

export default Routes;
