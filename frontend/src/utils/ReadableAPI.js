import { headers, API } from './config'

export const getAllCategories = () =>
  fetch(`${API}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)

export const getPosts = category =>{
  const path = category === 'all' ? 'posts' : `${category}/posts`
  return(fetch(`${API}/${path}`, { headers })
  .then(res => res.json()))
}

export const registerPost = (title,body,author,category,id,timestamp) =>{
	fetch(`${API}/posts`,
	{
	  method: 'POST',
	  
	headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
	  body: JSON.stringify({ 
	    id: id,
	    title: title,
	    body: body,
	    author: author,
	    category: category,
	    timestamp: timestamp,
	   }) 
	}).then(res => {
		console.log(res)
		return(res.json())})
}

  

