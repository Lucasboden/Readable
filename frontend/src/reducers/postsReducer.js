import { LOAD_POSTS, VOTE_ON_POST, DELETE_POST, EDIT_POST } from '../actions/Posts'

export function postsReducer(state={},action){
	switch(action.type){
		case LOAD_POSTS:
			const { posts } = action
			return {
				...state,
				posts
			}
		case VOTE_ON_POST:
			console.log(state)
			const currentPostVote = [...state.posts]
	      	const index= currentPostVote.findIndex(post => post.id === action.post.id)
    		currentPostVote[index].voteScore = action.post.voteScore
		    return {
		      posts: [...currentPostVote]
		    }
		case DELETE_POST:
		 	var currentPostDelete = [...state.posts]
	      	const indexDelete = currentPostDelete.findIndex(post => post.id === action)
	      	currentPostDelete.splice(indexDelete,1)
	      	return {
		      posts: [...currentPostDelete]
		    }
	   	case EDIT_POST:
			var currentPostEdit = [...state.posts]
	      	const indexEdit= currentPostEdit.findIndex(post => post.id === action.id)
    		currentPostEdit[indexEdit] = action
		    return {
		      posts: [...currentPostEdit]
		    }
		default:
			return state

	}
}

export default postsReducer