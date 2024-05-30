import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [editAccountMsg, setEditAccountMessage] = useState({ type: '', msg: '' });

  const navigate = useNavigate();


  const register = async ({ username, password, firstname, lastname, email }) => {
    setLoading(true);
    setErrorMsg('');

    let user = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email
    };

    await new Promise(res => setTimeout(res, 1000));

    let register_success = false;

    let users = localStorage.getItem('users');
    if (users)
      users = JSON.parse(users);
    else
      users = [];

    let already_exists = false;
    users.forEach(user => {
      if (user.username == username)
        already_exists = true;
    });

    if (already_exists)
      register_success = false;
    else {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      setUser(user);
      localStorage.setItem('logged_user', username);
      register_success = true;
    }

    setLoading(false);

    if (!register_success)
      setErrorMsg('This username is already taken!');
    else
      navigate('/');
  }

  const login = async ({ username, password }) => {
    setLoading(true);
    setErrorMsg('');

    await new Promise(res => setTimeout(res, 1000));

    let login_success = false;

    let users = localStorage.getItem('users');
    if (users) {
      users = JSON.parse(users);
      users.forEach(user => {
        // todo hash password (+ break?)
        if (user.username == username && user.password == password) {
          setUser(user);
          localStorage.setItem('logged_user', username);
        }
      });
    }

    setLoading(false);

    if (!login_success)
      setErrorMsg('Wrong username or password!');
    else
      navigate('/');
  }

  const restore_login = (username) => {
    let users = localStorage.getItem('users');
    if (!users)
      return;

    users = JSON.parse(users);
    users.forEach(user => {
      if (user.username == username) {
        setUser(user);
        localStorage.setItem('logged_user', username);
      }
    });
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('logged_user');
    navigate('/');
  }

  const editAccount = ({ firstname, lastname, email }) => {
    setEditAccountMessage({ type: '', msg: '' });

    if (!user) {
      setEditAccountMessage({ type: 'error', msg: 'wth is going on?? How did you get there!?' });
      return;
    }

    if (user.firstname == firstname && user.lastname == lastname && user.email == email) {
      setEditAccountMessage({ type: 'ignore', msg: 'Nothing changed yo, are you serious?' });
      setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000);
      return;
    }

    setUser({
      ...user,
      firstname: firstname,
      lastname: lastname,
      email: email,
    });

    setEditAccountMessage({ type: 'success', msg: 'Your account was successfully updated!' });
    setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000);
  }


  return (
    <AuthContext.Provider value={{ loading, errorMsg, setErrorMsg, user, register, login, restore_login, logout, editAccount, editAccountMsg }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;