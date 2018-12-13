
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Modal from './Modal'
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
    render(){
    
  const { classes,header,body } = this.props;
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
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
                <Modal handleClose={this.handleClose} open={this.state.modalOpen}></Modal>
            </CardActions>
            </Card>
  );
}
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default withStyles(styles)(ImgMediaCard);