import { LOAD_POSTS } from '../actions/Posts'

export function postsReducer(state={},action){
	switch(action.type){
		case LOAD_POSTS:
			const { posts } = action
			return {
				...state,
				posts
			}
			default:
				return state
	}
}

export default postsReducer