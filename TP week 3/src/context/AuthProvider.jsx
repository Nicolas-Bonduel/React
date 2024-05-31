import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

/**
 * Authentication Context Provider
 */
const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);                                           // user object
  /**
   * user : {
   *  - username : <string>
   *  - password : <string>
   *  - firstname : <string>
   *  - lastname : <string>
   *  - email : <string>
   * }
   *  note: there might be other properties if VITE_LOGIN_FROM_SERVER is set to true,
   *          since the returned object has some more properties that we never bothered to clean up
   */
  const [loading, setLoading] = useState(false);                                    // currently logging in or registering notifier
  const [errorMsg, setErrorMsg] = useState('');                                     // logging or registering error
  const [editAccountMsg, setEditAccountMessage] = useState({ type: '', msg: '' });  // edit account esponse message
  const navigate = useNavigate();                                                   // allows redirection


  /**
   * Registers a new user
   */
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

    await new Promise(res => setTimeout(res, 1000)); // enjoy the loader!

    /* registering from server */
    if (import.meta.env.VITE_LOGIN_FROM_SERVER) {

      let status;
      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: 'include', // required for allowing server to write cookies (for jwt)
      })
        .then(res => { status = res.status; return res; }) // reminder of status (since it's not accessible anymore after json parsing)
        .then(res => res.json())
        .then(res => {
          if (status === 200) { // registering suceeded ==> user was returned (might have some extra unused properties)
            // logging-in new user
            setUser(res.user);
            localStorage.setItem('logged_user', JSON.stringify(res.user)); // store user to restore login on refresh
          }
          else { // registering failed
            if (status === 400) // error 400 means we trigerred it and sent a custom message back
              setErrorMsg(res.message);
            else // any other error code is not trigerred by us so no custom message sent
              setErrorMsg(res.statusText);
          }
        })
        .catch(res => setErrorMsg('An unexpected error was caught!'));

    }

    /* registering in local mode */
    else {

      // get users
      let users = localStorage.getItem('users');
      if (users)
        users = JSON.parse(users);
      else
        users = [];

      // is username already taken?
      let already_exists = false;
      users.forEach(user => {
        if (user.username == username)
          already_exists = true;
      });

      if (already_exists) // can't register since username is already taken
        setErrorMsg('This username is already taken!');
      else { // ok to register
        // appends new user to list of users
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // logging-in
        setUser(user);
        localStorage.setItem('logged_user', JSON.stringify(user)); // store user to restore login on refresh
      }

    }

    setLoading(false);

  }


  /**
   * Logs a user in
   */
  const login = async ({ username, password }) => {
    setLoading(true);
    setErrorMsg('');

    await new Promise(res => setTimeout(res, 1000)); // enjoy the loader!

    /* logging-in from server */
    if (import.meta.env.VITE_LOGIN_FROM_SERVER) {

      let status;
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        credentials: 'include', // required for allowing server to write cookies (for jwt)
      })
        .then(res => { status = res.status; return res; }) // reminder of status (since it's not accessible anymore after json parsing)
        .then(res => res.json())
        .then(res => {
          if (status === 200) { // login suceeded ==> user was returned (might have some extra unused properties)
            // logging-in
            setUser(res.user);
            localStorage.setItem('logged_user', JSON.stringify(res.user)); // store user to restore login on refresh
          }
          else { // login failed
            if (status === 400) // error 400 means we trigerred it and sent a custom message back
              setErrorMsg(res.message);
            else
              setErrorMsg(res.statusText); // any other error code is not trigerred by us so no custom message sent
          }
        })
        .catch(res => setErrorMsg('An unexpected error was caught!'));

    }

    /* logging-in in local mode */
    else {

      // get users
      let users = localStorage.getItem('users');
      if (users) {
        users = JSON.parse(users);

        users.forEach(user => {
          if (user.username == username && user.password == password) {
            // logging-in found user
            setUser(user);
            localStorage.setItem('logged_user', JSON.stringify(user)); // store user to restore login on refresh
          }
        });
      }

      if (!user) // user was not found
        setErrorMsg('Wrong username or password!');

    }

    setLoading(false);

  }


  /**
   * Restores login from local storage data
   *   why local storage? because I don't know how to use session ^^
   * This is called on refresh to avoid the user from loosing his login state
   */
  const restore_login = async (user) => {

    /* restoring login from server */
    if (import.meta.env.VITE_LOGIN_FROM_SERVER) {
      let status;
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
        credentials: 'include', // required for allowing server to write cookies (for jwt)
      })
        .then(res => { status = res.status; return res; }) // reminder of status (since it's not accessible anymore after json parsing)
        .then(res => res.json())
        .then(res => {
          if (status === 200) // login suceeded ==> user was returned (might have some extra unused properties)
            setUser(res.user)
          else { // login failed (no need for a specific error message)
            // logging-out (not very useful since user will be null on refresh, but whatever)
            setUser(null);
            localStorage.removeItem('logged_user'); // remove stored user
          }
        })
        .catch(res => {
          setUser(null);
          localStorage.removeItem('logged_user');
        });

    }

    /* restoring login in local mode */
    else {

      // get users
      let users = localStorage.getItem('users');
      if (!users)
        return;

      users = JSON.parse(users);
      users.forEach(user_ => {
        if (user_.username == user.username) {
          // logging-in found user
          setUser(user);
        }
      });

    }
  }


  /**
   * Logs a user out
   */
  const logout = async () => {

    /* logging-out from server */
    if (import.meta.env.VITE_LOGIN_FROM_SERVER) {
      const res = await fetch('http://localhost:8000/logout', {
        method: 'GET',
        credentials: 'include', // required for allowing server to write cookies (for jwt)
      }); // no sanity check at all. Trust me, everything will be fine ^^
      setUser(null);
      localStorage.removeItem('logged_user');
      navigate('/');
    }

    /* logging-out in local mode */
    else {
      setUser(null);
      localStorage.removeItem('logged_user');
      navigate('/');
    }

  }


  /**
   * Edits a user account details
   */
  const editAccount = async ({ firstname, lastname, email }) => {

    setEditAccountMessage({ type: '', msg: '' });

    // sanity checks
    if (!user) {
      setEditAccountMessage({ type: 'error', msg: 'wth is going on?? How did you get there!?' });
      setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds
      return;
    }
    if (user.firstname == firstname && user.lastname == lastname && user.email == email) {
      setEditAccountMessage({ type: 'ignore', msg: 'Nothing changed yo, are you serious?' });
      setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds
      return;
    }

    /* editing from server */
    if (import.meta.env.VITE_LOGIN_FROM_SERVER) {

      let status;
      const res = await fetch('http://localhost:8000/editaccount', { // PROTECTED ROUTE (requires valid jwt token)
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
          firstname: firstname,
          lastname: lastname,
          email: email,
        }),
        credentials: 'include', // required for allowing server to read cookies (for jwt)
      })
        .then(res => { status = res.status; return res; }) // reminder of status (since it's not accessible anymore after json parsing)
        .then(res => res.json())
        .then(res => {
          if (status === 200) { // edit succeeded ==> user was returned
            setUser(res.user);
            setEditAccountMessage({ type: 'success', msg: 'Your account was successfully updated!' });
            setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds
          }
          else { // edit failed
            if (status === 400) // error 400 means we trigerred it and sent a custom message back
              setEditAccountMessage({ type: 'error', msg: res.message });
            else  // any other error code is not trigerred by us so no custom message sent
              setEditAccountMessage({ type: 'error', msg: res.statusText });
          
            setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds
          }
        })
        .catch(res => {
          setEditAccountMessage({ type: 'error', msg: 'An unexpected error occured!' });
          setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds
        });

    }

    /* editing in local mode */
    else {

      // get users
      let users = localStorage.getItem('users');
      if (!users) {
        setEditAccountMessage({ type: 'error', msg: 'wth is going on?? How did you get there!?' });
        setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds
        return;
      }
      users = JSON.parse(users);

      // edit user account details in users list
      users.forEach((user_) => {
        if (user_.username == user.username) {
          user_.firstname = firstname;
          user_.lastname = lastname;
          user_.email = email;
        }
      });
      localStorage.setItem('users', JSON.stringify(users)); // updates users list

      // edit user account details
      setUser({
        ...user,
        firstname: firstname,
        lastname: lastname,
        email: email,
      });

      setEditAccountMessage({ type: 'success', msg: 'Your account was successfully updated!' });
      setTimeout(() => setEditAccountMessage({ type: '', msg: '' }), 3000); // message disappears after 3 seconds

    }
    
  }

  // ~~ that's a lot of comments.. ~~


  return (
    <AuthContext.Provider value={{ loading, errorMsg, setErrorMsg, user, register, login, restore_login, logout, editAccount, editAccountMsg }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;