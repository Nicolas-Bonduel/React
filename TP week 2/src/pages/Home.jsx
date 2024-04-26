
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/slice/postsSlice";
import Post from "../components/Post";

import '../assets/post.css';
import ToForm from "../components/ToForm";
import AddPost from "../components/AddPost";

function Home() {

  const posts = useSelector(state => state.posts.posts);
  const loading = useSelector(state => state.posts.loading);
  const error = useSelector(state => state.posts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const add_post_ref = useRef(null);

  return (
    <>

      <div id="home">
        <h1>Homepage</h1>
        {
          !posts.length ?
            <div className="loader-wrapper">
              <span style={loading ? {} : { display: 'none' }} className="loader"></span>
            </div>
            :
            <>
              <div id="posts-list">

                <h2>Posts List</h2>

                <ToForm name={'post'} ref_={add_post_ref} />

                {
                  posts.map((post, idx) => <Post key={idx} post={post} />)
                }

                <AddPost ref={add_post_ref} />

              </div>
            </>
        }



      </div>

    </>
  )
}

export default Home
