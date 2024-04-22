import {Link, NavLink} from "react-router-dom";

function DiceGameNavbar() {

    return (
        <>
            <nav>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/desc'}>Description</NavLink>
                <NavLink to={'/stats'}>Statistics</NavLink>
            </nav>
        </>
    )

}

export default DiceGameNavbar;