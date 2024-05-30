import { useContext, useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";

import '../assets/register.scss';
import { AuthContext } from "../context/AuthProvider";

const Register = () => {

    const { user, register, loading, errorMsg, setErrorMsg } = useContext(AuthContext);
    if (user)
        return <Navigate to='/' />

    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const form_initial_state = {
        username: '',
        username_input: false,
        password: '',
        password_input: false,
        firstname: '',
        firstname_input: false,
        lastname: '',
        lastname_input: false,
        email: '',
        email_input: false,
    }
    const [formData, setFormData] = useState(form_initial_state);
    const [formValid, setFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
            [name + '_input']: true,
        });

    }

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formValid)
            return;

        await register({
            username: formData.username,
            password: formData.password,
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
        });

        setFormData({
            ...formData,
            password: '',
            password_input: false,
        });
    };

    useEffect(() => {
        setFormValid( ! (formData.username.trim() === '' || formData.password.trim() === '' || formData.firstname.trim() === '' || formData.lastname.trim() === '' || !formData.email.match(EMAIL_REGEX)) );
    }, [formData])

    useEffect(() => {
        setErrorMsg('');
    }, []);


    return (
        <>
            <form id="register" onSubmit={handleSubmit}>
                <h2 className="header">Register</h2>


                <h3 className="subheader">Login Information</h3>

                <input
                    id="input-username" name="username"
                    type="text"
                    placeholder="Your username"
                    value={formData.username}
                    onChange={handleChange}
                    style={!formData.username_input ? {} : formData.username.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                />
                {
                    (formData.username_input && formData.username.trim() === '') && <p className="error">no you don't</p>
                }

                <input
                    id="input-password" name="password"
                    type="password"
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleChange}
                    style={!formData.password_input ? {} : formData.password.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                />
                {
                    (formData.password_input && formData.password.trim() === '') && <p className="error">no you don't</p>
                }


                <h3 className="subheader">Personal Information</h3>

                <input
                    id="input-firstname" name="firstname"
                    type="text"
                    placeholder="Your first name"
                    value={formData.firstname}
                    onChange={handleChange}
                    style={!formData.firstname_input ? {} : formData.firstname.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                />
                {
                    (formData.firstname_input && formData.firstname.trim() === '') && <p className="error">no you don't</p>
                }

                <input
                    id="input-lastname" name="lastname"
                    type="text"
                    placeholder="Your last name"
                    value={formData.lastname}
                    onChange={handleChange}
                    style={!formData.lastname_input ? {} : formData.lastname.trim() === '' ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                />
                {
                    (formData.lastname_input && formData.lastname.trim() === '') && <p className="error">no you don't</p>
                }

                <input
                    id="input-email" name="email"
                    type="text"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    style={!formData.email_input ? {} : !formData.email.match(EMAIL_REGEX) ? { borderColor: 'red', outline: 'none' } : { borderColor: 'green', outline: 'none' }}
                />
                {
                    (formData.email_input && !formData.email.match(EMAIL_REGEX)) && <p className="error">no you don't</p>
                }


                <button type="submit" className={(loading || !formValid) ? "disabled" : ""}>
                    <div className="loader-wrapper-btn">
                        <span style={loading ? {} : { display: 'none' }} className="loader"></span>
                    </div>
                    Register
                </button>
                {
                    (errorMsg !== '') && <p className="error">{errorMsg}</p>
                }
            </form>
        </>
    );
};
export default Register;