import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom"
import Post from "./Post";
import AddComment from "./AddComment";
import { getComments, resetComments } from "../store/slice/postsSlice";

import '../assets/post.css';
import { useEffect, useRef } from "react";
import PostComment from "./PostComment";
import ToForm from "./ToForm";

function PostDetail() {

    const id = useParams().postId;
    const posts = useSelector(state => state.posts.posts);
    const post = posts.find(p => p.id == id);

    if (!post)
        return <Navigate to='/' />


    const comments = useSelector(state => state.posts.comments);
    const loading = useSelector(state => state.posts.loading);
    const error = useSelector(state => state.posts.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetComments());
        dispatch(getComments(post.id));
    }, [])

    const add_comment_ref = useRef(null);

    return (
        <>
            <div id="details-page">

                <h2>Post Detail</h2>

                <div id="post-details">

                    <Post post={post} />

                    {
                        !comments.comments.length ?
                            (
                                <div className="loader-wrapper">
                                    <span style={loading ? {} : { display: 'none' }} className="loader"></span>
                                </div>
                            )
                            :
                            (
                                <>
                                    <div id="post-comments">

                                        <h3>Commentaires</h3>

                                        <ToForm name={'comment'} ref_={add_comment_ref} />

                                        {
                                            comments.comments.map((comment, idx) => <PostComment key={idx} comment={comment} />)
                                        }

                                    </div>

                                    <AddComment ref={add_comment_ref} />
                                </>
                            )
                    }

                </div>
            </div>
        </>
    )
}

export default PostDetail
