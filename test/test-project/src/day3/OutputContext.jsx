import {createContext, useContext, useReducer} from 'react';

const outputContext = createContext();

export const useOutputContext = () => {
    return useContext(outputContext);
}

const OutputContextProvider = ({children}) => {

    const context = useReducer(
        (state, action) => {
            let {val1, val2} = inputs;
            let data_ = [...state.data];
            switch (action.type) {
                case "add":
                    data_.push({
                        input1: val1,
                        input2: val2,
                        operator: '+',
                        result: parseInt(val1) + parseInt(val2)
                    });
                    return {...state, data: data_};
                case "multiply":
                    data_.push({
                        input1: val1,
                        input2: val2,
                        operator: '*',
                        result: parseInt(val1) * parseInt(val2)
                    });
                    return {...state, data: data_};
                case "reset":
                    return { data: [] };
                default:
                    return state;
            }
        },
        {
            data: []
            /*  list of:
                {
                    result: string,
                    input1: string,
                    input2: string,
                    operator: string
                }
            */
        }
    );

    return (
        <outputContext.Provider value={context}>
            {children}
        </outputContext.Provider>
    )
}

export default OutputContextProvider;