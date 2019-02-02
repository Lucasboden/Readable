import { LOAD_POSTS, VOTE_ON_POST, DELETE_POST, EDIT_POST, EDIT_POST_COMMENTS_UP,
	EDIT_POST_COMMENTS_DOWN,SORT_POST_UP,SORT_POST_DOWN } from '../actions/Posts'

function dynamicSort(property,sortOrder) {
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

var checkId = (action) =>(id) =>{
	return id.id !== action.postId
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
			const updatedPosts = state.posts.map((post,i) => {
		    if (post.id === action.post.id) {
		        return {
		            ...state,
		            posts[voteScore: action.post
		        }
		    }
		    return post
		})
		case DELETE_POST:
		 	var currentPostDelete = [...state.posts].filter(checkId(action))
		 	return {
		      posts: [...currentPostDelete]
		    }
	   	case EDIT_POST:
			return{
				...state,
				[action.post.id]: action.post
			}
	    case EDIT_POST_COMMENTS_DOWN:
		    state.posts.map(post => {
		    if (post.id === action.postId) {
		        return {
		            ...post,
		            commentsCount: post['commentCount'] - 1
		        }
		    }
		    return post
		   })
		case EDIT_POST_COMMENTS_UP:
		state.posts.map(post => {
		    if (post.id === action.postId) {
		        return {
		            ...post,
		            commentsCount: post['commentCount'] + 1
		        }
		    }
		    return post
		   })
		case SORT_POST_UP:
			var currentPostSortUp = [...state.posts].sort(dynamicSort(action.property,1))
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