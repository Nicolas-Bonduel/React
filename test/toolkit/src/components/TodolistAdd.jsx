import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/slice/todolistSlice";


function TodolistAdd() {

    const todolist = useSelector((state) => state.todolist.todolist);
    const dispatch = useDispatch();


    const [form_title, setFormTitle] = useState('');
    const [form_title_input, setFormTitleInput] = useState(false);
    const [form_desc, setFormDesc] = useState('');
    const [form_desc_input, setFormDescInput] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form_title.trim() === '' || form_desc.trim === '')
            return;

        dispatch(add({ title: form_title, desc: form_desc }));

        setFormTitle(''); setFormTitleInput(false);
        setFormDesc(''); setFormDescInput(false);
    };

    return (
        <>
            <h2>Add a todo :</h2>
            <form className="add-todolist" onSubmit={handleSubmit}>

                <label htmlFor="input-title">Title :</label>
                <input
                    id="input-title" name="title"
                    type="text"
                    value={form_title}
                    onChange={(e) => { setFormTitle(e.target.value); setFormTitleInput(true); }}
                />
                {
                    (form_title_input && form_title.trim() === '') && <p className="error">no you don't</p>
                }

                <label htmlFor="input-desc">Description :</label>
                <input
                    id="input-desc" name="desc"
                    type="text"
                    value={form_desc}
                    onChange={(e) => { setFormDesc(e.target.value); setFormDescInput(true); }}
                />
                {
                    (form_desc_input && form_desc.trim() === '') && <p className="error">no you don't</p>
                }

                <button type="submit" className={(form_desc.trim === '' || form_desc.trim() === '') ? "disabled" : ""}>Add</button>
            </form>
        </>
    )
}

export default TodolistAdd;