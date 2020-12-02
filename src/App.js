import React from 'react';
// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import SignUpPage from './components/screens/SignUpPage';
import SignInPage from './components/screens/SignInPage';
import HomePage from './components/screens/HomePage';
import AboutPage from './components/screens/AboutPage';
import SearchPage from './components/screens/SearchPage';
import * as ROUTES from './components/constants/routes';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import PetPage from './components/screens/PetPage';
import SearchResultsPage from './components/screens/SearchResultsPage';

function App() {

  return (
    <Router >
      <Header />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.PET} component={PetPage} />
      <Route path={ROUTES.SEARCH} component={SearchPage} />
      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <Route exact path={ROUTES.SearchResults} component={SearchResultsPage} />
      <Footer />
    </Router>
  );
}

export default App;
