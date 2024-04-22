import {Routes, Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import List from "./List";
import Article from "./Article";

import './index.css';

function RouterTest() {

    return (
        <>
            <Header />

            <div>
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/list'} element={<List />} />
                    <Route path={'/list/:article_id'} element={<Article />} />

                    <Route path={'*'} element={<div>Not found!</div>} />
                </Routes>
            </div>
        </>
    )

}

export default RouterTest;