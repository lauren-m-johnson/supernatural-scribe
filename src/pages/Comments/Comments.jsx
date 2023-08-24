import './Comments.css';

export default function Comments({ comments, user, onDeleteComment }) {
  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            {user && user._id === comment.createdBy._id && (
              <button onClick={() => onDeleteComment(comment._id)}>X</button>
            )}
            <p>{comment.createdBy ? comment.createdBy.name : 'Stranger'} said: </p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}