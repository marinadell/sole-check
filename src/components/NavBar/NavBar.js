import React, {Component} from 'react';
import './NavBar.css';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';

class NavBar extends Component {

  render() {
    return (
      <div>
          <ul>
              <li><Link className="navBar">Home</Link></li>
              <li><Link className="navBar">Add Shoe</Link></li>
              <li><Link className="navBar" onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>Log Out</Link></li>
          </ul>
      </div>
  )}
}

export default connect()(NavBar);