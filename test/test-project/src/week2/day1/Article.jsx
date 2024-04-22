import {useParams} from "react-router-dom";
import { useArticleContext } from "./useArticleContext";


function Article() {

    const {article_id} = useParams();
    const {state: {articles}} = useArticleContext();

    const article = articles.find(art => art.id == article_id);

    return (
        <>
            <div id="article-page">
                <h1>Article Page</h1>

                <p>Id: {article_id}</p>
                <p>Content: {article.content}</p>
            </div>
        </>
    )

}

export default Article;