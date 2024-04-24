import { Route, Routes } from "react-router-dom";
import DragonsListYeahThatsALameNameIKnow from "./DragonsListYeahThatsALameNameIKnow";
import Header from "./Header";
import Home from "./Home";

import './index.css';


function GameOfThronesFandom() {


    return (
        <>
            <Header />

            <div>
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/list'} element={<DragonsListYeahThatsALameNameIKnow />} />

                    <Route path={'*'} element={<div>Not found!</div>} />
                </Routes>
            </div>
        </>
    )

}

export default GameOfThronesFandom;