import {NavLink} from "react-router-dom";

function Navbar() {

    return (
        <>
            <nav>
                <NavLink to={'/'} className="home-link">Home</NavLink>
            </nav>
        </>
    )

}

export default Navbar;