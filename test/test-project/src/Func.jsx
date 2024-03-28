import {useState, useEffect} from 'react';

function Func(props) {

    const [state, setState] = useState({
        count: 1
    });

    const [items, setItems] = useState({});

    const timer = setTimeout(() => setState({...state, count: state.count + 1}), 1000);


    /* useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setItems(json));
        return () => { setItems({}); }
    }, []); */

    /* useEffect(() => {
        console.log(items);
    }, [items]) */

    const reset = () => {
        setState({...state, count: 0});
    }

    return (
        <>
            <h1>{props.text}</h1>
            <p>Timer: {state.count}</p>
            <button onClick={reset}>reset</button>
        </>
    )

}
export default Func