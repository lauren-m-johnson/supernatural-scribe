import React, { useState } from 'react';
import './CommentForm.css';

export default function CommentForm({ user, onSubmit }) {
    const [comment, setComment] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async evt => {
        evt.preventDefault();
        if (comment.trim() === '') {
            return;
        }

        await onSubmit(comment, user);
        setComment('');
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className='comment-form-container'>
            <button onClick={toggleForm}>
                {showForm ? 'Hide Comment Form' : 'Show Comment Form'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className='comment-form'>
                    <label>
                        Add a Comment:
                        <br />
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                    </label>
                    <button type='submit'>Submit</button>
                </form>
            )}
        </div>
    );
}