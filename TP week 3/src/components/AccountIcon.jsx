
import { NavLink } from 'react-router-dom';
import account_icon from '../assets/images/account-icon.png'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

function AccountIcon() {

    const auth = useContext(AuthContext);


    return (
        <>
            {
                auth.user ?
                    <>
                        <NavLink to="/user" className="account">

                            <img alt="my account" src={account_icon} />

                            <span>{auth.user.firstname} {auth.user.lastname}</span>

                        </NavLink>
                    </>
                    :
                    <>
                        <NavLink to="/login" className="account-login">Login</NavLink>
                    </>
            }



        </>
    )

}

export default AccountIcon;