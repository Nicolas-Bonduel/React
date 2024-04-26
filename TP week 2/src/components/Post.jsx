import { NavLink, useLocation } from "react-router-dom";

function Post({ post }) {

    const location = useLocation();

    return (
        <>
            <div className="post">

                <div className="wrapper" >

                    <div className="title">
                        <p>{post.title}</p>
                    </div>

                    <div className="content">

                        <div className="author">
                            <p>Author :</p>
                            <p>{post.user_id}</p>
                        </div>

                        <div className="description">
                            <p>{post.description}</p>
                        </div>

                    </div>
                </div>

                {
                    location.pathname === '/' && (
                        <div className="view-details">
                            <NavLink to={'/detail/' + post.id}>
                                <img alt="view post details" src="https://www.freeiconspng.com/uploads/view-details-icon-buy-this-icon-for--0-98-2.png" />
                            </NavLink>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Post
