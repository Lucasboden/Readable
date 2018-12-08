import { LOAD_CATEGORIES } from '../actions/Category'

export function categoryReducer(state={},action){
	switch(action.type){
		case LOAD_CATEGORIES:
			return Object.assign({},state, {
				categories: action
			})
		default:
			return state
	}
}

export default categoryReducer