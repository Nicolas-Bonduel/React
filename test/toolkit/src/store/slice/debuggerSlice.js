import {createSlice} from '@reduxjs/toolkit';

const debuggerSlice = createSlice({
    name: 'debugger',
    reducers: {
        add(state, action) {
            state.actions.push(action.payload)
        },
        reset(state, action) {
            state.actions = []
        }
    },
    initialState: {
        actions: []
    }
});

export default debuggerSlice.reducer;

export const {
    add,
    reset
} = debuggerSlice.actions;

export const actions = debuggerSlice.actions;