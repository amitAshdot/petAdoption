import { petsTypes } from './petsTypes';

const initialState = {
    count: 0,
    pageNum: 0,
    searchResults: [],
    searchInputs: {
        type: '',
        region: '',
        gender: '',
        ageGroup: ''
    },
    loading: false,
    error: ""
};

const petReducer = (state = initialState, action) => {
    switch (action.type) {

        case petsTypes.SEARCH_PETS_START:
            return { ...state, loading: true, error: '' }

        case petsTypes.SEARCH_PETS_FAIL:
            return { ...state, loading: false, error: action.err }

        case petsTypes.SEARCH_PETS_SUCCESS:
            return { ...state, loading: false, searchResults: action.pets }

        case petsTypes.SEARCH_PETS_AND_COUNT_SUCCESS:
            return { ...state, loading: false, searchResults: action.pets, count: action.count, pageNum: action.pageNum }
            
        default:
            return state;
    }
}
export default petReducer;