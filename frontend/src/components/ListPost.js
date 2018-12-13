import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SimpleMenu from './simpleMenu'
import {connect} from 'react-redux'
import { fetchCategories } from '../actions/Category';
import TabPerso from './TabPerso'
class ListPost extends Component{
  state = {
    posts:[],
  }
 
  render (){
    const { categories } = this.props
    //if(categories.length === 0)
     // return(<h1>Deu merda</h1>)
     return(
      <TabPerso></TabPerso>
    )
  }
}
export default connect ()(ListPost)