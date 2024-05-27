import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'posts',

    initialState: {
        items: [],
    },
    reducers: {
        add(state, action) {
            state.items.push({
                id: action.payload.id,
            });
        },
        delete_(state, action) {
            let idx = state.items.findIndex(i => i.id === action.apyload.id);
            if (idx !== -1)
                state.items.splice(idx, 1);
        },
        destroy(state, action) {
            state.items = [];
        },
    },
});


export default cartSlice.reducer;

export const {
    add,
    delete_,
    destroy,
} = cartSlice.actions;