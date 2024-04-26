
function PostComment({ comment }) {

    return (
        <>
            <div className="post-comment">

                <div className="title">
                    <p>{comment.title}</p>
                </div>

                <div className="body">
                    <p>{comment.body}</p>
                </div>

                <div className="author">
                    <p>{comment.author}</p>
                </div>

            </div>
        </>
    )
}

export default PostComment
