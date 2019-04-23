import React, { Component } from 'react';
import { connect } from 'react-redux';

class Confirmation extends Component {

    registerUser = (event) => {
        event.preventDefault();
    
        if (this.props.reduxState.registerPage.username && this.props.reduxState.registerPage.password) {
          this.props.dispatch({
            type: 'REGISTER',
            payload: this.props.reduxState.registerPage,
          });
          this.props.history.push('/home')
        } else {
          this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
        }
      } // end registerUser
  editButton = (event) => {
    event.preventDefault();
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
          <h1>Confrimation</h1>
          <div>
              <label>First Name:</label>
              {this.props.reduxState.registerPage.first_name}
              <br/>
              <label>Last Name:</label>
              {this.props.reduxState.registerPage.last_name}
              <br/>
              <label>Birthday:</label>
              {this.props.reduxState.registerPage.birthday}
              <br/>
              <label>Email Address:</label>
              {this.props.reduxState.registerPage.email}
              <br/>
              <label>Username:</label>
              {this.props.reduxState.registerPage.username}
              <br/>
              <br/>
              <button onClick={this.editButton}>Edit</button>
              <button onClick={this.registerUser}>Join the Movement</button>
          </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(Confirmation);