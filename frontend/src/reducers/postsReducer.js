import { LOAD_POSTS, VOTE_ON_POST, DELETE_POST } from '../actions/Posts'

export function postsReducer(state={},action){
	switch(action.type){
		case LOAD_POSTS:
			const { posts } = action
			return {
				...state,
				posts
			}
		case VOTE_ON_POST:
			const currentPostVote = [...state.posts]
	      	const index= currentPostVote.findIndex(post => post.id === action.post.id)
    		currentPostVote[index].voteScore = action.post.voteScore
		    return {
		      posts: [...currentPostVote]
		    }
		 case DELETE_POST:
		 	var currentPostDelete = [...state.posts]
	      	const indexDelete = currentPostDelete.findIndex(post => post.id === action)
	      	var aux = currentPostDelete.splice(indexDelete,1)
	      	return {
		      posts: [...currentPostDelete]
		    }
		default:
			return state

	}
}

export default postsReducer