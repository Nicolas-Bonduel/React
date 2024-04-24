import { useState } from "react";
import store from "./store/index.js";

function Home() {

    const [form_name, setFormName] = useState('');
    const [form_name_input, setFormNameInput] = useState(false);
    const [form_age, setFormAge] = useState('');
    const [form_age_input, setFormAgeInput] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form_name || form_age <= 0 || form_age >= 1000)
            return;

        store.dispatch({type: "add", payload: {name: form_name, age: form_age}});

        setFormName(''); setFormNameInput(false);
        setFormAge(''); setFormAgeInput(false);
    };

    return (
        <>
        <div id="home">
            <h1>Homepage</h1>

            <h2>Add a dragon :</h2>
                <form className="roll" onSubmit={handleSubmit}>

                <label htmlFor="input-name">Name :</label>
                <input 
                    id="input-name" name="name"
                    type="text"
                    value={form_name}
                    onChange={(e) => {setFormName(e.target.value); setFormNameInput(true); } }
                />
                {
                    (form_name_input && form_name.trim() == '') && <p className="error">no you don't</p>
                }

                <label htmlFor="input-age">Age :</label>
                <input 
                    id="input-age" name="age"
                    type="number"
                    value={form_age}
                    onChange={(e) => {setFormAge(e.target.value); setFormAgeInput(true); } }
                />
                {
                    (form_age_input && form_age <= 0) && <p className="error">you lyin'</p>
                }
                {
                    (form_age_input && form_age >= 1000) && <p className="error">pretty old eh?</p>
                }

                    <button type="submit" className={ (!form_name || form_age <= 0 || form_age >= 1000) ? "disabled" : "" }>Add</button>
                </form>
        </div>
        </>
    )

}

export default Home;