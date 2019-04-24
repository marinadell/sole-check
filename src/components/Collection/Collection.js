import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Collection.css'

class Collection extends Component {

  componentDidMount(){
    this.props.dispatch({type: 'GET_COLLECTION'})
  }

  detailedButton = (event) => {
      console.log('Button clicked', event.target.value);
    //create function to send event.target.value to redux to axios request to get just that id
  }

  render() {
    return (
      <section className="main">
        {this.props.reduxState.collectionReducer.map(shoe =>
            <div className="card" key={shoe.id}>
            <img src={shoe.image} alt={shoe.shoe_name}></img>
                <div className="container">
                <h4>{shoe.shoe_name}</h4>
                <p>{shoe.style}</p>
                <p>{shoe.brand}</p>
                <button onClick={this.detailedButton} value={shoe.id}>More Details</button>
                </div>
            </div>)}
      </section>
  )}
}

const mapStateToProps = reduxState => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Collection);