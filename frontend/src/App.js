import React from 'react'
import { Route,
Switch} from 'react-router-dom'
import './App.css'
import SignIn from './components/SignIn'
import ListPost from './components/ListPost'

class ReadableApp extends React.Component {

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