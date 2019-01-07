import * as ReadableAPI from '../utils/ReadableAPI'
import uuid from "uuid/v4";
export const LOAD_POSTS = 'LOAD_POSTS'

export const loadPosts = posts => ({
	type: LOAD_POSTS,
	posts
})

export const fetchPosts = category => dispatch => (
	ReadableAPI
	.getPosts(category)
	.then(posts => dispatch(loadPosts(posts)))
);

export const fetchRegisterPost = (title,body,author,category,id=uuid(),timestamp=Date.now()) => dispatch => (
	ReadableAPI
	.registerPost(title,body,author,category,id,timestamp)
);