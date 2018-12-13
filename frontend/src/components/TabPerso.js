import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux'
import { fetchCategories } from '../actions/Category';
import { fetchPosts } from '../actions/Posts';
import Post from './Post'
import Grid from '@material-ui/core/Grid'
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class TabPerso extends React.Component {
  state = {
    value: 0,
  };
  componentDidMount(){
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchPosts('all'));
  }
  handleChange = (event, value) => {
    this.setState({ value });
    var cat = value === 0 ? 'all' : this.props.categories[value-1].name;
    this.props.dispatch(fetchPosts(cat));
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes, theme,categories } = this.props;
    return (
      <div className={classes.root}>
      <Grid container>
        <Grid item lg>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab key='all' label='all'></Tab>
            {tabsItens(categories)}
          </Tabs>
        </AppBar>
        </Grid>
        <Grid item xl>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >

            <TabContainer dir={theme.direction}><Post></Post></TabContainer>
            <TabContainer dir={theme.direction}><Post></Post></TabContainer>
            <TabContainer dir={theme.direction}><Post ></Post></TabContainer>
            <TabContainer dir={theme.direction}><Post ></Post></TabContainer>
        </SwipeableViews>
        </Grid>
        </Grid>
      </div>
    );
  }
}

TabPerso.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
function mapStateToProps (state) {
    return {  
      categories:state.categoryReducer.categories,
      posts:state.postsReducer
    }
  }
function tabsItens(categories){
var tabsItens='<h1>processando</h1>'
if (typeof categories !== 'undefined'){
    tabsItens = categories.map((category) => (
                <Tab key={category.name} label={category.name}></Tab>
                ))
    
    }
return tabsItens
}
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(TabPerso));