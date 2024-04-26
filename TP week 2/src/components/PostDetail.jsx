import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import Post from "./Post";
import { getComments } from "../store/slice/postsSlice";

import '../assets/post.css';
import { useEffect } from "react";
import PostComment from "./PostComment";

function PostDetail() {

    const id = useParams().postId;
    const posts = useSelector(state => state.posts.posts);
    const post = posts.find(p => p.id == id);


    const comments = useSelector(state => state.posts.comments);
    const loading = useSelector(state => state.posts.loading);
    const error = useSelector(state => state.posts.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComments(post.id));
    }, [])

    return (
        <>
            <div id="details-page">

                <h2>Post Detail</h2>

                <div id="post-details">

                    <Post post={post} />

                    {
                        comments.comments.length > 0 && (
                            <div id="post-comments">

                                <h3>Commentaires</h3>

                                {
                                    comments.comments.map((comment, idx) => <PostComment key={idx} comment={comment} />)
                                }

                            </div>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default PostDetail
