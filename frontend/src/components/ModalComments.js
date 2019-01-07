import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardActions from '@material-ui/core/CardActions';

import {connect} from 'react-redux'

import { deleteComment,fetchRegisterComment } from '../actions/Comments';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleVote = (commentId) =>{
    this.props.dispatch(deleteComment(commentId))
  }

  handleAdd = (postId) =>{
    this.props.dispatch(fetchRegisterComment('body','author',postId))
  }
  render() {
    
    const { classes,open,handleClose,postId,posts,comments } = this.props;
    const index = posts.findIndex(post => post.id === postId)
    return (
      <div>
        
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {
                  posts[index].title
                }
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {listComments(comments)}
          </List>
          <Button size="small" color="primary" onClick={() => this.handleAdd(postId)}>
            Add
          </Button>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

function listComments(comments){
  if(comments !== undefined)
    return(comments.map(comment => (
      <div>
        <ListItem>
          <ListItemText primary={comment.author} secondary={comment.body} />
          <Typography component="p">
            {`Votes: ${comment.voteScore}`} 
          </Typography>
        </ListItem>
        <CardActions>
        <Button size="small" color="primary" onClick={() => this.handleVote(comment.id,'upVote')}>
          Vote Up
        </Button>
        <Button size="small" color="primary" onClick={() => this.handleVote(comment.id,'downVote')}>
          Vote Down
        </Button>
        <Divider />
        </CardActions>
        <Divider />
        <br/>
      </div>
      
    )))
  return null
}

function mapStateToProps (state) {
  return {  
    comments: state.commentsReducer.comments,
    posts:state.postsReducer.posts
  }
}

export default connect(mapStateToProps)(withStyles(styles)(FullScreenDialog));