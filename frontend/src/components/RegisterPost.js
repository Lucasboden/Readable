import React, { Component } from 'react';
import {connect} from 'react-redux'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { fetchRegisterPost } from '../actions/Posts';
import { fetchCategories } from '../actions/Category';

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
class RegisterPost extends Component{
  
  componentDidMount(){
    if(this.props.categories === undefined)
      this.props.dispatch(fetchCategories());
  }

  state = {
    posts:[],
    category:'',
    name:'',
    postTitle:'',
    postContent:'',
    error:'',
    modalOk: false,
    modalError: false,
  }
 
  handleRegister = (title,body,author,category) => () =>{
    var error = ''
    if(title === undefined || title === '')
      error = 'Title';
    if(body === undefined || body === '')
      error = 'Content';
    if(author === undefined || author === '')
      error = 'Name';
    if(category === undefined || category === '')
      error = 'Category';
    if(error === ''){
      this.props.dispatch(fetchRegisterPost(title,body,author,category))
      this.setState({modalOk:true})
    }
    else{
      this.setState({modalError:true,error:`${error} is required`})
    }
  };
  handleChangeCategory = event => {
    this.setState({ category: event.target.value });
  };
  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };
  handleChangeContent = event => {
    this.setState({ postContent: event.target.value });
  };
  handleChangeTitle = event => {
    this.setState({ postTitle: event.target.value });
  };
  handleCloseError = () => {
    this.setState({ modalError: false });
  };
  handleCloseConfirm = () => {
    this.setState({ modalOk: false });
  };

    render (){
    var categories = this.props.categories;
    var {postTitle,postContent,name,category,error} = this.state;
    var itens = ''
    if(typeof categories !== 'undefined')
    itens = categories.map((category) => (
      <option key={category.name} value={category.name}>{category.name}</option>
    ))
    else{
      this.props.dispatch(fetchCategories);
    }
     return(<div>
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        New Post
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            onChange={this.handleChangeName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="title"
            name="title"
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
            label="Post Content"
            onChange={this.handleChangeContent}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl required>
          <InputLabel >Category</InputLabel>
          <Select
            native
            value={this.state.category}
            name="category"
            onChange={this.handleChangeCategory}
            inputProps={{
              id: 'age-native-required',
            }}
          >
            <option value="" />
            {itens
            }
          </Select>
        </FormControl>
        </Grid>
        
      </Grid>
    </React.Fragment>
    <br/>
      <Button 
      onClick={this.handleRegister(postTitle,postContent,name,category)}
      variant="contained"
      color="primary">
        Post
      </Button>
      <Dialog
          open={this.state.modalError}
          onClose={this.handleCloseError}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Error</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {error}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseError} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.modalOk}
          onClose={this.handleCloseConfirm}
          aria-labelledby="form-dialog-title2"
        >
          <DialogTitle id="form-dialog-title2">Success</DialogTitle>
          <DialogContent>
            <DialogContentText>
              'Post successfully sent'
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseConfirm} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
function mapStateToProps (state) {
    return {  
      categories:state.categoryReducer.categories,
    }
  }

export default connect (mapStateToProps)(withStyles(styles)(RegisterPost))
