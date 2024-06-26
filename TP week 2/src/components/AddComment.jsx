import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../store/slice/postsSlice";


const AddComment = React.forwardRef((props, ref) => {

    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const error = useSelector((state) => state.posts.error);
    const loading = useSelector((state) => state.posts.loading);
    const dispatch = useDispatch();

    const form_initial_state = {
        title: '',
        title_input: false,
        body: '',
        body_input: false,
        author: '',
        author_input: false,
    }
    const [form, setForm] = useState(form_initial_state);


    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm({
            ...form,
            [name]: value,
            [name + '_input']: true,
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.title.trim() === '' || form.body.trim() === '' || !form.author.match(EMAIL_REGEX))
            return;

        dispatch(addComment({
            title: form.title,
            body: form.body,
            author: form.author,
        }));

        setForm(form_initial_state);
    };


    return (
        <>
            <div ref={ref} id="add-post-comment">

                <h3>Add a comment</h3>

                <form className="add-post-comment" onSubmit={handleSubmit}>

                    <label htmlFor="input-title">Title :</label>
                    <input
                        id="input-title" name="title"
                        type="text"
                        value={form.title}
                        onChange={handleChange}
                        style={!form.title_input ? {} : form.title.trim() === '' ? {borderColor: 'red', outline: 'none'} : {borderColor: 'green', outline: 'none'}}
                    />
                    {
                        (form.title_input && form.title.trim() === '') && <p className="error">no you don't</p>
                    }

                    <label htmlFor="input-body">Body :</label>
                    <textarea
                        id="input-body" name="body"
                        type="text"
                        value={form.body}
                        onChange={handleChange}
                        style={!form.body_input ? {} : form.body.trim() === '' ? {borderColor: 'red', outline: 'none'} : {borderColor: 'green', outline: 'none'}}
                    />
                    {
                        (form.body_input && form.body.trim() === '') && <p className="error">no you don't</p>
                    }

                    <label htmlFor="input-author">Email :</label>
                    <input
                        id="input-author" name="author"
                        type="text"
                        value={form.author}
                        onChange={handleChange}
                        style={!form.author_input ? {} : !form.author.match(EMAIL_REGEX) ? {borderColor: 'red', outline: 'none'} : {borderColor: 'green', outline: 'none'}}
                    />
                    {
                        (form.author_input && !form.author.match(EMAIL_REGEX)) && <p className="error">not an email</p>
                    }

                    <button type="submit" className={(form.title.trim() === '' || form.body.trim() === '' || !form.author.match(EMAIL_REGEX)) ? "disabled" : ""}>
                        <span style={loading ? {} : { display: 'none' }} className="loader"></span>Add
                    </button>

                    {
                        error && <p style={{ color: 'red' }}>{error}</p>
                    }

                </form>
            </div>
        </>
    )
});

export default AddComment;
