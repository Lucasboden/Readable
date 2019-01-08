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
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import { deleteComment,fetchRegisterComment, vote } from '../actions/Comments';
import { editPostCommentsUp,editPostCommentsDown } from '../actions/Posts';

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
    author: '',
    body: '',
  };

  handleVote = (commentId,type) =>{
    this.props.dispatch(vote(commentId,type))
  }

  handleAdd = (body,author,postId) =>{
    this.props.dispatch(fetchRegisterComment(body,author,postId))
    this.props.dispatch(editPostCommentsUp(postId))
  }

  handleDeleteComment = (commentId,postId) =>{
    this.props.dispatch(deleteComment(commentId))
    this.props.dispatch(editPostCommentsDown(postId))
  }

  handleChangeContent = event => {
    this.setState({ body: event.target.value });
  };

  handleChangeName = event => {
    this.setState({ author: event.target.value });
  };

  render() {
    
    const { classes,open,handleClose,postId,posts,comments } = this.props;
    const { body,author } = this.state;
    const index = posts.findIndex(post => post.id === postId)
    var listaComentarios = null
    if(comments !== undefined)
      listaComentarios=comments.map((comment) => (
      <div key={comment.id}>
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
        <Button variant="outlined" color="primary" onClick={() => this.handleDeleteComment(comment.id,postId)}>
          Delete Comment
        </Button>
        <Link to={'/editComment/'.concat(comment.id)}>
          <Button variant="outlined" color="primary">
            Edit Comment
          </Button>
        </Link>
        <Divider />
        </CardActions>
        <Divider />
        <br/>
      </div>
    ))
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
    {listaComentarios}
          </List>
          <Typography variant="h6" gutterBottom>
            New Comment
          </Typography>
          <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
          <TextField
            required
            id="author"
            name="author"
            label="Author"
            onChange={this.handleChangeName}
            fullWidth
          />
          </Grid>
          <Grid item xs={12} sm={12}>
          <TextField
            required
            id="content"
            name="content"
            label="Content"
            onChange={this.handleChangeContent}
            fullWidth
          />
          </Grid>
          <Grid item xs={12} sm={12}>
          <Button variant="contained" size="small" color="primary" fullWidth onClick={() => this.handleAdd(body,author,postId)}>
            Add
          </Button>
          </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
  return {  
    comments: state.commentsReducer.comments,
    posts:state.postsReducer.posts
  }
}

export default connect(mapStateToProps)(withStyles(styles)(FullScreenDialog));