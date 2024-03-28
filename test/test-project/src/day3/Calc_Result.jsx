import { useContext } from "react";
import { calcContext } from "./CalcContext";

function Calc_Result() {

    const [state, dispatch] = useContext(calcContext);

    return (
        <>
            { state.lastCalc && <h2>Result: {state.lastCalc}</h2> }
        </>
    )

}

export default Calc_Result;