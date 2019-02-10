import React, { Component } from 'react';
import {connect} from 'react-redux'
import TabPerso from './TabPerso'
class ListPost extends Component{
  state = {
    posts:[],
  }
 
  render (){
     return(
      <TabPerso category={this.props.match.params.category}></TabPerso>
    )
  }
}
export default connect ()(ListPost)