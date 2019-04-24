import React, {Component} from 'react';
import { connect } from 'react-redux';
import './DetailedShoe.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
  });

var moment = require('moment')

class DetailedShoe extends Component {

    //incoporate moment.js
    //material to add calender
    //if/else statement to display Deadstock or not

    //moment().subtract(10, 'days').calendar();

  render() {
    const { classes } = this.props;
    return (
      <body className="row">
          {this.props.reduxState.shoeReducer.map(shoe =>
            <body key={shoe.id}>
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
                    <p>{moment(shoe.last_worn).subtract(10, 'days').calendar()}</p>
                    <p>Added to collection:</p> 
                    <p>{moment(shoe.date_added).subtract(10, 'days').calendar()}</p>
                    {shoe.deadstock ?
                   <p>DEADSTOCK</p> : <p></p>}
                   <p>Have you worn this recently</p>
                   <form className={classes.container} noValidate>
                        <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        />
                    </form>
                    <br/>
                    <button onClick={this.updateButton} value={shoe.id} className="delete">
                        Update Date
                   </button>
                   <br/>
                   <br/>
                    <button onClick={this.deleteButton} value={shoe.id} className="delete">
                        Delete Shoe
                   </button>
                </section>
            </body>
          )}
      </body>
  )}
}

DetailedShoe.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(DetailedShoe));