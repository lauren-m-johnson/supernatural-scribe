import './Comments.css';
import React, { useState } from 'react';

// Functional component to display comments for an encounter
export default function Comments({ comments, user, onDeleteComment }) {
    // State to manage whether comments are shown or hidden
    const [showComments, setShowComments] = useState(false);

    // Function to toggle the display of comments
    const toggleComments = () => {
        setShowComments(!showComments);
    };

    // Render the comments section
    return (
        <div className='comments-container'>
            <h2>Comments</h2>
            {/* Button to toggle the display of comments */}
            <button onClick={toggleComments}>
                {showComments ? 'HIDE' : 'Display Comments'}
            </button>
            {/* Show comments if the showComments state is true */}
            {showComments && (
                <ul>
                    {/* Map through the comments array and render each comment */}
                    {comments.map(comment => {
                        return (
                            <li key={comment._id}>
                                <div className='comment-flex'>
                                    <div>
                                        {/* Display the comment author's name or "Stranger" */}
                                        <p>
                                            <span className='title'>
                                                {comment.createdBy ? comment.createdBy.name : 'Stranger'}
                                            </span> said: 
                                        </p>
                                        {/* Display the comment text */}
                                        <p>{comment.text}</p>
                                    </div>
                                    <div>
                                        {/* Show delete button for the comment's author */}
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




