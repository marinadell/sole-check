import React, {Component} from 'react';
import { connect } from 'react-redux';

class Filter extends Component {

    componentDidMount(){
        this.props.dispatch({type: 'GET_BRAND'})
        this.props.dispatch({type: 'GET_COLOR'})
      }

  render() {
      console.log(this.props.reduxState.brandReducer);
    return (
      <div className="filter">
      <pre>{JSON.stringify(this.props.reduxState.brandReducer)}</pre>
          <h3>Brand</h3>
          <ul>
          {this.props.reduxState.brandReducer.map( brands =>
            {return (
                <li>
                    <input type="checkbox" name="brand" value={brands.id} key={brands.id}/> {brands.brand}
                </li>
            )}
          )}
          </ul>
          <h3>Color</h3>
          <ul>
          {this.props.reduxState.colorReducer.map( colors =>
            {return (
                <li>
                    <input type="checkbox" name="color" value={colors.id} key={colors.id}/> {colors.color}
                </li>
            )}
          )}
          </ul>
      </div>
  )}
}

  
export default Filter;