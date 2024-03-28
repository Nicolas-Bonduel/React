import {useState, useEffect} from 'react';

function Exo2(props) {

    const [timer, setTimer] = useState(10);
    const [timeoutId, setTimeoutId] = useState(0);

    const [validationText, setValidationText] = useState("");


    useEffect(() => {
        const id = setTimeout(() => setTimer(timer + 1), 1000);
        setTimeoutId(id);
        setValidationText(timer < 1 ? "Hey, whatcha doing?!" : "");
    }, [timer]);


    const decrement = () => {
        if (timer < 1)
            return;

        clearTimeout(timeoutId);
        setTimeoutId(0);
        setTimer(timer - 1);
    }


    return (
        <>
            <h1>{props.text}</h1>
            <p>Timer: {timer}</p>
            <button disabled={timer < 1} onClick={decrement}>decrement</button>
            <p style={{color: 'red'}}>{validationText}</p>
        </>
    )

}
export default Exo2