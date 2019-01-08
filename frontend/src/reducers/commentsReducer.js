import { LOAD_COMMENTS,VOTE_ON_COMMENT,DELETE_COMMENT,ADD_COMMENT } from '../actions/Comments'

export function commentsReducer(state={},action){
	switch(action.type){
		case LOAD_COMMENTS:
			const { comments } = action
			return {
				...state,
				comments
			}
		case VOTE_ON_COMMENT:
			const currentCommentVote = [...state.comments]
	      	const index= currentCommentVote.findIndex(comment => comment.id === action.comment.id)
    		currentCommentVote[index].voteScore = action.comment.voteScore
		    return {
		      comments: [...currentCommentVote]
		    }
		case DELETE_COMMENT:
			var currentCommentDelete = [...state.comments]
		 	const indexDelete = currentCommentDelete.findIndex(comment => comment.id === action.comment.commentId)
	      	currentCommentDelete.splice(indexDelete,1)
	      	return {
	      		comments: [...currentCommentDelete],
		    }
		case ADD_COMMENT:
			var currentCommentAdd = [...state.comments]
			currentCommentAdd.push(action.comment)
			return{
				comments: [...currentCommentAdd]
			}
		default:
			return state
	}
}

export default commentsReducer