import {NavLink} from "react-router-dom";

function Navbar() {

    return (
        <>
            <nav>
                <NavLink to={'/'} className="home-link">Home</NavLink>
                <NavLink to={'/test'}>Test</NavLink>
            </nav>
        </>
    )

}

export default Navbar;