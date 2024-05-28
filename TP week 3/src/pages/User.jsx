import { useEffect, useState } from "react";
import { getItems } from "../store/slice/itemsSlice";
import { useDispatch, useSelector } from "react-redux";


const User = ({ userName }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSave = () => {
        const userData = { firstName, lastName, email };
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    return (
        <>
            <h2> Hi user !</h2>
            <p>Customize your profile here</p>
            <label >
                Your first name :
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>

            <label >
                Your last name :
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>

            <label >
                Your email :
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <button onClick={handleSave} className="button-save">save</button>
        </>
    );
};
export default User;