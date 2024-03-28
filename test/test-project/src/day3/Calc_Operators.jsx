import { useContext } from "react";
import { calcContext } from "./CalcContext";

function Calc_Operators() {

    const [state, dispatch] = useContext(calcContext);

    return (
        <>
            <div>
                <button onClick={() => dispatch({type:'append_operator', payload: '+'})}>+</button>
                <button onClick={() => dispatch({type:'append_operator', payload: '-'})}>-</button>
                <button onClick={() => dispatch({type:'append_operator', payload: '*'})}>*</button>
                <br/>
                <button style={{'marginTop': '5px'}} onClick={() => dispatch({type:'reset'})}>reset</button>
                <button style={{'marginLeft': '10px'}} onClick={() => dispatch({type:'calc'})}>=</button>
            </div>
        </>
    )

}

export default Calc_Operators;