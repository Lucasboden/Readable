import React, { Component } from 'react';
import {connect} from 'react-redux'
import Card from './Card'
import Grid from '@material-ui/core/Grid'

class Post extends Component{
  render (){
        //if(categories.length === 0)
     // return(<h1>Deu merda</h1>)
     const {posts} = this.props
     console.log(posts)
     if(typeof posts !== 'undefined')
      return(
        <Grid container>
          <Grid item sm>
            {posts.map((post) => (
              <Card header={post.title} body={post.body}>
              </Card>
            ))}
          </Grid>
        </Grid>
        //postsItens(posts)
      )
    return(
      <h1>carregando</h1>
    )
  }
}

function postsItens (posts){
  if(typeof posts === 'undefined')
    return(<h1>carregando</h1>)
  return(<h1>{posts[0]}</h1>)
}

function mapStateToProps (state) {
    return {  
      posts:state.postsReducer.posts
    }
  }
export default connect (mapStateToProps)(Post)