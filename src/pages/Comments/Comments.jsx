import './Comments.css';
import React, { useState } from 'react';

export default function Comments({ comments, user, onDeleteComment }) {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
      setShowComments(!showComments);
  };

  return (
      <div className='comments-container'>
          <h2>Comments</h2>
          <button onClick={toggleComments}>
              {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
          {showComments && (
              <ul>
                  {comments.map(comment => {
                      return (
                          <li key={comment._id}>
                              <div className='comment-flex'>
                                  <div>
                                      <p>
                                          {comment.createdBy ? comment.createdBy.name : 'Stranger'} said:
                                      </p>
                                      <p>{comment.text}</p>
                                  </div>
                                  <div>
                                      {user && user._id === comment.createdBy._id && (
                                          <button id="delete-btn" onClick={() => onDeleteComment(comment._id)}>X</button>
                                      )}
                                  </div>
                              </div>
                          </li>
                      );
                  })}
              </ul>
          )}
      </div>
  );
}




