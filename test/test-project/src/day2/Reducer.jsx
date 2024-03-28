import {useEffect, useReducer} from 'react';

function Reducer() {

    const MAX_TIME = 20;
    const FLASH_MCQUEEN = 100;

    /* --- State --- */
    const [timer, timerDispatch] = useReducer(
        // reducer
        (timer, action) => {
            let id, time_, cycle_;
            switch (action.type) {
                case 'start':
                    /* return {...timer, timeoutId: action.payload} */

                    /* id = setTimeout(() => action.payload({type: 'increment'}), FLASH_MCQUEEN); */

                    id = setTimeout(() => action.payload(), FLASH_MCQUEEN);

                    return {...timer, timeoutId: id}

                case 'stop':
                    clearTimeout(timer.timeoutId);
                    return {...timer, timeoutId: 0}

                case 'increment':
                    time_ = timer.time + 1;
                    cycle_ = timer.cycle;
                    if (time_ >= MAX_TIME) {
                        time_ = 0;
                        cycle_ += 1;
                    }
                    return {...timer, time: time_, cycle: cycle_};

                case 'decrement':
                    time_ = timer.time - 1;
                    cycle_ = timer.cycle;
                    if (time_ < 0) {
                        time_ = cycle_ > 1 ? MAX_TIME + time_ : 0;
                        cycle_ = cycle_ > 1 ? cycle_ - 1 : cycle_;
                    }
                    return {...timer, time: time_, cycle: cycle_};

                case 'reset':
                    clearTimeout(timer.timeoutId);
                    return {...timer, time: 0, cycle: 1, timeoutId: 0};

                default:
                    return state;
            }
        },
        // initial state
        {
            time: 0,
            cycle: 1,
            timeoutId: 0
        }
    );


    /* --- State Dispatch Funcs --- */
    
    const start = () => {
        /* const id = setTimeout(increment, FLASH_MCQUEEN);
        timerDispatch({type: 'start', payload: id}); */

        /* timerDispatch({type: 'start', payload: timerDispatch}); */
        
        timerDispatch({type: 'start', payload: increment});
    }

    const stop = () => timerDispatch({type: 'stop'});

    const increment = () => timerDispatch({type: 'increment'});

    const decrement = () => timerDispatch({type: 'decrement'});

    const reset = () => timerDispatch({type: 'reset'});


    /* --- On Timer Update --- */
    useEffect(() => {
        // prevents timer from starting on its own (since this will be called on init)
        if (!timer.timeoutId)
            return;

        // resume timer
        start();

    }, [timer.time]);


    /* --- Render --- */
    return (
        <div>
            <button disabled={timer.timeoutId} onClick={start}>start</button>
            <p>Timer: {timer.time} (binary: {timer.time.toString(2)}) (cycle {timer.cycle})</p>
            <button disabled={!timer.timeoutId} onClick={stop}>stop</button>
            <br/><br/>
            <button onClick={increment}>increment</button> <span style={{'marginLeft': '10px'}}></span>
            <button disabled={timer.time === 0 && timer.cycle === 1} onClick={decrement}>decrement</button> <span style={{'marginLeft': '10px'}}></span>
            <button onClick={reset}>reset</button>
        </div>
    )

}

export default Reducer
