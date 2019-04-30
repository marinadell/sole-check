import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './AddSneaker.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { sendFileToServer } from '../../sendFormToServer';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class AddSneaker extends Component {

  state = {
    shoe_name: '',
    style: '',
    brand_id: '',
    color1_id: '',
    color2_id: '',
    story: '',
    selectedFile: '',
  }

  componentDidMount(){
    this.props.dispatch({type: 'GET_BRAND'})
    this.props.dispatch({type: 'GET_COLOR'})
  }

  handleChange = name => event => {

  };

  fileSelectHandler = event => {
    const file = event.target.files[0];
    console.log(file);
    sendFileToServer(file);
}

  addShoe = (event) => {
    event.preventDefault();
    //dispatch call for post
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="outlined-required"
          label="Sneaker Name"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Style"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        </form>
        <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.brand_id}
            onChange={this.handleChange}
            name="brand_id"
            displayEmpty
            className={classes.selectEmpty}
          >
          {this.props.reduxState.brandReducer.map( brand =>
            <MenuItem value={brand.id}>{brand.brand}</MenuItem>
          )}
          </Select>
          <FormHelperText>Brand</FormHelperText>
          <Select
            value={this.state.color2_id}
            onChange={this.handleChange}
            name="color2_id"
            displayEmpty
            className={classes.selectEmpty}
          >
          {this.props.reduxState.colorReducer.map( color =>
            <MenuItem value={color.id}>{color.color}</MenuItem>
          )}
          </Select>
          <FormHelperText>Main Color</FormHelperText>
          <Select
            value={this.state.color2_id}
            onChange={this.handleChange}
            name="color2_id"
            displayEmpty
            className={classes.selectEmpty}
          >
          {this.props.reduxState.colorReducer.map( color =>
            <MenuItem value={color.id}>{color.color}</MenuItem>
          )}
          </Select>
          <FormHelperText>Secondary Color</FormHelperText>
        </FormControl>
        <TextField
          id="outlined-multiline-flexible"
          label="Sneaker Story"
          multiline
          rowsMax="8"
          value={this.state.multiline}
          onChange={this.handleChange('multiline')}
          className={classes.textField}
          margin="normal"
          helperText="I bought this shoe...."
          variant="outlined"
        />
        </form>
        <button onClick={this.addShoe}>Add Sneaker</button>
      </div>
  )}
}

const mapStateToProps = reduxState => ({
  reduxState
});

AddSneaker.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(AddSneaker));