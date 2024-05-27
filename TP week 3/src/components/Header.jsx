import Navbar from "./Navbar";
import Minicart from "./Minicart";
import { NavLink } from "react-router-dom";

import '../assets/header.scss';

function Header() {


    return (
        <>
            <header>
                <NavLink to={'/'} className="logo-link">
                    <img className="logo" alt="header logo" src="./images/logo_black.png" />
                </NavLink>

                <Navbar />

                <Minicart />
            </header>
        </>
    )

}

export default Header;