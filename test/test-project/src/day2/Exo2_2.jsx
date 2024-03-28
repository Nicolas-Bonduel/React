import {useReducer} from 'react';
import Result from './Result.jsx';

function Exo2_2() {


    const [state, stateDispatch] = useReducer(
        (state, action) => {
            let list_;
            switch (action.type) {
                case "input":
                    return {...state, inputs: action.payload};
                case "output":
                    list_ = state.output.list.map((el) => { return el }); // shallow copy
                    list_.push({values: action.payload.val, checked: false});
                    return {...state, output: { list: list_}};
                case "output_delete":
                    list_ = state.output.list.map((el) => { return el }); // shallow copy
                    list_.splice(action.payload, 1);
                    return {...state, output: { list: list_}};
                case "output_reverse":
                    list_ = state.output.list.map((el) => { return el }); // shallow copy
                    list_.reverse();
                    return {...state, output: { list: list_}};
                case "output_toggle":
                    list_ = state.output.list.map((el) => { return el }); // shallow copy
                    list_[action.payload].checked = !list_[action.payload].checked;
                    return {...state, output: { list: list_}};
                default:
                    return state;
            }
        },
        {
            inputs: {
                val1: '',
                val2: ''
            },
            output: {
                list: []
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

    const handleDelete = (idx) => {
        stateDispatch({type: "output_delete", payload: idx});
    }

    const handleReverse = () => {
        stateDispatch({type: "output_reverse"});
    }

    const handleCheck = (idx) => {
        stateDispatch({type: "output_toggle", payload: idx});
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
                <button onClick={handleReverse}>Reverse Order</button>
                { state.output.list.map((el, idx) => <Result key={idx} index={idx} value={el.values} checked={el.checked} checkF={handleCheck} deleteF={handleDelete}/>) }
            </div>
        </>
    )

}

export default Exo2_2