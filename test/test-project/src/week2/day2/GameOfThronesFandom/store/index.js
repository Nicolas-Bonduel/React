import {legacy_createStore as createStore, combineReducers} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';

const dragonsReducer = (state = {dragons: []}, action) => {
    switch(action.type) {
        case 'add':
            return { ...state,
                dragons: [...state.dragons, action.payload]
            }

        default:
            return state;
    }
}

export const store = createStore(
    combineReducers({
        dragonsReducer: dragonsReducer
    }),
    composeWithDevTools()
);

export default store