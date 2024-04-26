import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const postsSlice = createSlice({
    name: 'todolist',

    initialState: {
        error: '',
        loading: false,
        posts: []
        /* list of
             - id
             - title
             - description
        */
    },
    reducers: {
        add(state, action) {
            state.todolist.push({
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.desc,
            });
            state.loading = false;
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addPost.pending, (state, action) => {
            console.log('pending');
            console.log(action);
            state.loading = true;
            state.error = false;
        })
            .addCase(addPost.rejected, (state, action) => {
                console.log('rejected');
                console.log(action);
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                console.log('fulfilled');
                console.log(action);
                state.todolist.push({
                    id: Date.now(),
                    title: action.payload.title,
                    description: action.payload.body,
                    checked: false,
                });
                state.loading = false;
                state.error = false;
            })
    }
});

export const addPost = createAsyncThunk(
    'addPost',
    async ({title, desc}) => {
        await new Promise(res => setTimeout(res, 1000));
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                title: title,
                body: desc,
                userId: '---',
            })
        })

        if (res.status < 200 || res.status >= 300)
            return Promise.reject("Oops, something went wrong >< : [" + res.status + "] " + (res.statusText || "-- no detail --"));

        return await res.json();
    }
);


export default postsSlice.reducer;

export const {
    add,
} = postsSlice.actions;