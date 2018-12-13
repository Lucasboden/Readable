import { headers, API } from './config'

/*
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
*/
export const getAllCategories = () =>
  fetch(`${API}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)

export const getPosts = category =>{
  const path = category === 'all' ? 'posts' : `${category}/posts`
  return(fetch(`${API}/${path}`, { headers })
  .then(res => res.json()))
  //.then(data => data.map(item => item.id))
}

  

