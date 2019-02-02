
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { vote,deletePost } from '../actions/Posts';
import { fetchComments } from '../actions/Comments';

const styles = {
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

class ImgMediaCard extends Component{
    state = {
        modalOpen: false
    }
    handleClick = (postId) =>{
        this.setState({modalOpen:true});
        this.props.dispatch(fetchComments(postId))
    }
    handleClose = () =>{
        this.setState({modalOpen: false});
    }
    handleVote(postId,type){
        console.log(postId)
        console.log(type)
        this.props.dispatch(vote(postId,type))
    }
    handleDeletePost(postId){
        this.props.dispatch(deletePost(postId))
    }
    
    render(){
    
  const { classes,header,body,postId,votes,comments,timestamp,author} = this.props;
  return (
            <Card className={classes.card} >
            <Link to={'/'.concat(this.props.categorie).concat('/').concat(postId)}>
            <CardActionArea onClick={() => this.handleClick(postId)}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {header}
                </Typography>
                <Typography component="p">
                    {body}
                </Typography>
                <br/>
                <Typography component="p">
                    {`Votes: ${votes}`} 
                </Typography>
                <Typography component="p">
                    {`Comments: ${comments}`} 
                </Typography>
                <Typography component="p">
                    {`Post Date: ${new Date(timestamp).toLocaleString()}`} 
                </Typography>
                <Typography component="p">
                    {`Author: ${author}`} 
                </Typography>
                </CardContent>
            </CardActionArea>
            </Link>
            <Divider/>
            <CardActions>
                <Button size="small" color="primary" onClick={() => this.handleVote(postId,'upVote')}>
                    Vote Up
                </Button>
                <Button size="small" color="primary" onClick={() => this.handleVote(postId,'downVote')}>
                    Vote Down
                </Button>
                <Button variant="outlined" color="primary" onClick={() => this.handleDeletePost(postId)}>
                    Delete Post
                </Button>
                <Link to={'/editPost/'.concat(postId)}>
                <Button variant="outlined" color="primary">
                    Edit Post
                </Button>
                </Link>
            </CardActions>
            <Divider/>
            </Card>

  );
}
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

function mapStateToProps (state) {
    return {  
      categorie:state.categorieReducer.categorie
    }
  }

export default connect()(withStyles(styles)(ImgMediaCard));