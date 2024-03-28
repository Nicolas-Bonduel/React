import { createContext, useReducer } from "react";

export const calcContext = createContext(null);

const CalcContextProvider = ({children}) => {

    const context = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'append_num':
                    return {...state, current: '' + state.current + action.payload}
                case 'append_operator':
                    return {...state, current: '' + state.current +  ' ' + action.payload + ' '}
                case 'calc':
                    return {...state, current: '', lastCalc: eval(state.current)}
                case 'reset':
                    return {current: '', lastCalc: ''}
                default:
                    return state;
            }
        },
        {
            current: '',
            lastCalc: '',
        }
    );

    return (
        <calcContext.Provider value={context}>
            {children}
        </calcContext.Provider>
    )

}

export default CalcContextProvider;