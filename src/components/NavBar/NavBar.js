import React, {Component} from 'react';
import './NavBar.css';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';

class NavBar extends Component {

  render() {
    return (
      <div>
          <ul>
              <li><Link className="navBar" to="/home">Home</Link></li>
              <li><Link className="navBar" to="/collection">Collection</Link></li>
              <li><Link className="navBar" to="/addsneaker">Add Shoe</Link></li>
              <li><Link className="navBar" to="/home" onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>Log Out</Link></li>
          </ul>
      </div>
  )}
}

export default connect()(NavBar);