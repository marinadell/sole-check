import React, {Component} from 'react';
import { connect } from 'react-redux';
import './UserPage.css';
import axios from 'axios';
import logo from './logo.svg';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class UserPage extends Component {

  state = {
    images: [],
  }

  componentDidMount = () => {
    axios.get('/api/aws/images')
      .then(response => {
        this.setState({
          images: response.data
        })
      })
      .catch(error => {
        console.log('Error getting images: ', error);
      })
  }

  collectionClick = () => {
    console.log('collection Clicked');
    this.props.history.push('/collection');
  }

  addClick = () => {
    console.log('add sneaker');
    this.props.history.push('/addsneakerimage');
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
           Welcome, { this.props.user.username }!
        </h1>
        <div className="userpage">
          <div className="hcard" onClick={this.collectionClick}>
            <img src="images/sneakers.jpg" alt="sneakers" className="homeImg"/>
            <div className="container">
              <h2>View Collection</h2>
            </div>
          </div>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="hcard" onClick={this.addClick}>
            <img src="images/sneakerscollection.jpg" alt="sneakers" className="homeImg"/>
            <div className="container">
              <h2>Add A New Sneaker</h2>
            </div>
          </div>
          {/* <pre>{JSON.stringify(this.state)}</pre>
          <div>
        {this.state.images.map((image, index) => {
          return (
            <div key={index} className="post">
              <img className="image" src={image.media_url} alt="post"/> 
            </div>
          )
        })}
      </div> */}
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
