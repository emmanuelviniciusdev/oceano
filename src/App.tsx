import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// Styles
import GlobalStyle from './styles/global';
import { Container } from './styles/general';

// Pages
import IndexPage from './pages/Index/IndexPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

// Components
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <GlobalStyle />

      <main>
        <Container>
          <Router>
            <Switch>
              <Route path="/" exact children={IndexPage} />
              <Route path="*" children={NotFoundPage} />
            </Switch>
          </Router>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;
