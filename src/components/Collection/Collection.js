import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Collection.css'

class Collection extends Component {

  render() {
    return (
      <div>
        collection page
      </div>
  )}
}

const mapStateToProps = reduxState => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Collection);