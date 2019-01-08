import * as ReadableAPI from '../utils/ReadableAPI'
import uuid from "uuid/v4";

export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export const loadComments = comments => ({
	type: LOAD_COMMENTS,
	comments
})

export const fetchComments = postId => dispatch => (
	ReadableAPI
	.getComments(postId)
	.then(comments => dispatch(loadComments(comments)))
);

export const fetchRegisterComment = (body,author,postId,id=uuid(),timestamp=Date.now()) => dispatch => {
	return ReadableAPI
	.registerComment(body,author,postId,id,timestamp).then(comment => {
		dispatch({
			type: ADD_COMMENT,
			comment
		})
	})
};

export const vote = (commentId,type) => dispatch => {
	ReadableAPI.voteComment(commentId,type).then((comment) => {
		dispatch({
		type: VOTE_ON_COMMENT,
		comment
		})
	})
};

export const deleteComment = (commentId) => dispatch => {
	ReadableAPI.deleteComment(commentId).then((comment) => {
		dispatch({
		type: DELETE_COMMENT,
		commentId
		})
	})
};

export const getCommentDetails = (commentId) => dispatch => {
	return ReadableAPI.getComment(commentId)
};

export const editComment = (commentContent,commentId,timestamp=Date.now()) => dispatch => {
	return ReadableAPI.editComment(commentContent,commentId).then((comment) =>{
		dispatch({
		type: EDIT_COMMENT,
		comment
		})	
	})
};