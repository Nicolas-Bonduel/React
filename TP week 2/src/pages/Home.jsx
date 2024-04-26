
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const add_post_ref = useRef(null);

  return (
    <>

      <div id="home">
        <div className="disclaimer">
          <span>I see you x_O</span>
        </div>
        {
          !posts.length ?

            /* loading */
            <div className="loader-wrapper">
              <span style={loading ? {} : { display: 'none' }} className="loader"></span>
            </div>

            :

            /* loaded */
            <>
              <div id="posts-list">

                <h2>Posts List</h2>

                <ToForm name={'post'} ref_={add_post_ref} /> {/* click the button to go to form */}
  
                  {
                    posts.map((post, idx) => <Post key={idx} post={post} />)
                  }

                <AddPost ref={add_post_ref} /> {/* add a post */}

              </div>
            </>
        }



      </div>

    </>
  )
}

export default Home
