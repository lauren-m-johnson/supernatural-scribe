import './Comments.css';

export default function Comments({ comments, user, onDeleteComment }) {
  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <p>Author: {comment.createdBy ? comment.createdBy.name : 'Stranger'}</p>
            <p>{comment.text}</p>
            {user && user._id === comment.createdBy._id && (
              <button onClick={() => onDeleteComment(comment._id)}>X</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}