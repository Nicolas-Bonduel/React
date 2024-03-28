import {useState, useEffect} from 'react';
import Counter from './Components/Counter';

function Exo3(props) {

    return (
        <>
            <h2>+1</h2>
            <Counter/>
            <br/><br/>
            <h2>+2</h2>
            <Counter incrementBy={2}/>
        </>
    )

}
export default Exo3