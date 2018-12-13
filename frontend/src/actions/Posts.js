import * as ReadableAPI from '../utils/ReadableAPI'
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