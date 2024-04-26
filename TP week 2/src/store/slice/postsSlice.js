import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const postsSlice = createSlice({
    name: 'posts',

    initialState: {
        error: '',          // error message returned by an api call (fortunately, we only need one since we never make multiple calls)
        loading: false,     // are we waiting for an api response? (same thing here, only one at a time)
        posts: [],          // list of posts
        comments: {
            post_id: -1,    // active post_id
            comments: []    // list of comments for current post_id
        }
    },
    reducers: {
        resetComments(state, action) {
            state.comments.post_id = -1,
            state.comments.comments = []
        },
        addComment(state, action) {
            state.comments.comments.push({
                id: action.payload.id,
                title: action.payload.title,
                body: action.payload.body,
                author: action.payload.author,
            });
            state.loading = false;
            state.error = false;
        },
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
        .addCase(getComments.fulfilled, (state, action) => {
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
        builder.addCase(addPost.pending, (state, action) => {
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
        })
    }
});

export const getPosts = createAsyncThunk(
    'getPosts',
    async () => {
        await new Promise(res => setTimeout(res, 3000));
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
        await new Promise(res => setTimeout(res, 3000));
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);

        if (res.status < 200 || res.status >= 300)
            return Promise.reject("Oops, something went wrong >< : [" + res.status + "] " + (res.statusText || "-- no detail --"));

        return await res.json();
    }
);

export const addPost = createAsyncThunk(
    'addPost',
    async ({title, body}) => {
        await new Promise(res => setTimeout(res, 3000));
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1,
            })
        })

        if (res.status < 200 || res.status >= 300)
            return Promise.reject("Oops, something went wrong >< : [" + res.status + "] " + (res.statusText || "-- no detail --"));

        return await res.json();
    }
);


export default postsSlice.reducer;

export const {
    addComment,
    resetComments,
} = postsSlice.actions;