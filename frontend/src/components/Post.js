import React, { Component } from 'react';
import {connect} from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

import Card from './Card'

import { sortASC,sortDESC } from '../actions/Posts.js'

class Post extends Component{

  state = {
    sortOrder: 1
  }

  handleClickSort = (property) =>{
    var sortOrder = this.state.sortOrder
    this.setState({sortOrder: -sortOrder})
    if(sortOrder === 1)
      this.props.dispatch(sortASC(property))
    else
      this.props.dispatch(sortDESC(property))
  }

  render (){
     const {posts} = this.props
     if(typeof posts !== 'undefined')
      return(
        <Grid container spacing={24}>
        <Grid item xs={5} sm={5}>
            <Button variant="contained" size="small" color="primary" onClick={()=> {this.handleClickSort('timestamp')}} >
            Sort by date
          </Button>
          <Button variant="contained" size="small" color="primary" style={{marginLeft:'5px'}} onClick={()=> {this.handleClickSort('voteScore')}}>
            Sort by vote score
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          {posts.map((post) => (
            <Card key={post.id} header={post.title} body={post.body} postId={post.id} votes={post.voteScore} comments={post.commentCount} timestamp={post.timestamp} author={post.author} category={post.category} >
          </Card>
        ))}
          </Grid>
        </Grid>
      )
    return(
      <h1>carregando</h1>
    )
  }
}

function mapStateToProps (state) {
    return {  
      posts:state.postsReducer.posts
    }
  }
export default connect (mapStateToProps)(Post)