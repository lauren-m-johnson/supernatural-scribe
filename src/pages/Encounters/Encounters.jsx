import React, { useState, useEffect } from 'react';
import EncounterForm from '../../components/EncounterForm/EncounterForm';
import EditEncounterForm from '../../components/EditEncounterForm/EditEncounterForm';
import * as encountersService from '../../utilities/encounters-service';
import './Encounter.css';

export default function Encounters({ user }) {
  const [submittedEncounter, setSubmittedEncounter] = useState(null);
  const [encounters, setEncounters] = useState([]);
  const [editingEncounter, setEditingEncounter] = useState(null);

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
    setEditingEncounter(encounter);
  };

  const handleEditFormSubmit = (editedEncounter) => {
    encountersService.updateEncounter(editedEncounter._id, editedEncounter) // Pass _id and editedEncounter
      .then(updatedEncounter => {
        const updatedEncounters = encounters.map(encounter =>
          encounter._id === updatedEncounter._id ? updatedEncounter : encounter
        );
        setEncounters(updatedEncounters);
        setEditingEncounter(null);
      })
      .catch(error => {
        console.error('Error updating encounter:', error);
      });
  };

  return (
    <div>
      {user && !editingEncounter && (
        <EncounterForm onSubmit={handleFormSubmit} user={user} />
      )}

      {editingEncounter ? (
        <EditEncounterForm
          onSubmit={handleEditFormSubmit}
          onCancel={() => setEditingEncounter(null)}
          initialFormData={editingEncounter}
        />
      ) : null}
  
      {submittedEncounter && (
        <div className="submitted-data">
          <p>User: {user.name}</p>
          <p>Title: {submittedEncounter.title}</p>
          <p>Location: {submittedEncounter.location}</p>
          <p>Description: {submittedEncounter.description}</p>
        </div>
      )}
  
      <div className="encounters-list">
        <h1>Encounters</h1>
        {encounters.slice().reverse().map(encounter => (
          <div key={encounter._id} className='post'>
            <p>Author: {encounter.createdBy ? encounter.createdBy.name : "Stranger"}</p>
            <p>Title: {encounter.title}</p>
            <p>Location: {encounter.location}</p>
            <p>Description: {encounter.description}</p>
            {encounter.createdBy && user && encounter.createdBy._id === user._id && (
              <button onClick={() => handleEdit(encounter)}>Edit</button>
            )}
          </div>
        ))}
      </div>
  

    </div>
  );
}





