import { useContext, useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

import '../assets/login.scss';
import { AuthContext } from "../context/AuthProvider";

const Login = () => {

    const { user, login, loading, errorMsg, setErrorMsg } = useContext(AuthContext);
    if (user)
        return <Navigate to='/' />

    const form_initial_state = {
        username: '',
        username_input: false,
        password: '',
        password_input: false,
    }
    const [formData, setFormData] = useState(form_initial_state);

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

        if (formData.username.trim() === '' || formData.password.trim() === '')
            return;

        await login({
            username: formData.username,
            password: formData.password,
        });

        setFormData({
            ...formData,
            password: '',
            password_input: false,
        });
    };

    useEffect(() => {
        setErrorMsg('');
    }, []);


    return (
        <>
            <form id="login" onSubmit={handleSubmit}>
                <h2 className="header">Login</h2>

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

                <button type="submit" className={loading || (formData.username.trim() === '' || formData.password.trim() === '') ? "disabled" : ""}>
                    <div className="loader-wrapper-btn">
                        <span style={loading ? {} : { display: 'none' }} className="loader"></span>
                    </div>
                    Login
                </button>
                {
                    (errorMsg !== '') && <p className="error">{errorMsg}</p>
                }

                <span className="register-section">
                    Don't have an account ? <NavLink to="/register">Register</NavLink>
                </span>
            </form>
        </>
    );
};
export default Login;