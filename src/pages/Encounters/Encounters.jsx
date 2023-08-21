import React, { useState, useEffect } from 'react';
import EncounterForm from '../../components/EncounterForm/EncounterForm';
import * as encountersService from '../../utilities/encounters-service';
import * as encountersApi from '../../utilities/encounters-api'; 

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

    encountersApi.fetchEncountersApi() 
      .then(encountersData => {
        setEncounters(encountersData); 
      })
      .catch(error => {
        console.error('Error fetching encounters using encounters-api.js:', error);
      });
  }, []);

  return (
    <div>
      {user && (
        <EncounterForm onSubmit={handleFormSubmit} />
      )}

      {submittedEncounter && (
        <div className="submitted-data">
          <p>Title: {submittedEncounter.title}</p>
          <p>Location: {submittedEncounter.location}</p>
          <p>Description: {submittedEncounter.description}</p>
        </div>
      )}

      {/* Render the list of encounters */}
      <div className="encounters-list">
        {encounters.slice().reverse().map(encounter => (
        <div key={encounter._id}>
          <p>Title: {encounter.title}</p>
          <p>Location: {encounter.location}</p>
          <p>Description: {encounter.description}</p>
        </div>
      ))}
      </div>
    </div>
  );
}






