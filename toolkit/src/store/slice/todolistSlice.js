import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const todolistSlice = createSlice({
    name: 'todolist',

    initialState: {
        error: '',
        loading: false,
        todolist: []
        /* list of
             - id
             - title
             - description
             - checked
        */
    },
    reducers: {
        add(state, action) {
            state.todolist.push({
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.desc,
                checked: false,
            });
            state.loading = false;
            state.error = false;
        },
        setChecked(state, action) {
            state.todolist.find((t) => t.id == action.payload.id).checked = action.payload.checked;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodo.pending, (state, action) => {
            console.log('pending');
            console.log(action);
            state.loading = true;
            state.error = false;
        })
            .addCase(addTodo.rejected, (state, action) => {
                console.log('rejected');
                console.log(action);
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
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

export const addTodo = createAsyncThunk(
    'addTodo',
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


export default todolistSlice.reducer;

export const {
    add,
    setChecked
} = todolistSlice.actions;