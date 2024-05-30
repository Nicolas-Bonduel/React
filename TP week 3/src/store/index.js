import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './slice/cartSlice';
import storeSlice from './slice/storeSlice';

const store = configureStore({
    reducer: {
        cart: cartSlice,
        store: storeSlice,
    }
});

export default store;