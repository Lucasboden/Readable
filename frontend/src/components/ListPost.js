import React, { Component } from 'react';
import {connect} from 'react-redux'
import TabPerso from './TabPerso'
class ListPost extends Component{
  state = {
    posts:[],
  }
 
  render (){
     return(
      <TabPerso></TabPerso>
    )
  }
}
export default connect ()(ListPost)