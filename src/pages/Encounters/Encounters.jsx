import React, { useState, useEffect } from 'react';
import EncounterForm from '../../components/EncounterForm/EncounterForm';
import * as encountersService from '../../utilities/encounters-service';

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
        {encounters.slice().reverse().map(encounter => (
          <div key={encounter._id}>
            <p>User: {encounter.createdBy ? encounter.createdBy.name : "Unknown User"}</p>
            <p>Title: {encounter.title}</p>
            <p>Location: {encounter.location}</p>
            <p>Description: {encounter.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}






