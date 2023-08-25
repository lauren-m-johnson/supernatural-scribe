import './Comments.css';

export default function Comments({ comments, user, onDeleteComment }) {
  return (
    <div className='comments-container'>
      <h1>Comments</h1>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <div className='comment-flex'>
              <div>
                <p>{(user && user._id === comment.createdBy._id) ? comment.createdBy.name : 'Stranger'} said:</p>
                <p>{comment.text}</p>
              </div>
              <div>
                {user && user._id === comment.createdBy._id && (
                  <button onClick={() => onDeleteComment(comment._id)}>X</button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


