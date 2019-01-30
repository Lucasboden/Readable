import * as ReadableAPI from '../utils/ReadableAPI'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const CHANGE_CATEGORIE_ID = 'CHANGE_CATEGORIE_ID'

export const loadCategories = categories => ({
	type: LOAD_CATEGORIES,
	categories
})

export const changeCategorieId = categorieId => ({
	type: CHANGE_CATEGORIE_ID,
	categorieId
})

export const fetchCategories = () => dispatch => (
	ReadableAPI
	.getAllCategories()
	.then(categories => dispatch(loadCategories(categories)))
);
