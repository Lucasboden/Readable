import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import { deleteComment,fetchRegisterComment, vote,fetchComments } from '../actions/Comments';
import { getPostDetails,fetchPosts,vote as votePost } from '../actions/Posts';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};


class FullScreenDialog extends React.Component {
  state = {
    open: false,
    author: '',
    body: '',
    post:'',
  };

  handleVote = (commentId,type) =>{
    this.props.dispatch(vote(commentId,type))
  }

  handleVotePost(postId,type){
    this.props.dispatch(votePost(postId,type,true))
}

  handleAdd = (body,author,postId) =>{
    this.props.dispatch(fetchRegisterComment(body,author,postId))
  }

  handleDeleteComment = (commentId,postId) =>{
    this.props.dispatch(deleteComment(commentId,postId))
  }

  handleChangeContent = event => {
    this.setState({ body: event.target.value });
  };

  handleChangeName = event => {
    this.setState({ author: event.target.value });
  };

  componentDidMount(){
    this.props.dispatch(getPostDetails(this.props.match.params.postId))
    this.props.dispatch(fetchComments(this.props.match.params.postId))
    if(this.props.posts === undefined)
      this.props.dispatch(fetchPosts(this.props.match.params.category))
  }
  
  render() {
    
    const { comments,post } = this.props;
    const { body,author } = this.state;
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
        <Button variant="outlined" color="primary" onClick={() => this.handleDeleteComment(comment.id,post.id)}>
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
        {post && 
        <Grid container>
          <Grid item xs={12} sm={12} md={12} style={{display: 'flex', justifyContent: 'center'}}>
            <h2 >{post.title}</h2>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{display: 'flex', justifyContent: 'center', marginTop:'-40px'}}>
            <h3>{post.author}</h3>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{display: 'flex', marginTop:'-30px'}}>
            <h4>{post.body}</h4>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{display: 'flex', marginTop:'-30px'}}>
            <h5>comments: {post.commentCount}</h5>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{display: 'flex', marginTop:'-30px'}}>
            <h5>votes: {post.voteScore}</h5>
            </Grid>
          </Grid>}
          <Divider style={{marginTop:'-20px'}}/>
          <Button size="small" color="primary" onClick={() => this.handleVotePost(post.id,'upVote')}>
                    Vote Up on Post
          </Button>
          <Button size="small" color="primary" onClick={() => this.handleVotePost(post.id,'downVote')}>
              Vote Down on Post
          </Button>
          
          <List>
          <Divider style={{marginTop:'-10px'}}/>
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
          <Button variant="contained" size="small" color="primary" fullWidth onClick={() => this.handleAdd(body,author,post.id)}>
            Add
          </Button>
          </Grid>
          </Grid>
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
    post: state.postsReducer.post,
    posts:state.postsReducer.posts,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(FullScreenDialog));