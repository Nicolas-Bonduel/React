import { useEffect } from "react";
import { getItems } from "../store/slice/itemsSlice";
import { useDispatch, useSelector } from "react-redux";

import '../assets/home.scss';
import { useState } from "react";
import ItemsByCategory from "../components/ItemsByCategory";

function Home() {

    const items = useSelector(state => state.items.items);
    const loading = useSelector(state => state.items.loading);
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        dispatch(getItems());
    }, []);

    useEffect(() => {
        let categories_ = [];
        items.forEach((item) => {
            if (!categories_.find(c => c === item.category))
                categories_.push(item.category);
        });
        setCategories(categories_);
    }, [items]);

    return (
        <>

            <div id="home">
                <div className="disclaimer">
                    <span>I see you x_O</span>
                </div>
                {
                    !items.length ?

                        /* loading */
                        <div className="loader-wrapper">
                            <span style={loading ? {} : { display: 'none' }} className="loader"></span>
                        </div>

                        :

                        /* loaded */
                        <>
                            <div id="content">

                                {
                                    categories.map((category, idx) => <div key={idx}>
                                        <h2 className="category-header">{category}</h2>
                                        <ItemsByCategory category={category} />
                                    </div>)
                                }

                            </div>
                        </>
                }



            </div>

        </>
    )

}

export default Home;