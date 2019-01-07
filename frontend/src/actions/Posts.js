import * as ReadableAPI from '../utils/ReadableAPI'
import uuid from "uuid/v4";
export const LOAD_POSTS = 'LOAD_POSTS'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const DELETE_POST = 'DELETE_POST'
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

export const vote = (postId,type) => dispatch => {
	ReadableAPI.vote(postId,type).then((post) => {
		dispatch({
		type: VOTE_ON_POST,
		post
		})
	})
};

export const deletePost = (postId) => dispatch => {
	ReadableAPI.deletePost(postId).then((post) => {
		dispatch({
		type: DELETE_POST,
		postId
		})
	})
};