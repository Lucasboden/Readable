import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as ReadableAPI from '../utils/ReadableAPI'
class ListPost extends Component{
  static propTypes = {
    allCategories: PropTypes.array.isRequired,
  }
  state = {
    categories:[],
  }
  componentDidMount() {
    this.setState({
      categories:this.props.allCategories
    })
  }
  render (){
    const {categories} = this.state
    if(categories.length === 0)
      return(<h1>Deu merda</h1>)
    return(
      <div>
        <ol>
     {categories.map((categorie) => (
      <li> {categorie.name} </li>
      ))}
      </ol>
     </div>
    )
  }
}
export default ListPost