import React, { Component } from 'react';
import { connect } from 'react-redux';
import Confrimation from '../Confirmation/Confrimation';

class Confirmation extends Component {

  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(Confirmation);
