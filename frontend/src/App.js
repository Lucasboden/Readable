import React from 'react'
import { Route,
Switch} from 'react-router-dom'
import './App.css'
import SignIn from './components/SignIn'
import ListPost from './components/ListPost'
import { loadCategories } from './actions/Category'
class ReadableApp extends React.Component {

  state = {
    categories : []
  }

  componentDidMount() {
    const { store } = this.props
    this.setState(() => ({
      categories: store.getState()
    }))
  }
  loadAllCategories = () => {
    this.props.store.dispatch(this.loadCategories())
  }
/*  
  
  

  checkBook = (book) => {
    this.state.want_to_read.map((stBook) => {
      if(stBook.id === book.id){
        book.shelf = stBook.shelf
      }
    })
    this.state.currently_reading.map((stBook) => {
      if(stBook.id === book.id){
        book.shelf = stBook.shelf
      }
    })
    this.state.read.map((stBook) => {
      if(stBook.id === book.id){
        book.shelf = stBook.shelf
      }
    })
  }

  updateShelf = (updatedBook,shelf) =>{
    BooksAPI.update(updatedBook,shelf)
    updatedBook.shelf = shelf;
    this.setState(prevState => {
      var cuRe= prevState.currently_reading.filter(book => book.id !== updatedBook.id);
      var waRe= prevState.want_to_read.filter(book => book.id !== updatedBook.id);
      var re= prevState.read.filter(book => book.id !== updatedBook.id);
      switch(shelf){
        case 'currentlyReading':
          cuRe= prevState.currently_reading.concat(updatedBook)
          break;
        case 'wantToRead':
          waRe= prevState.want_to_read.concat(updatedBook)
          break;
        case 'read':
          re= prevState.read.concat(updatedBook)
          break;
        default:
          break;
      };
      return {currently_reading:cuRe,want_to_read:waRe,read:re, all_books:prevState.all_books};
    });
  };*/

  

  render() {
    return (
      <div>
      <Switch>
        <Route exact path='/' render={() => (
          <SignIn/>
        )}/>
        <Route path='/home' render={(history) => (
          <ListPost/>
        )}/>
      </Switch>
      </div>
    )
  }
}

export default ReadableApp