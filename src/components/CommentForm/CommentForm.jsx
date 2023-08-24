import { useState } from 'react';
import './CommentForm.css';

export default function CommentForm({ user, onSubmit }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (comment.trim() === '') {
      return;
    }

    await onSubmit(comment, user._id); 
    setComment('');
  };

  return (
    <div className="comment-form-container">
      <form onSubmit={handleSubmit} className="comment-form">
        <label>
          Add a Comment:
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}