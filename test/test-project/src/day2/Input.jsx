import {useState, useReducer} from 'react';

function Input() {


    const [state, stateDispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case "input":
                    return {...state, inputs: action.payload};
                case "output":
                    let values_ = state.output.values.map((arr) => { return arr.slice() }); // shallow copy
                    values_.push(action.payload.val);
                    return {...state, output: {values: values_}};
                default:
                    return list;
            }
        },
        {
            inputs: {
                val1: '',
                val2: ''
            },
            output: {
                values: []
            }
        }
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        const newState = {...state.inputs}
        switch (name) {
            case "input1":
                newState.val1 = value;
                break;
            case "input2":
                newState.val2 = value;
                break;
        }
        stateDispatch({type: "input", payload: newState});
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        stateDispatch({type: "output", payload: {
            val: [state.inputs.val1, state.inputs.val2]
        }});
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="input1" value={state.val1} onChange={handleChange}/>
                <input type="text" name="input2" value={state.val2} onChange={handleChange}/>
                <input type="submit" value="send"/>
            </form>
            <div>
                <h2>Result:</h2>
                { state.output.values.map((val, idx) => <p key={idx}>input {idx+1}: {JSON.stringify(val)}</p>) }
            </div>
        </>
    )

}

export default Input
