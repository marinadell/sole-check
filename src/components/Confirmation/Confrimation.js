import React, { Component } from 'react';
import { connect } from 'react-redux';

class Confirmation extends Component {

    registerUser = (event) => {
        event.preventDefault();
    
        if (this.state.username && this.state.password) {
          this.props.dispatch({
            type: 'REGISTER',
            payload: {
              username: this.state.username,
              password: this.state.password,
            },
          });
        } else {
          this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
        }
      } // end registerUser

  render() {
    return (
      <div>
          <h1>Confrimation</h1>
          <div>
              {this.props.reduxState.registerPage}
          </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(Confirmation);