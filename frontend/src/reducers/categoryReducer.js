import { LOAD_CATEGORIES,CHANGE_CATEGORIE_ID } from '../actions/Category'

export function categoryReducer(state={},action){
	switch(action.type){
		case LOAD_CATEGORIES:
			const { categories } = action
			return {
				...state,
				categories
			}
		case CHANGE_CATEGORIE_ID:
		const {categorie} = action
			return {
				...state,
				categorie
			}
		default:
			return state
	}
}

export default categoryReducer