import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',

    initialState: {
        items: [],
        loadingFor: -1,
    },
    reducers: {
        add(state, action) {
            let idx = state.items.findIndex(i => i.id === action.payload.id);
            if (idx === -1)
                state.items.push({
                    id: action.payload.id,
                    qty: action.payload.qty ?? 1,
                });
            else
                state.items[idx].qty += action.payload.qty;

            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },

        updateQuantity(state, action) {
            const { id, qty } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.qty = qty;
            }

            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },

        delete_(state, action) {
            let idx = state.items.findIndex(i => i.id === action.payload.id);
            if (idx !== -1)
                state.items.splice(idx, 1);

            if (state.items.length)
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            else
                localStorage.removeItem('cartItems');
        },
        destroy(state, action) {
            state.items = [];

            localStorage.removeItem('cartItems');
        },
        restore(state, action) {
            let cartItems = localStorage.getItem('cartItems');
            if (cartItems)
                state.items = JSON.parse(cartItems);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addAsync.pending, (state, action) => {
            state.loadingFor = action.meta.arg.id;
        })
        .addCase(addAsync.rejected, (state, action) => {
            state.loadingFor = -1;
        })
        .addCase(addAsync.fulfilled, (state, action) => {
            let idx = state.items.findIndex(i => i.id === action.payload.id);
            if (idx === -1)
                state.items.push({
                    id: action.payload.id,
                    qty: action.payload.qty ?? 1,
                });
            else
                state.items[idx].qty += action.payload.qty;

            state.loadingFor = -1;

            localStorage.setItem('cartItems', JSON.stringify(state.items));
        })
    }
});


const CartItem = ({ item, onAdd, onDelete, onUpdateQuantity }) => {
    const handleIncrease = () => {
        onUpdateQuantity(item.qty + 1);
    };

    const handleDecrease = () => {
        if (item.qty > 1) {
            onUpdateQuantity(item.qty - 1);
        } else {
            onDelete();
        }
    };
}


export const addAsync = createAsyncThunk(
    'addAsync',
    async ({ id, qty }) => {
        await new Promise(res => setTimeout(res, 2000)); // enjoy the loader!

        return { id, qty };
    }
);


export default cartSlice.reducer;

export const {
    add,
    delete_,
    updateQuantity,
    destroy,
    restore,
} = cartSlice.actions;