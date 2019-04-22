import React, { Component } from 'react';
import {connect} from 'react-redux';

class RegisterPage extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    birthday: '',
    username: '',
    password: '',
  };

  newUser = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'NEW_USER',
      payload: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        birthday: this.state.birthday,
        username: this.state.username,
        password: this.state.password,
      },
    })
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
          <label htmlFor="first">
              First Name:
              <input
                type="text"
                name="username"
                value={this.state.first_name}
                onChange={this.handleInputChangeFor('first_name')}
              />
            </label>
          </div>
          <div>
          <label htmlFor="last">
              Last Name:
              <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor('last_name')}
              />
            </label>
          </div>
          <div>
          <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
          <label htmlFor="birthday">
              Birthday:
              <input
                type="date"
                name="birthday"
                value={this.state.birthday}
                onChange={this.handleInputChangeFor('birthday')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);


