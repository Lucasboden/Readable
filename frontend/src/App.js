import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { Route,
  Switch} from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClearAll from '@material-ui/icons/ClearAll';
import NoteAdd from '@material-ui/icons/NoteAdd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
//import { connect } from 'react-redux'
import ListPost from './components/ListPost'
import RegisterPost from './components/RegisterPost'
import EditPost from './components/EditPost'
import EditComment from './components/EditComment'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
}); 
 
class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  state = {
    open: false,
    auth: true,
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar
          position="fixed"
          color="primary"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit"  style={{flex:2}} noWrap>
              Readable
            </Typography>
          </Toolbar>
        </AppBar>
         
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
              <Link key={"ListPosts"} to='/home'>
                <ListItem button>
                  <ListItemIcon><ClearAll /></ListItemIcon>
                  <ListItemText>List Posts</ListItemText>
                </ListItem>
              </Link>
              <Link key={"newPost"} to='/newPost'>
                <ListItem button>
                  <ListItemIcon><NoteAdd /></ListItemIcon>
                  <ListItemText>Add Post</ListItemText>
                </ListItem>
              </Link>
          </List>
        </Drawer>
        
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/' render={(history) => (
              <ListPost/>
            )}/>
            <Route exact path='/home' component={ListPost}/>
            <Route exact path='/newPost' component={RegisterPost}/>
            <Route exact path='/editPost/:postId' component={EditPost}/>
            <Route exact path='/editComment/:commentId' component={EditComment}/>
          </Switch>
        </main>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
 
export default withRouter(connect()(withStyles(styles, { withTheme: true })(withCookies(App))));