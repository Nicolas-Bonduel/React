import Navbar from "./Navbar";
import Minicart from "./Minicart";
import { NavLink } from "react-router-dom";

import '../assets/header.scss';
import Theme from "./Theme";

import header_logo from '../assets/images/logo_black.png';
import AccountIcon from "./AccountIcon";

function Header() {


    return (
        <>
            <header>
                <NavLink to={'/'} className="logo-link">
                    <img className="logo" alt="header logo" src={header_logo} />
                </NavLink>

                <Navbar />

                <Theme />

                <AccountIcon />

                <Minicart />
            </header>
        </>
    )

}

export default Header;