import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const postsSlice = createSlice({
    name: 'posts',

    initialState: {
        error: '',
        loading: false,
        posts: [],
        comments: {
            post_id: -1,
            comments: []
        }
    },
    reducers: {
        /* add(state, action) {
            state.todolist.push({
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.desc,
            });
            state.loading = false;
            state.error = false;
        }, */
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            action.payload.forEach(post => {
                state.posts.push({
                    id: post.id,
                    user_id: post.userId,
                    title: post.title,
                    description: post.body,
                });
            });
            state.loading = false;
            state.error = false;
        }),
        builder.addCase(getComments.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getComments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getComments.fulfilled, (state, action) => { console.log(action.payload);
            state.comments.post_id = action.payload.length ? action.payload[0].postId : -1,
            state.comments.comments = [];
            action.payload.forEach(comment => {
                state.comments.comments.push({
                    id: comment.id,
                    title: comment.name,
                    body: comment.body,
                    author: comment.email,
                });
            });
            state.loading = false;
            state.error = false;
        })
        /* builder.addCase(addPost.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(addPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addPost.fulfilled, (state, action) => {
            state.posts.push({
                id: Date.now(),
                user_id: action.payload.userId,
                title: action.payload.title,
                description: action.payload.body,
            });
            state.loading = false;
            state.error = false;
        }) */
    }
});

export const getPosts = createAsyncThunk(
    'getPosts',
    async () => {
        await new Promise(res => setTimeout(res, 1000));
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'Get'
        });

        if (res.status < 200 || res.status >= 300)
            return Promise.reject("Oops, something went wrong >< : [" + res.status + "] " + (res.statusText || "-- no detail --"));

        return await res.json();
    }
);

export const getComments = createAsyncThunk(
    'getComments',
    async (id) => {
        await new Promise(res => setTimeout(res, 1000));
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);

        if (res.status < 200 || res.status >= 300)
            return Promise.reject("Oops, something went wrong >< : [" + res.status + "] " + (res.statusText || "-- no detail --"));

        return await res.json();
    }
);

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