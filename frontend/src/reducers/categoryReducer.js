import { LOAD_CATEGORIES } from '../actions/Category'

export function categoryReducer(state={},action){
	switch(action.type){
		case LOAD_CATEGORIES:
			const { categories } = action
			return {
				...state,
				categories
			}
		default:
			return state
	}
}

export default categoryReducer