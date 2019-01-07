
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
import {connect} from 'react-redux'

import ModalComments from './ModalComments'
import { vote,deletePost } from '../actions/Posts'
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
    handleClick = () =>{
        this.setState({modalOpen:true});
    }
    handleClose = () =>{
        this.setState({modalOpen: false});
    }
    handleVote(postId,type){
        this.props.dispatch(vote(postId,type))
    }
    handleDeletePost(postId){
        this.props.dispatch(deletePost(postId))
    }

    render(){
    
  const { classes,header,body, postId, votes } = this.props;
  return (
            <Card className={classes.card} >
            <CardActionArea onClick={this.handleClick}>
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
                </CardContent>
            </CardActionArea>
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
                <ModalComments handleClose={this.handleClose} open={this.state.modalOpen} postId={postId}></ModalComments>
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

export default connect()(withStyles(styles)(ImgMediaCard));