import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './slice/cartSlice';
import itemsSlice from './slice/itemsSlice';

const store = configureStore({
    reducer: {
        cart: cartSlice,
        items: itemsSlice,
    }
});

export default store;