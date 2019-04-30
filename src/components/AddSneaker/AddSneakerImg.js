import React, {Component} from 'react';
import { connect } from 'react-redux';
//import sendFile from '../../sendFormToServer';

class AddSneakerImg extends Component {

  fileSelectHandler = event => {
    const file = event.target.files[0];
    console.log(file);
    let action = {type: 'ADD_IMG', payload: file};
    this.props.dispatch(action);
    //sendFile.toServer(file);
  }

  nextPage = () => {
    this.props.history.push('/addSneaker')
  }

  render() {

    return (
      <div>
        <input type="file" onChange={this.fileSelectHandler}/>
        <button onClick={this.nextPage}>Next Page</button>
      </div>
  )}
}

const mapStateToProps = reduxState => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddSneakerImg);