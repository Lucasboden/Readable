import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import * as ReadableAPI from '../utils/ReadableAPI'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.purple,
  },
});

class SimpleListMenu extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 0,
    options: [],
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  
  /*(componentDidMount(){
    ReadableAPI.getAllCategories().then(response => {
      console.log()
      this.setState({options:response.map(item => item.name)});
    })
  }*/

  /*componentDidMount(){
    if (this.props.match.params.category) {
      this.props.categoryPostAPI();
    } else {
      this.props.postsAPI();
    }
  }*/

  render() {
    const { classes } = this.props;
    const { anchorEl,options } = this.state;
    if(!this.state.options.length)
            return null;
    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label={"Category" + options[this.state.selectedIndex]}
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={"Category: " + options[this.state.selectedIndex]}
              secondary={options[this.state.selectedIndex].name}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

SimpleListMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

//export default withStyles(styles)(connect(mapStateToProps,{fetchCategories})(SimpleListMenu));
export default connect()(SimpleListMenu)