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

    state = {
        worn_date: '',
        id: ''
    }

    handleDateChanged = (event) => {
        this.setState({
            worn_date: event.target.value,
            id: event.target.defaultValue,
          });
    }

    deleteButton = (event) => {
        console.log('delete button clicked');
        
    }

    updateButton = (event) => {
        console.log('update button clicked');
        this.props.dispatch({type: 'UPDATE_DATE', payload: this.state})
    }

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
                    <p>{moment(shoe.last_worn).subtract().calendar()}</p>
                    <p>Added to collection:</p> 
                    <p>{moment(shoe.date_added).subtract().calendar()}</p>
                    {shoe.deadstock ?
                   <p>DEADSTOCK</p> : <p></p>}
                   <p>Have you worn this recently?</p>
                   <form className={classes.container} noValidate>
                        <TextField
                        id="date"
                        label="Worn"
                        type="date"
                        defaultValue={shoe.id}
                        className={classes.textField}
                        onChange= {this.handleDateChanged}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        />
                    </form>
                    <pre>{JSON.stringify(this.state)}</pre>
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