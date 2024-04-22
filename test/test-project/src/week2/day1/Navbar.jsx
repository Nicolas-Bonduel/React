import {Link, NavLink} from "react-router-dom";

function Navbar() {

    return (
        <>
            <nav>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/list'}>List</NavLink>
            </nav>
        </>
    )

}

export default Navbar;