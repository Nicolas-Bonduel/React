
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/slice/postsSlice";
import Post from "../components/Post";

import '../assets/post.css';

function Home() {

  const posts = useSelector(state => state.posts.posts);
  const loading = useSelector(state => state.posts.loading);
  const error = useSelector(state => state.posts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [])

  return (
    <>

      <div id="home">
        <h1>Homepage</h1>


        {
          posts.length > 0 &&
          <>
            <div id="posts-list">

              <h2>Posts List</h2>

              {
                posts.map((post, idx) => <Post key={idx} post={post}/> )
              }
            </div>
          </>
        }



      </div>

    </>
  )
}

export default Home
