import React, { useState } from 'react';
import './CommentForm.css';

// Functional component for submitting comments
export default function CommentForm({ user, onSubmit }) {
    // State to manage the comment text and form visibility
    const [comment, setComment] = useState('');
    const [showForm, setShowForm] = useState(false);

    // Function to handle the form submission
    const handleSubmit = async evt => {
        evt.preventDefault();
        // Check if the comment is empty or only whitespace
        if (comment.trim() === '') {
            return;
        }
        // Call the provided onSubmit function and reset the comment state
        await onSubmit(comment, user);
        setComment('');
    };

    // Function to toggle the visibility of the comment form
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Render the comment form section
    return (
        <div className='comment-form-container'>
            {/* Button to toggle the visibility of the comment form */}
            <button onClick={toggleForm}>
                {showForm ? 'HIDE' : 'Leave Comment'}
            </button>
            {/* Show the form if the showForm state is true */}
            {showForm && (
                <form onSubmit={handleSubmit} className='comment-form'>
                    <label>
                        Add a Comment:
                        <br />
                        {/* Textarea for entering the comment */}
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                    </label>
                    {/* Submit button for submitting the comment */}
                    <button type='submit'>Submit</button>
                </form>
            )}
        </div>
    );
}





