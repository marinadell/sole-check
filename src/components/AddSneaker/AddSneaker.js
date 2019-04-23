import React, {Component} from 'react';
import { connect } from 'react-redux';
import './AddSneaker.css'

class AddSneaker extends Component {

  render() {
    return (
      <div>
        Add a sneaker
      </div>
  )}
}

const mapStateToProps = reduxState => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddSneaker);