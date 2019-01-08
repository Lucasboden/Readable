import React, { Component } from 'react';
import {connect} from 'react-redux'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { getCommentDetails,editComment } from '../actions/Comments';

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
class EditComment extends Component{
  
  componentDidMount(){
    if(this.state.comment === '' || this.state.comment === undefined)
      this.props.dispatch(getCommentDetails(this.props.match.params.commentId)).then(res =>{
        this.setState({comment: res, commentContent:res.body})
    });
  }

  state = {
    commentContent:'',
    comment: '',
  }
 
  handleChangeContent = event => {
    this.setState({ commentContent: event.target.value });
  };
  handleEdit = (commentContent,commentId) => {
    console.log(commentId)
    this.props.dispatch(editComment(commentContent,commentId))
  };

  render (){
    var {commentContent,comment} = this.state;
     return(<div>
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Edit comment
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="name"
            name="name"
            label={comment.author}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="body"
            name="body"
            value={commentContent}
            label="Comment Body"
            onChange={this.handleChangeContent}
            fullWidth
          />
          <br/>
          <br/>
        <Grid item xs={12} sm={12}>
          <Button 
            size="small" 
            color="primary" 
            fullWidth 
            variant="contained"
            onClick={() => this.handleEdit(commentContent,comment.id)}>
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

export default connect ()(withStyles(styles)(EditComment))
