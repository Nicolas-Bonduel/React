import Navbar from "./Navbar";
import Minicart from "./Minicart";
import { NavLink } from "react-router-dom";

import '../assets/header.scss';
import Theme from "./Theme";

function Header() {


    return (
        <>
            <header>
                <NavLink to={'/'} className="logo-link">
                    <img className="logo" alt="header logo" src="./images/logo_black.png" />
                </NavLink>

                <Navbar />

                <Theme />

                <Minicart />
            </header>
        </>
    )

}

export default Header;