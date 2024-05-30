import { useContext, useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider"

import '../assets/user.scss'


const User = () => {

    // O_x
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { user, logout, editAccount, editAccountMsg } = useContext(AuthContext);  //
    const [inputs, setInputs] = useState({                                          //
        firstname: user?.firstname ?? '',
        firstname_ini: true,
        lastname: user?.lastname ?? '',
        lastname_ini: true,
        email: user?.email ?? '',
        email_ini: true,
    });
    const [lastEditAccountMsg, setLastEditAccountMsg] = useState(editAccountMsg);   //
    const [timeoutId, setTimeoutId] = useState(0);                                  //
    const notifier_ref = useRef(null);                                              //


    /* sanity check */
    if (!user)
        return <Navigate to='/' /> /* get out of here you dirty unlogged user! */

    
    const handleChange = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value,
            [name + '_ini']: false,
        });
    }

    const handleEdit = () => {

        if (inputs.firstname.trim() === '' || inputs.lastname.trim() === '' || !inputs.email.match(EMAIL_REGEX))
            return;

        editAccount({
            firstname: inputs.firstname,
            lastname: inputs.lastname,
            email: inputs.email,
        });
    };
    

    useEffect(() => {
        if (editAccountMsg.type && editAccountMsg.msg) {
            setLastEditAccountMsg(editAccountMsg);
            notifier_ref.current.style.opacity = 1;
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(0);
            }
        }
        else {
            notifier_ref.current.style.opacity = 0;
            let timeoutId_ = setTimeout(() => {
                setLastEditAccountMsg(editAccountMsg);
                notifier_ref.current.style.opacity = 1;
            }, 1000);
            setTimeoutId(timeoutId_);
        }
    }, [editAccountMsg]);


    return (
        <>
            <div id="user-page">
                <h2>
                    Hey there, {user?.firstname ?? ''} {user?.lastname ?? ''} !
                    <button className="logout" onClick={logout}>Logout</button>
                </h2>
                <p className="describ">Customize your profile here</p>

                <div className="flex">
                    <span>Your first name :</span>
                    <input type="text" value={inputs.firstname} onChange={(e) => handleChange('firstname', e.target.value)}
                        style={inputs.firstname_ini ? {} : inputs.firstname.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                    />
                </div>

                <div className="flex">
                    <span>Your last name :  </span>
                    <input type="text" value={inputs.lastname} onChange={(e) => handleChange('lastname', e.target.value)}
                        style={inputs.lastname_ini ? {} : inputs.lastname.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                    />
                </div>

                <div className="flex">
                    <span>Your email : </span>
                    <input type="email" value={inputs.email} onChange={(e) => handleChange('email', e.target.value)}
                        style={inputs.email_ini ? {} : !inputs.email.match(EMAIL_REGEX) ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                    />
                </div>
                <button onClick={handleEdit} className={(inputs.firstname.trim() === '' || inputs.lastname.trim() === '' || !inputs.email.match(EMAIL_REGEX)) ? "button-save disabled" : "button-save"}>save</button>

                <span
                    ref={notifier_ref}
                    style={(lastEditAccountMsg.type && lastEditAccountMsg.msg) ? {} : { 'display': 'none' }}
                    className={(lastEditAccountMsg.type && lastEditAccountMsg.msg) ? `notifier ${lastEditAccountMsg.type}` : "notifier"}>
                    {lastEditAccountMsg.msg}
                </span>
            </div>
        </>
    );
};
export default User;