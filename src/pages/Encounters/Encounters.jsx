import React, { useState, useEffect } from 'react';
import EncounterForm from '../../components/EncounterForm/EncounterForm';
import * as encountersService from '../../utilities/encounters-service';
import './Encounter.css';

export default function Encounters({ user }) {
  const [submittedEncounter, setSubmittedEncounter] = useState(null);
  const [encounters, setEncounters] = useState([]);

  const handleFormSubmit = (savedData) => {
    setSubmittedEncounter(savedData);
  };

  useEffect(() => {
    encountersService.fetchEncounters()
      .then(encountersData => {
        setEncounters(encountersData);
      })
      .catch(error => {
        console.error('Error fetching encounters using encounters-service.js:', error);
      });
  }, []);

  const handleEdit = (encounter) => {

  };

  return (
    <div>
      {user && (
        <EncounterForm onSubmit={handleFormSubmit} user={user} />
      )}

      {submittedEncounter && (
        <div className="submitted-data">
          {user && (
            <>
              <p>User: {user.name}</p>
              <p>Title: {submittedEncounter.title}</p>
              <p>Location: {submittedEncounter.location}</p>
              <p>Description: {submittedEncounter.description}</p>
            </>
          )}
        </div>
      )}

      {/* Render the list of encounters */}
      <div className="encounters-list">
        <h1>Encounters</h1>
        {encounters.slice().reverse().map(encounter => (
          <div key={encounter._id} className='post'>
            <p>Author: {encounter.createdBy ? encounter.createdBy.name : "Stranger"}</p>
            <p>Title: {encounter.title}</p>
            <p>Location: {encounter.location}</p>
            <p>Description: {encounter.description}</p>
            {user && encounter.createdBy._id === user._id && (
              <button onClick={() => handleEdit(encounter)}>Edit</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}






