import './Comments.css';

export default function Comments({ comments, user }) {
  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.createdBy ? comment.createdBy.name : 'Unknown User'} said:</p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}