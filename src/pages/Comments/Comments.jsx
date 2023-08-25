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
                {showComments ? 'HIDE' : 'Display Comments'}
            </button>
            {showComments && (
                <ul>
                    {comments.map(comment => {
                        return (
                            <li key={comment._id}>
                                <div className='comment-flex'>
                                    <div>
                                        <p>
                                        <span className='title'>{comment.createdBy ? comment.createdBy.name : 'Stranger'}</span> said: 
                                        </p>
                                        <p>{comment.text}</p>
                                    </div>
                                    <div>
                                        {user && user._id === comment.createdBy._id && (
                                            <button id="delete-btn" onClick={() => onDeleteComment(comment._id)}>x</button>
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




