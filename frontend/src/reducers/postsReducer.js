import { LOAD_POSTS, VOTE_ON_POST, DELETE_POST, EDIT_POST, EDIT_POST_COMMENTS_UP,
	EDIT_POST_COMMENTS_DOWN,SORT_POST_UP,SORT_POST_DOWN } from '../actions/Posts'

function dynamicSort(property,sortOrder) {
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

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
	    case EDIT_POST_COMMENTS_DOWN:
			var currentPostEditDown = [...state.posts]
	      	const indexEditDown = currentPostEditDown.findIndex(post => post.id === action.postId)
    		currentPostEditDown[indexEditDown].commentsCount = currentPostEditDown[indexEditDown].commentsCount+1
		    return {
		      posts: [...currentPostEdit]
		    }
		case EDIT_POST_COMMENTS_UP:
			console.log(action)
			var currentPostEditUp = [...state.posts]
	      	const indexEditUp = currentPostEditUp.findIndex(post => post.id === action.postId)
    		currentPostEditUp[indexEditUp].commentCount = currentPostEditUp[indexEditUp].commentCount+1
		    return {
		      posts: [...currentPostEditUp]
		    }
		case SORT_POST_UP:
			var currentPostSortUp = [...state.posts]
			currentPostSortUp.sort(dynamicSort(action.property,1))
		    return {
		      posts: [...currentPostSortUp]
		    }
	    case SORT_POST_DOWN:
			var currentPostSortDown = [...state.posts]
			currentPostSortDown.sort(dynamicSort(action.property,-1))
		    return {
		      posts: [...currentPostSortDown]
		    }
		default:
			return state
	}
}

export default postsReducer