import {Link} from "react-router-dom";
import { useArticleContext } from "./useArticleContext";
import { useState } from "react";


function List() {

    const {state: {articles}, dispatch} = useArticleContext();


    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!content)
            return;

        dispatch({type: "add", payload: {content: content}});

        setContent('');
        setInput_(false);
    };


    let [input_, setInput_] = useState(false);

    return (
        <>
            <div id="list-page">
                <h1>List Page</h1>

                <h2>Add an article :</h2>
                <form className="add-article" onSubmit={handleSubmit}>

                    <label htmlFor="input-article-content">Content :</label>
                    <input 
                        id="input-article-content" name="article-content"
                        type="text"
                        value={content}
                        onChange={(e) => { setInput_(true); setContent(e.target.value) }}
                        placeholder="content" />
                    {
                        (!content && input_) && <p className="error">content plz</p>
                    }

                    <button type="submit" className={ content ? "" : "disabled" }>Add</button>
                </form>

                <br />

                <h2>Listing :</h2>
                <div className="listing">

                    <ul>
                        {
                            articles.map( (article, idx) => <li key={idx}> <Link to={'/list/' + article.id} {...article} >Article {idx+1}</Link> </li> )
                        }
                    </ul>
                </div>
            </div>
        </>
    )

}

export default List;