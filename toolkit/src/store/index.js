import {configureStore} from '@reduxjs/toolkit';
import todolistSlice from './slice/todolistSlice';

const store = configureStore({
    reducer: {
        todolist: todolistSlice
    }
});

export default store;