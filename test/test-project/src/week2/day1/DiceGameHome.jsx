import { useState } from "react";
import { useDiceGameContext } from "./useDiceGameContext";

function DiceGameHome() {

    const {state: {rolls}, dispatch} = useDiceGameContext();


    const [amount, setAmount] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (amount <= 0 || amount >= 1000)
            return;

        let rolls_ = [];
        for (let i = 0; i < amount; i++)
            rolls_.push([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
        setCurrentRolls(rolls_);

        dispatch({type: "add", payload: {rolls: rolls_}});

        setAmount(1);
    };

    const [current_rolls, setCurrentRolls] = useState([]);

    return (
        <>
            <div id="home">
                <h1>Homepage</h1>

                <h2>Roll :</h2>
                <form className="roll" onSubmit={handleSubmit}>

                    <label htmlFor="input-roll-amount">Amount :</label>
                    <input 
                        id="input-roll-amount" name="roll-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value) }
                    />
                    {
                        (amount <= 0 || amount >= 1000) && <p className="error">no you don't</p>
                    }

                    <button type="submit" className={ amount > 0 ? "" : "disabled" }>Roll</button>
                </form>

                {
                    current_rolls.length ? 
                    (
                        <>
                            <h2>Result :</h2>

                            <ul>
                            {
                                current_rolls.map((roll, idx) => <li key={idx} style={roll[0] == 6 && roll[1] == 6 && roll[2] == 6 ? {backgroundColor: 'green'} : {}}>{roll.join(' - ')}</li>)
                            }
                            </ul>
                        </>
                    )
                    :
                    (
                        <></>
                    )
                }
            </div>
        </>
    )

}

export default DiceGameHome;