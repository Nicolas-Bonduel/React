import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/slice/postsSlice";


const AddPost = React.forwardRef((props, ref) => {

    const error = useSelector((state) => state.posts.error);
    const loading = useSelector((state) => state.posts.loading);
    const dispatch = useDispatch();

    const form_initial_state = {
        title: '',
        title_input: false,
        body: '',
        body_input: false,
    }
    const [form, setForm] = useState(form_initial_state);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
            [name + '_input']: true,
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.title.trim() === '' || form.body.trim() === '')
            return;

        dispatch(addPost({
            title: form.title,
            body: form.body,
        }));

        setForm(form_initial_state);
    };


    return (
        <>
            <div ref={ref} id="add-post-comment">

                <h3>Add a post</h3>

                <form className="add-post-comment" onSubmit={handleSubmit}>

                    <label htmlFor="input-title">Title :</label>
                    <textarea
                        id="input-title" name="title"
                        type="text"
                        rows="2"
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
                        rows="4"
                        value={form.body}
                        onChange={handleChange}
                        style={!form.body_input ? {} : form.body.trim() === '' ? {borderColor: 'red', outline: 'none'} : {borderColor: 'green', outline: 'none'}}
                    />
                    {
                        (form.body_input && form.body.trim() === '') && <p className="error">no you don't</p>
                    }

                    <button type="submit" className={(form.title.trim() === '' || form.body.trim() === '') ? "disabled" : ""}>
                        <div className="loader-wrapper-btn">
                            <span style={loading ? {} : { display: 'none' }} className="loader"></span>
                        </div>
                        Add
                    </button>

                    {
                        error && <p style={{ color: 'red' }}>{error}</p>
                    }

                </form>
            </div>
        </>
    )
});

export default AddPost;
