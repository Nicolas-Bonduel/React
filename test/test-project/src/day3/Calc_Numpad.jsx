import { useContext } from "react";
import { calcContext } from "./CalcContext";

function Calc_Numpad() {

    const [state, dispatch] = useContext(calcContext);

    return (
        <>
            <div>
                <button onClick={() => dispatch({type: 'append_num', payload: 7})}>7</button>
                <button onClick={() => dispatch({type: 'append_num', payload: 8})}>8</button>
                <button onClick={() => dispatch({type: 'append_num', payload: 9})}>9</button>
                <br/>
                <button onClick={() => dispatch({type: 'append_num', payload: 4})}>4</button>
                <button onClick={() => dispatch({type: 'append_num', payload: 5})}>5</button>
                <button onClick={() => dispatch({type: 'append_num', payload: 6})}>6</button>
                <br/>
                <button onClick={() => dispatch({type: 'append_num', payload: 1})}>1</button>
                <button onClick={() => dispatch({type: 'append_num', payload: 2})}>2</button>
                <button onClick={() => dispatch({type: 'append_num', payload: 3})}>3</button>
                <br/>
                <button onClick={() => dispatch({type: 'append_num', payload: 0})}>0</button>
            </div>
        </>
    )

}

export default Calc_Numpad;