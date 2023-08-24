import React, { useState, useEffect } from 'react';
import './Encounter.css';
import EncounterForm from '../../components/EncounterForm/EncounterForm';
import EditEncounterForm from '../../components/EditEncounterForm/EditEncounterForm';
import Comments from '../../pages/Comments/Comments'; // Import your Comments component
import CommentForm from '../../components/CommentForm/CommentForm';
import * as encountersService from '../../utilities/encounters-service';
import * as commentsApi from '../../utilities/comments-api'; // Import the comments API

export default function Encounters({ user }) {
  const [encounters, setEncounters] = useState([]);
  const [editingEncounter, setEditingEncounter] = useState(null);
  const [showEncounterForm, setShowEncounterForm] = useState(false);

  const fetchEncounterData = async () => {
    try {
      const encountersData = await encountersService.fetchEncounters();
  
      // Fetch comments for each encounter
      const encountersWithComments = await Promise.all(
        encountersData.map(async (encounter) => {
          const comments = await commentsApi.fetchCommentsForEncounter(encounter._id); // Fix the variable name here
          return { ...encounter, comments };
        })
      );
  
      setEncounters(encountersWithComments);
    } catch (error) {
      console.error('Error fetching encounters:', error);
    }
  };

  const handleDelete = async (encounter) => {
    try {
      await encountersService.deleteEncounter(encounter._id);
      setEncounters(encounters.filter(e => e._id !== encounter._id));
    } catch (error) {
      console.error('Error deleting encounter:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    const encounterDataWithUser = {
      title: formData.title,
      location: formData.location,
      description: formData.description,
      createdBy: user._id,
    };

    try {
      await encountersService.createEncounter(encounterDataWithUser);
      fetchEncounterData();
      setEditingEncounter(null);
      setShowEncounterForm(false);
    } catch (error) {
      console.error('Error saving encounter:', error);
    }
  };

  const handleEditFormSubmit = async (editedEncounter) => {
    try {
      await encountersService.updateEncounter(editedEncounter._id, editedEncounter);
      
      setEncounters(prevEncounters => 
        prevEncounters.map(encounter =>
          encounter._id === editedEncounter._id ? editedEncounter : encounter
        )
      );
  
      setEditingEncounter(null);
    } catch (error) {
      console.error('Error updating encounter:', error);
    }
  };

  const handleCommentSubmit = async (encounter, text) => {
    try {
      const newComment = await commentsApi.createComment({
        text,
        createdBy: user._id,  // Use user._id here
        encounter: encounter._id,
      });
      // Update encounters with new comment
      setEncounters(prevEncounters =>
        prevEncounters.map(e =>
          e._id === encounter._id ? { ...e, comments: [...e.comments, newComment] } : e
        )
      );
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
      try {
        await commentsApi.deleteComment(commentId);
        setEncounters(prevEncounters =>
          prevEncounters.map(encounter =>
            // eslint-disable-next-line
            encounter._id === encounter._id
              ? { ...encounter, comments: encounter.comments.filter(comment => comment._id !== commentId) }
              : encounter
          )
        );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  useEffect(() => {
    fetchEncounterData();
  }, []);

  return (
    <div>
      {showEncounterForm && (
        <EncounterForm
          onSubmit={handleFormSubmit}
          user={user}
          setShowEncounterForm={setShowEncounterForm}
        />
      )}

      {editingEncounter ? (
        <EditEncounterForm
          onSubmit={handleEditFormSubmit}
          onCancel={() => setEditingEncounter(null)}
          initialFormData={editingEncounter}
        />
      ) : null}
  
      <div className="encounters-list">
        <h1>Encounters</h1>
        {user && !editingEncounter && !showEncounterForm && (
          <button id="" onClick={() => setShowEncounterForm(true)}>Submit an Encounter</button>
        )}
        {encounters.slice().reverse().map(encounter => (
          <div key={encounter._id} className='post'>
            <p>Author: {encounter.createdBy ? encounter.createdBy.name : "Stranger"}</p>
            <p>Title: {encounter.title}</p>
            <p>Location: {encounter.location}</p>
            <p>The Encounter: {encounter.description}</p>
            {encounter.createdBy && user && encounter.createdBy._id === user._id && (
              <div>
                <button onClick={() => setEditingEncounter(encounter)}>Edit</button>
                <button onClick={() => handleDelete(encounter)}>Delete</button>
              </div>
            )}
            <Comments comments={encounter.comments} user={user} onDeleteComment={handleDeleteComment} />
            {user && (
              <CommentForm user={user} onSubmit={text => handleCommentSubmit(encounter, text)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}




