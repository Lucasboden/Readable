import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as ReadableAPI from '../utils/ReadableAPI'
import SimpleMenu from './simpleMenu'
class ListPost extends Component{
  state = {
    categories:[],
  }
  componentDidMount(){
    ReadableAPI.getAllCategories().then(response => {
      this.setState({categories:response})
    })
  }
  render (){
    
    //if(categories.length === 0)
     // return(<h1>Deu merda</h1>)
    return(
      <div>
     <SimpleMenu/>
     </div>
    )
  }
}
export default ListPost