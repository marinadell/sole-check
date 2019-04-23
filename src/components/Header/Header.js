import React, {Component} from 'react';
import './Header.css'
import NavBar from '../NavBar/NavBar';

class Header extends Component {

  render() {
    return (
      <header>
          <NavBar />
          <h1 className="header">Sole Check</h1>
      </header>
  )}
}

export default (Header);
