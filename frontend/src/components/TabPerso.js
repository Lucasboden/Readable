import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {connect} from 'react-redux'
import { fetchCategories } from '../actions/Category';

class TabPerso extends React.Component {
  state = {
    value: 2,
  };
  componentDidMount(){
    this.props.dispatch(fetchCategories())
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    var tabsItens = <h1>Aguarde Carregando</h1>
    const { categories } = this.props
     if (typeof categories !== 'undefined'){
      tabsItens = <div>
        {categories.map((category) => (
                  <Tab label={category.name}></Tab>
                ))}
     </div>
    }
    return (
      <Paper square>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
        >
          <div>
          {tabsItens}
          </div>
          
        </Tabs>
      </Paper>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class NavTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs fullWidth value={value} onChange={this.handleChange}>
              <LinkTab label="Page One" href="page1" />
              <LinkTab label="Page Two" href="page2" />
              <LinkTab label="Page Three" href="page3" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>Page One</TabContainer>}
          {value === 1 && <TabContainer>Page Two</TabContainer>}
          {value === 2 && <TabContainer>Page Three</TabContainer>}
        </div>
      </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
    return {  
        categories:state.categoryReducer.categories
    }
}
export default connect (mapStateToProps)(TabPerso)
  
  