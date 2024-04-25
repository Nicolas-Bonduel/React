import {configureStore} from '@reduxjs/toolkit';
import todolistSlice from './slice/todolistSlice';
import debuggerSlice, {add, reset, actions} from './slice/debuggerSlice';

const middleware = (store) => (next) => (action) => {
    
    const debugger_actions = Object.keys(actions).map((k) => actions[k].toString())

    /* if (action.type !== add.toString() && action.type !== reset.toString()) */
    if (!debugger_actions.includes(action.type))
        store.dispatch(add(action))

    next(action);
}

const store = configureStore({
    reducer: {
        todolist: todolistSlice,
        debugger: debuggerSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        middleware
    ])
});

export default store;