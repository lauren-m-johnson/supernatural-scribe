import React, { useState, useEffect } from 'react';
import './Encounter.css';
import EncounterForm from '../../components/EncounterForm/EncounterForm';
import EditEncounterForm from '../../components/EditEncounterForm/EditEncounterForm';
import * as encountersService from '../../utilities/encounters-service';

export default function Encounters({ user }) {
  const [encounters, setEncounters] = useState([]);
  const [editingEncounter, setEditingEncounter] = useState(null);

  const handleFormSubmit = async (savedData) => {
    const encounterDataWithUser = {
      ...savedData,
      createdBy: user,
    };
  
    try {
      const newEncounter = await encountersService.createEncounter(encounterDataWithUser);
      setEncounters([newEncounter, ...encounters]); // Update the state directly
      setEditingEncounter(null);
    } catch (error) {
      console.error('Error saving encounter:', error);
    }
  };

  const handleEditFormSubmit = async (editedEncounter) => {
    try {
      await encountersService.updateEncounter(
        editedEncounter._id,
        editedEncounter
      );
  
      // Update the state directly with the edited encounter
      setEncounters(encounters.map(encounter =>
        encounter._id === editedEncounter._id ? editedEncounter : encounter
      ));
  
      setEditingEncounter(null);
    } catch (error) {
      console.error('Error updating encounter:', error);
    }
  };

  useEffect(() => {
    async function fetchEncounterData() {
      try {
        const encountersData = await encountersService.fetchEncounters();
        setEncounters(encountersData);
      } catch (error) {
        console.error('Error fetching encounters:', error);
      }
    }

    fetchEncounterData();
  }, [editingEncounter]);

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
  
      <div className="encounters-list">
        <h1>Encounters</h1>
        {encounters.slice().reverse().map(encounter => (
          <div key={encounter._id} className='post'>
            <p>Author: {encounter.createdBy ? encounter.createdBy.name : "Stranger"}</p>
            <p>Title: {encounter.title}</p>
            <p>Location: {encounter.location}</p>
            <p>Description: {encounter.description}</p>
            {encounter.createdBy && user && encounter.createdBy._id === user._id && (
              <button onClick={() => setEditingEncounter(encounter)}>Edit</button>
              
            )}
          </div>
        ))}
      </div>
    </div>
  );
}





