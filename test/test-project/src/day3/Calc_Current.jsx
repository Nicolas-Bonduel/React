import { useContext } from "react";
import { calcContext } from "./CalcContext";

function Calc_Current() {

    const [state, dispatch] = useContext(calcContext);

    return (
        <>
            <p>Current: {state.current}</p>
        </>
    )

}

export default Calc_Current;