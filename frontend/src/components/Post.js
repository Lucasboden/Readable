import React, { Component } from 'react';
import {connect} from 'react-redux'
import Card from './Card'
import Grid from '@material-ui/core/Grid'

class Post extends Component{
  render (){
        //if(categories.length === 0)
     // return(<h1>Deu merda</h1>)
     const {posts} = this.props
     if(typeof posts !== 'undefined')
      return(
        <Grid container>
          <Grid item sm>
            {posts.map((post) => (
              <Card key={post.id}header={post.title} body={post.body}>
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