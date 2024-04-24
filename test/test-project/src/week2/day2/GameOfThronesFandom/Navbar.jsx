import {NavLink} from "react-router-dom";
import store from "./store/index.js";

function Navbar() {

    return (
        <>
            <nav>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/list'}>Dragons List ({store.getState().dragonsReducer.dragons.length})</NavLink>
            </nav>
        </>
    )

}

export default Navbar;