import {createSlice} from '@reduxjs/toolkit';

const todolistSlice = createSlice({
    name: 'todolist',
    reducers: {
        add(state, action) {
            state.todolist.push({
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.desc,
                checked: false,
            });
        },
        setChecked(state, action) {
            state.todolist.find((t) => t.id == action.payload.id).checked = action.payload.checked;
        }
    },
    initialState: {
        todolist: []
        /* list of
             - id
             - title
             - description
             - checked
        */
    }
});

export default todolistSlice.reducer;

export const {
    add,
    setChecked
} = todolistSlice.actions;