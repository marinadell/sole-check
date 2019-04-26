import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';


const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  };

  class Filter extends Component {
    state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    };
  
    toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };
  
    render() {
      const { classes } = this.props;

      const sideList = (
        <div className={classes.list}>
          <List>
            {this.props.reduxState.brandReducer.map((brands) => (
              <ListItem key={brands.id}>
                {brands.brand}
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {this.props.reduxState.colorReducer.map((colors) => (
              <ListItem key={colors.id}>
                {colors.color}
              </ListItem>
            ))}
          </List>
        </div>
      );
  
      return (
        <div>
          <Button onClick={this.toggleDrawer('right', true)}>Filter</Button>
          <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('right', false)}
              onKeyDown={this.toggleDrawer('right', false)}
            >
            {sideList}
            </div>
          </Drawer>
        </div>
      );
    }
  }
  
  Filter.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = reduxState => ({
    reduxState
});
  
export default connect(mapStateToProps)(withStyles(styles)(Filter));

  
  