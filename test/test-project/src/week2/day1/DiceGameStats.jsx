import { useDiceGameContext } from "./useDiceGameContext";
import { Link } from "react-router-dom";

function DiceGameStats() {

    const {state: {rolls}, dispatch} = useDiceGameContext();

    const expectation = 1 / (6*6*6) * 100;
    const current = rolls.filter(roll => roll[0] == 6 && roll[1] == 6 && roll[2] == 6).length / rolls.length * 100;

    return (
        <>
            <div id="stats">
                <h1>Statistics</h1>

                {
                    rolls.length ? 
                    (
                        <>
                            <p>Expectation : {expectation.toFixed(2)}%</p>
                            <p style={{color: current > expectation ? 'green' : 'red'}}>Yours : {current.toFixed(2)}%</p>
                            <p style={{color: current > expectation ? 'green' : 'red'}}>Feeling {current > expectation ? '' : 'un'}lucky today?</p>
                            <ul>
                            {
                                rolls.map((roll, idx) => <li key={idx} style={roll[0] == 6 && roll[1] == 6 && roll[2] == 6 ? {backgroundColor: 'green'} : {}}>{roll.join(' - ')}</li>)
                            }
                            </ul>
                        </>
                    )
                    :
                    (
                        <Link to={'/'} >Roll a dice first</Link>
                    )
                }
            </div>
        </>
    )

}

export default DiceGameStats;