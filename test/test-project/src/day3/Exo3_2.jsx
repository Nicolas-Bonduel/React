import CalcContextProvider from "./CalcContext";
import Calc_Current from './Calc_Current.jsx';
import Calc_Numpad from './Calc_Numpad.jsx';
import Calc_Operators from './Calc_Operators.jsx';
import Calc_Result from './Calc_Result.jsx';


function Exo3_2() {


    return (
        <>
            <CalcContextProvider>
                <Calc_Current />
                <br/>
                <Calc_Numpad />
                <br/>
                <Calc_Operators />
                <br/>
                <Calc_Result />
            </CalcContextProvider>
        </>
    )

}

export default Exo3_2;
