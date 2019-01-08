import React, { Component } from 'react';
import {connect} from 'react-redux'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { getPostDetails,editPost } from '../actions/Posts';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});
class EditPost extends Component{
  
  componentDidMount(){
    this.props.dispatch(getPostDetails(this.props.match.params.postId)).then(res =>{
      this.setState({post: res, postTitle:res.title, postContent:res.body})
    });
  }

  state = {
    postTitle:'',
    postContent:'',
    post: '',
  }
 
  handleChangeContent = event => {
    this.setState({ postContent: event.target.value });
  };
  handleChangeTitle = event => {
    this.setState({ postTitle: event.target.value });
  };
  handleEdit = (postTitle,postContent,postId) => {
    this.props.dispatch(editPost(postTitle,postContent,postId))
  };

  render (){
    var {postTitle,postContent,post} = this.state;
     return(<div>
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Edit Post
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="name"
            name="name"
            label={post.author}
            editable='false'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="title"
            name="title"
            value={postTitle}
            label="Post Title"
            onChange={this.handleChangeTitle}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="body"
            name="body"
            value={postContent}
            label="Post Body"
            onChange={this.handleChangeContent}
            fullWidth
          />
          <br/>
        <Grid item xs={12} sm={12}>
          <Button 
            size="small" 
            color="primary" 
            fullWidth 
            variant="contained"
            onClick={() => this.handleEdit(postTitle,postContent,post.id)}>
            Edit
          </Button>
        </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
    <br/>
      </div>
    )
  }
}

export default connect ()(withStyles(styles)(EditPost))
