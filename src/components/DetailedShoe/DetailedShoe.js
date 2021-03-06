import React, {Component} from 'react';
import { connect } from 'react-redux';
import './DetailedShoe.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import swal from 'sweetalert';

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
        swal({
            title: "Are you sure you want to remove this shoe from your collection?",
            text: "Once removed, you will not be able to recover this shoe and will have to re-add it!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Your sneaker has been removed from your collection!", {
                icon: "success",
              });
              console.log('delete shoe', this.props.reduxState.shoeReducer[0]);
              this.props.dispatch({type: 'DELETE_SHOE', payload: this.props.reduxState.shoeReducer[0]});
              this.props.history.push('/home')
            } else {
              swal("Your sneakers are safe");
            }
          });
        
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
                    <img src={shoe.media_url} alt={shoe.shoe_name} className="detailImg"></img>
                    <div>
                        <div className="description">
                            <p className="shoestyle">{shoe.style}</p>
                            <p className="shoestyle">{shoe.brand}</p>
                            <p className="shoestyle">{shoe.color1} / {shoe.color2}</p>
                        </div>
                        <div className="story">
                            <p>{shoe.story}</p>
                        </div>
                        
                    </div>
                </section>
                <section className="second">
                    <p>Last Time Worn:</p>
                    {shoe.last_worn ?
                   <p className="date">{moment(shoe.last_worn).subtract().calendar()}</p > : <p className="date">Never worn</p>}
                    <p>Added to collection:</p> 
                    <p className="date">{moment(shoe.date_added).subtract().calendar()}</p>
                    {shoe.deadstock ?
                   <p className="ds">DEADSTOCK</p> : <p></p>}
                   <p>Have you worn this recently?</p>
                   <form className={classes.container} noValidate>
                        <TextField
                        id="date"
                        label="WORN"
                        type="date"
                        defaultValue={shoe.id}
                        className={classes.textField}
                        onChange= {this.handleDateChanged}
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
                        Remove Shoe
                   </button>
                   <br/>
                   <br/>
                   <br/>
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