import {legacy_createStore as createStore, combineReducers} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';

test1 = (state, action) => {
    switch(action.type) {
        case 'TEST1/set':
            return action.payload

        default:
            return state;
    }
},
{
    test: ''
}

test2 = (state, action) => {
    switch(action.type) {
        case 'TEST2/set':
            return action.payload

        default:
            return state;
    }
},
{
    test: ''
}

export const store = createStore(
    combineReducers({
        test1: test1,
        test2: test2
    }),
    composeWithDevTools()
);

export default store