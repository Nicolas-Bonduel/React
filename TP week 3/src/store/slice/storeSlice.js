import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const storeSlice = createSlice({
    name: 'store',

    initialState: {
        loading: false,
        error: '',
        items: [],
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getItems.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getItems.fulfilled, (state, action) => {
            state.items = [...action.payload];
            state.loading = false;
            state.error = false;
        })
    }
});

export const getItems = createAsyncThunk(
    'getItems',
    async () => {
        await new Promise(res => setTimeout(res, 3000));
        const res = await fetch('https://fakestoreapi.com/products', {
            method: 'Get'
        });

        if (res.status < 200 || res.status >= 300)
            return Promise.reject("Oops, something went wrong >< : [" + res.status + "] " + (res.statusText || "-- no detail --"));

        return await res.json();
    }
);


export default storeSlice.reducer;

/*export const {
    
} = storeSlice.actions;*/