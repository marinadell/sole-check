import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Collection.css'
import FilterDraw from '../Filter/FilterDraw'

class Collection extends Component {

  componentDidMount(){
    this.props.dispatch({type: 'GET_COLLECTION'});
    this.props.dispatch({type: 'GET_BRAND'});
    this.props.dispatch({type: 'GET_COLOR'});
  }

  detailedButton = (event) => {
      console.log('Button clicked', event.target.value);
      this.props.dispatch({type: 'GET_SHOE', payload: event.currentTarget.value})
      this.props.history.push('/sneaker')
  }

  render() {
    console.log(this.props.reduxState.collectionReducer);
    return (
      <div>
      <FilterDraw />
      <section className="main">
        {this.props.reduxState.collectionReducer.map(shoe =>
            <div key={shoe.id}>
              {shoe.deadstock ?
              <div className="cardDs" key={shoe.id} value={shoe.id} onClick={this.cardClicked}>
              {/* <pre>{JSON.stringify(shoe)}</pre>  */}
                <img src={shoe.media_url} alt={shoe.shoe_name} className="cardImage"></img>
                  <div className="container">
                  <h4>{shoe.shoe_name}</h4>
                  <p>{shoe.style}</p>
                  <p>{shoe.brand}</p>
                  <button onClick={this.detailedButton} value={shoe.id} className="detailedButton">More Details</button>
                </div>
              </div>
              :
              <div className="card" key={shoe.id} value={shoe.id} onClick={this.cardClicked}>
                <img src={shoe.media_url} alt={shoe.shoe_name} className="cardImage"></img>
                  <div className="container">
                  <h4>{shoe.shoe_name}</h4>
                  <p>{shoe.style}</p>
                  <p>{shoe.brand}</p>
                  <button onClick={this.detailedButton} value={shoe.id} className="detailedButton">More Details</button>
                </div>
              </div>
              }
            </div>)}
      </section>
      </div>
  )}
}

const mapStateToProps = reduxState => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Collection);