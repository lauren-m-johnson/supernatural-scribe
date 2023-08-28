import React, { useState, useEffect } from 'react';
import './Encounter.css';
import EncounterForm from '../../components/EncounterForm/EncounterForm';
import EditEncounterForm from '../../components/EditEncounterForm/EditEncounterForm';
import Comments from '../../pages/Comments/Comments'; 
import CommentForm from '../../components/CommentForm/CommentForm';
import * as encountersService from '../../utilities/encounters-service';
import * as commentsApi from '../../utilities/comments-api'; 

export default function Encounters({ user }) {
  const [encounters, setEncounters] = useState([]);
  const [editingEncounter, setEditingEncounter] = useState(null);
  const [showEncounterForm, setShowEncounterForm] = useState(false);
  const [loading, setLoading] = useState(true); 

  // Function to fetch encounter data from the server
  const fetchEncounterData = async () => {
    try {
      // Fetch encounters data from the server
      const encountersData = await encountersService.fetchEncounters();
      // Fetch comments for each encounter
      const encountersWithComments = await Promise.all(
        encountersData.map(async (encounter) => {
          const comments = await commentsApi.fetchCommentsForEncounter(encounter._id);
          return { ...encounter, comments };
        })
      );
      
      // Update state with encounters data and mark loading as complete
      setEncounters(encountersWithComments);
      setLoading(false); 

    } catch (error) {
      console.error('Error fetching encounters:', error);
      setLoading(false); 
    }
  };

  // Function to handle deletion of an encounter
  const handleDelete = async (encounter) => {
    try {
      await encountersService.deleteEncounter(encounter._id);
      // Update state by filtering out the deleted encounter
      setEncounters(encounters.filter(e => e._id !== encounter._id));
    } catch (error) {
      console.error('Error deleting encounter:', error);
    }
  };

  // Function to handle form submission for creating an encounter
  const handleFormSubmit = async (formData) => {
    // Create encounter data with user ID and form data
    const encounterDataWithUser = {
      title: formData.title,
      location: formData.location,
      description: formData.description,
      createdBy: user._id,
    };

    try {
      // Call the service to create the encounter, then update UI and state
      await encountersService.createEncounter(encounterDataWithUser);
      fetchEncounterData();
      setEditingEncounter(null);
      setShowEncounterForm(false);
    } catch (error) {
      console.error('Error saving encounter:', error);
    }
  };

  // Function to handle form submission for editing an encounter
  const handleEditFormSubmit = async (editedEncounter) => {
    try {
      // Call the service to update the encounter, then update UI and state
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

  // Function to handle submission of a new comment
  const handleCommentSubmit = async (encounter, text) => {
    try {
      // Create a new comment and update UI and state
      const newComment = await commentsApi.createComment({
        text,
        createdBy: user._id,
        encounter: encounter._id,
      });
      setEncounters(prevEncounters => 
        prevEncounters.map(e =>
          e._id === encounter._id ? { ...e, comments: [...e.comments, newComment] } : e
        )
      );
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Function to handle deletion of a comment
  const handleDeleteComment = async (commentId) => {
      try {
        // Delete a comment and update UI and state
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

  // Fetch encounter data when the component mounts
  useEffect(() => {
    fetchEncounterData();
  }, []);

  // Render component content based on loading state
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
              <button onClick={() => setShowEncounterForm(true)}>Submit an Encounter</button>
            )}
            <br />
            {encounters.slice().reverse().map(encounter => (
              <div key={encounter._id} className='post'>
                <p><span className='title'>Author: </span>{encounter.createdBy ? encounter.createdBy.name : "Stranger"}</p>
                <p><span className='title'>Title: </span>{encounter.title}</p>
                <p><span className='title'>Location: </span>{encounter.location}</p>
                <p><span className='title'>The Encounter: </span><br />{encounter.description}</p>
                {encounter.createdBy && user && encounter.createdBy._id === user._id && (
                  <div>
                    <button className="encounter-button" onClick={() => setEditingEncounter(encounter)}>Edit</button>
                    <button className="encounter-button" onClick={() => handleDelete(encounter)}>Delete</button>
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
      )}
    </div>
  );
}




