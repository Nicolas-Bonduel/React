import {NavLink} from "react-router-dom";

function Navbar() {

    return (
        <>
            <nav>
                <NavLink to={'/'} className="home-link">Home</NavLink>
                <NavLink to={'/cart'}>Test</NavLink>
                <NavLink to={'/user'}>user</NavLink>
            </nav>
        </>
    )

}

export default Navbar;