import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/slice/postsSlice";


const AddPost = React.forwardRef((props, ref) => {

    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
        const {name, value} = e.target;

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
            <div ref={ref} id="add-comment">

                <h3>Add a comment</h3>

                <form className="add-comment" onSubmit={handleSubmit}>

                    <label htmlFor="input-title">Title :</label>
                    <input
                        id="input-title" name="title"
                        type="text"
                        value={form.title}
                        onChange={handleChange}
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
                    />
                    {
                        (form.body_input && form.body.trim() === '') && <p className="error">no you don't</p>
                    }

                    <button type="submit" className={(form.title.trim() === '' || form.body.trim() === '') ? "disabled" : ""}>
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

export default AddPost;
