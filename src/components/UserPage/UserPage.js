import React, {Component} from 'react';
import { connect } from 'react-redux';
import './UserPage.css'

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class UserPage extends Component {

  collectionClick = () => {
    console.log('collection Clicked');
    this.props.history.push('/collection');
  }

  addClick = () => {
    console.log('add sneaker');
    this.props.history.push('/addsneaker');
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
           Welcome, { this.props.user.username }!
        </h1>
        <div className="userpage">
          <div className="card" onClick={this.collectionClick}>
            <img src="images/sneakers.jpg" alt="sneakers"/>
            <div className="container">
              <h2>View Collection</h2>
            </div>
          </div>
          <div className="card" onClick={this.addClick}>
            <img src="images/sneakerscollection.jpg" alt="sneakers"/>
            <div className="container">
              <h2>Add A New Sneaker</h2>
            </div>
          </div>
        </div>
      </div>
  )}
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
