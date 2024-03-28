import { useOutputContext } from "./OutputContext";

function Output() {

    const [{data}, dispatch] = useOutputContext();

    return (
        <>
            <h2>Result: </h2>
            { data.length >= 10 && <p style={{"color":"blue"}}>max amount of results reached, refresh for more</p> }
            {/* { data.length > 0 && <button onClick={onReset}>Reset</button> } */}
            { data.length > 0 && <button onClick={dispatch({type: 'reset'})}>Reset</button> }
            {
                data.map((set, idx) => (
                    <p key={idx}>Result n°{idx+1}: {set.input1} {set.operator} {set.input2} = {set.result}</p>
                ))
            }
            
        </>
    )

}

export default Output;