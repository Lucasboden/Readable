import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchCategories,changeCategorieId } from '../actions/Category';
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
    this.props.fetchCategories();
    this.props.fetchPosts('all');
  }
  handleChange = (event, value) => {
    this.setState({ value });
    var cat = value === 0 ? 'all' : this.props.categories[value-1].name;
    this.props.fetchPosts(cat);
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  handleClick=(tab,index) =>()=>{
    this.props.fetchPosts(tab)
    this.props.changeCategorieId(this.props.categories[index].path)
  }
  render() {
    const { classes, theme,categories } = this.props;
    return (
      <div className={classes.root}>
      <Grid container>
        <Grid item lg>
        <AppBar position="static" color="default">
          <Tabs
            value={this.props.categorieId||1}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
          <Link to='/all'>
            <Tab key='all' label='all' onClick={this.handleClick('all',1)}></Tab>
          </Link>
            {tabsItens(categories,this.handleClick)}
          </Tabs>
        </AppBar>
        </Grid>
        <Grid item xl>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
            <TabContainer dir={theme.direction}><Post category={this.props.category}></Post></TabContainer>
            <TabContainer dir={theme.direction}><Post category={this.props.category}></Post></TabContainer>
            <TabContainer dir={theme.direction}><Post category={this.props.category}></Post></TabContainer>
            <TabContainer dir={theme.direction}><Post category={this.props.category}></Post></TabContainer>
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
      posts:state.postsReducer,
      categorieId:state.categoryReducer.categorieId
    }
}

function tabsItens(categories,handleClick){
  var tabsItens='<h1>processando</h1>'
  if (typeof categories !== 'undefined'){
      tabsItens = categories.map((category,i) => {
        return( <Link key={category.id} to={`/${category.name}`}>
            <Tab  key={category.name} label={category.name} onClick={handleClick(category.name,i)}></Tab>
          </Link>)
      })
    }
return tabsItens
}

export default connect(mapStateToProps,{ fetchCategories, fetchPosts,changeCategorieId })(withStyles(styles, { withTheme: true })(TabPerso));