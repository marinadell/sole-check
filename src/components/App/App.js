import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Header from '../Header/Header';
import UserPage from '../UserPage/UserPage';
import Collection from '../Collection/Collection';
import Confirmation from '../Confirmation/Confrimation';
import AddSneaker from '../AddSneaker/AddSneaker';
import DetailedShoe from '../DetailedShoe/DetailedShoe';

import './App.css';


class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
          
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/collection"
              component={Collection}
            />
            <ProtectedRoute
              exact
              path="/addsneaker"
              component={AddSneaker}
            />
            <ProtectedRoute
              exact
              path="/sneaker"
              component={DetailedShoe}
            />
            <Route
              exact
              path="/register"
              component={Confirmation}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
