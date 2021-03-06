import { LOAD_COMMENTS,VOTE_ON_COMMENT,DELETE_COMMENT,ADD_COMMENT } from '../actions/Comments'

var checkId = (action) =>(id) =>{
	return id.id !== action.comment.id
}

export function commentsReducer(state={},action){
	switch(action.type){
		case LOAD_COMMENTS:
			const { comments } = action
			return {
				...state,
				comments
			}
		case VOTE_ON_COMMENT:
			const updatedComments = state.comments.map(comment => {
			    if (comment.id === action.comment.id) {
			        comment = action.comment
			    }
			    return comment
			})
			return{
				comments:updatedComments
			}
		case DELETE_COMMENT:
		var currentCommentDelete = [...state.comments].filter(checkId(action))
		return {
		 comments: [...currentCommentDelete]
	   }
		case ADD_COMMENT:
			var currentCommentAdd = [...state.comments]
			currentCommentAdd.push(action.comment)
			return{
				comments: [...currentCommentAdd],
			}
		default:
			return state
	}
}

export default commentsReducer