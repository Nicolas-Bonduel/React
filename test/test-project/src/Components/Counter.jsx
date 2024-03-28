import {useState, useEffect} from 'react';
import propTypes from "prop-types";

function Counter({incrementBy = 1, dummy}) {

    const [enabled, setEnabled] = useState(true);
    const [timer, setTimer] = useState(0);
    const [cycleCount, setCycleCount] = useState(1);
    const [timeoutId, setTimeoutId] = useState(0);

    useEffect(() => {
        if (timeoutId == 0)
            return;

        if (timer >= 20) {
            //setEnabled(false);
            //return;
            setCycleCount(cycleCount + 1);
            setTimer(0);
        }

        const id = setTimeout(() => setTimer(timer + props.incrementBy), 1000);
        setTimeoutId(id);
    }, [timer]);

    const start = () => {
        const id = setTimeout(() => setTimer(timer + props.incrementBy), 1000);
        setTimeoutId(id);
    }

    const stop = () => {
        clearTimeout(timeoutId);
        setTimeoutId(0);
    }

    return (
        <div>
            <button disabled={!enabled || timeoutId} onClick={start}>start</button>
            {/* <p>Timer: {timer}</p> */}
            <p>Timer: {timer} (binary: {timer.toString(2)}) (cycle {cycleCount})</p>
            <button disabled={!enabled || timeoutId == 0} onClick={stop}>stop</button>
            { enabled ? <span></span> : <p style={{color: 'blue'}}>timer ended, refresh for more</p> }
        </div>
    )

}

Counter.propTypes = {
    incrementBy: propTypes.number,
    dummy: propTypes.oneOfType([propTypes.number, propTypes.string]),
}

export default Counter