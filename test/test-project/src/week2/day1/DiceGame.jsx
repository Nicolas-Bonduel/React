import {Routes, Route} from "react-router-dom";
import DiceGameHeader from "./DiceGameHeader";
import DiceGameHome from "./DiceGameHome";
import DiceGameDescription from "./DiceGameDescription";
import DiceGameStats from "./DiceGameStats";

import './index.css';

function DiceGame() {

    return (
        <>
            <DiceGameHeader />

            <div>
                <Routes>
                    <Route path={'/'} element={<DiceGameHome />} />
                    <Route path={'/desc'} element={<DiceGameDescription />} />
                    <Route path={'/stats'} element={<DiceGameStats />} />

                    <Route path={'*'} element={<div>Not found!</div>} />
                </Routes>
            </div>
        </>
    )

}

export default DiceGame;