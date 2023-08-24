import './Comments.css';

export default function Comments({ comments }) {
  return (
    <div className="comments-container">
      <h3>Comments:</h3>
      <ul className="comment-list">
        {comments.map(comment => (
          <li key={comment._id} className="comment-item">
            <p>{comment.text}</p>
            <p>By: {comment.createdBy.name}</p>
            {/* Add delete button for comment here */}
          </li>
        ))}
      </ul>
    </div>
  );
}