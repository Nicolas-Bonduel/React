import Input from './Input.jsx';
import Buttons from './Buttons.jsx';
import Output from './Output.jsx';
import { useState, useReducer } from 'react';
import OutputContextProvider from './OutputContext.jsx';

function Exo3_1() {

    const [inputs, setInputs] = useState({val1: '', err1: '', val2: '', err2: ''});

    const onInputChange = (e) => {
        const {name, value} = e.target;
        const newState = {...inputs};
        let regex_valid_number = /^[+-]?\d+(\.\d+)?$/;
        switch (name) {
            case "input1":
                newState.val1 = value;
                newState.err1 = regex_valid_number.test(value) ? '' : 'not a valid number! \\o/';
                break;
            case "input2":
                newState.val2 = value;
                newState.err2 = regex_valid_number.test(value) ? '' : 'not a valid number! \\o/';
                break;
        }
        setInputs(newState);
    }

    /*const [output, outputDispatch] = useReducer(
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
            *//*
        }
    );*/

    /*const onReset = () => {
        outputDispatch({type: 'reset'});
    }*/

    return (
        <>
            <OutputContextProvider>
                <Input {...inputs} onInputChange={onInputChange}/>
                <Buttons disable={inputs.val1 == '' || inputs.val2 == '' || inputs.err1 != '' || inputs.err2 != '' || output.data.length >= 10} buttonDispatch={outputDispatch}/>
                <Output /*{...output} onReset={onReset}*//>
            </OutputContextProvider>
        </>
    )

}

export default Exo3_1;