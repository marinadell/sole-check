import React, {Component} from 'react';
import { connect } from 'react-redux';
import './DetailedShoe.css'

class DetailedShoe extends Component {

    //incoporate moment.js
    //material to add calender
    //if/else statement to display Deadstock or not

  render() {
    return (
      <body className="row">
          {this.props.reduxState.shoeReducer.map(shoe =>
            <body>
                <h1 className="shoeName">{shoe.shoe_name}</h1>
                <section className="first">
                    <img src={shoe.image} alt={shoe.shoe_name}></img>
                    <div>
                        <div className="description">
                            <p>{shoe.style}</p>
                            <p>{shoe.brand}</p>
                            <p>{shoe.color1}</p>
                            <p>{shoe.color2}</p>
                        </div>
                        <div className="story">
                            <p>{shoe.story}</p>
                        </div>
                        
                    </div>
                </section>
                <section className="second">
                    <p>Last Time Worn:</p> 
                    <p>{shoe.last_worn}</p>
                    <p>Added to collection:</p> 
                    <p>{shoe.date_added}</p>
                    {shoe.deadstock ?
                   <p>DEADSTOCK</p> : <p></p>}
                </section>
            </body>
          )}
      </body>
  )}
}

const mapStateToProps = reduxState => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DetailedShoe);