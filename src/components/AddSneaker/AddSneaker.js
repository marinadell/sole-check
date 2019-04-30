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
    imageId: this.props.reduxState.imageIdReducer,
  }

  componentDidMount(){
    this.props.dispatch({type: 'GET_BRAND'})
    this.props.dispatch({type: 'GET_COLOR'})
  }

  handleChange = name => event => {
    console.log(event.target.value, name);
    console.log(this.state);
    this.setState({
      [name]: event.target.value,
    });
  };

  addShoe = (event) => {

  }

//   handleSelectChange = name  => event => {
//     console.log(event.target.value);
//     this.setState({
//         [name]: event.target.value
//       });
//   };

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
          value={this.state.name}
          onChange={this.handleChange('shoe_name')}
        />
        <TextField
          required
          id="outlined-required"
          label="Style"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={this.state.name}
          onChange={this.handleChange('style')}
        />
        </form>
        <form className={classes.root} autoComplete="off">
        {/* <FormControl className={classes.formControl}>
          <Select
            value={this.state.brand_id}
            onChange={this.handleChange('brand_id')}
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
            value={this.state.color1_id}
            onChange={this.handleChange('color1_id')}
            name="color1_id"
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
            onClick={this.handleChange('color2_id')}
            name="color2_id"
            displayEmpty
            className={classes.selectEmpty}
          >
          {this.props.reduxState.colorReducer.map( color =>
            <MenuItem value={color.id}>{color.color}</MenuItem>
          )}
          </Select>
          <FormHelperText>Secondary Color</FormHelperText>
        </FormControl> */}
        <select id = "brand_id" onChange={this.handleChange("brand_id")}>
        {this.props.reduxState.brandReducer.map( brand =>
            <option value={brand.id}>{brand.brand}</option>
          )}
        </select>
        <select id = "color1_id" onChange={this.handleChange("color1_id")}>
            {this.props.reduxState.colorReducer.map( color =>
                <option value={color.id}>{color.color}</option>
            )}
        </select>
        <select id = "color2_id" onChange={this.handleChange("color2_id")}>
            {this.props.reduxState.colorReducer.map( color =>
                <option value={color.id}>{color.color}</option>
            )}
        </select>
        <TextField
          id="outlined-multiline-flexible"
          label="Sneaker Story"
          multiline
          rowsMax="8"
          value={this.state.multiline}
          onChange={this.handleChange('story')}
          className={classes.textField}
          margin="normal"
          helperText="I bought this shoe...."
          variant="outlined"
        />
        </form>
        <pre>{JSON.stringify(this.state)}</pre>
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