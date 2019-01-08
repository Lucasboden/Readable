import { headers, API } from './config'

export const getAllCategories = () =>
  fetch(`${API}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)

export const getPosts = category =>{
  const path = category === 'all' ? 'posts' : `${category}/posts`
  return(fetch(`${API}/${path}`, { headers })
  .then(res => 
  	res.json()))
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
		return(res.json())})
}

export const vote = (postId, type) =>{
	return fetch(`${API}/posts/${postId}`,
	{
	  method: 'POST',
	headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
	  body: JSON.stringify({ 
	    option: type,
	   }) 
	}).then(res => 
		res.json()
	)
}

export const deletePost = (postId) =>{
	return fetch(`${API}/posts/${postId}`,
	{
	  method: 'DELETE',
	headers,
	}).then(res => 
		res.json()
	)
}

export const getComments = (postId) =>{
	return fetch(`${API}/posts/${postId}/comments`,
	{
	  method: 'GET',
	headers,
	}).then(res => 
		res.json()
	)	
}

export const registerComment = (body,author,postId,id,timestamp) =>{
	return fetch(`${API}/comments`,
	{
	  method: 'POST',
	headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
	  body: JSON.stringify({ 
	    id: id,
	    body: body,
	    author: author,
	    parentId: postId,
	    timestamp: timestamp,
	   }) 
	}).then(res => 
		res.json())
}

export const voteComment = (commentId, type) =>{
	console.log(type)
	return fetch(`${API}/comments/${commentId}`,
	{
	  method: 'POST',
	headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
	  body: JSON.stringify({ 
	    option: type,
	   }) 
	}).then(res => 
		res.json()
	)
}

export const deleteComment = (commentId) =>{
	return fetch(`${API}/comments/${commentId}`,
	{
	  method: 'DELETE',
	headers,
	}).then(res => 
		res.json()
	)
}

  

