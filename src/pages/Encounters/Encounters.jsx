import React, { useState, useEffect } from 'react';
import './Encounter.css';
import EncounterForm from '../../components/EncounterForm/EncounterForm';
import EditEncounterForm from '../../components/EditEncounterForm/EditEncounterForm';
import * as encountersService from '../../utilities/encounters-service';

export default function Encounters({ user }) {
  const [encounters, setEncounters] = useState([]);
  const [editingEncounter, setEditingEncounter] = useState(null);
  const [showEncounterForm, setShowEncounterForm] = useState(false);

  const fetchEncounterData = async () => {
    try {
      const encountersData = await encountersService.fetchEncounters();
      setEncounters(encountersData);
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

  const handleFormSubmit = async (savedData) => {
    const encounterDataWithUser = {
      title: savedData.title,
      location: savedData.location,
      description: savedData.description,
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

  useEffect(() => {
    console.log("Fetching encounter data..."); // Test
    fetchEncounterData();
  }, []);

  return (
    <div>
      {user && !editingEncounter && !showEncounterForm && (
        <button onClick={() => setShowEncounterForm(true)}>Submit an Encounter</button>
      )}

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
        {encounters.slice().reverse().map(encounter => (
          <div key={encounter._id} className='post'>
            <p>Author: {encounter.createdBy ? encounter.createdBy.name : "Stranger"}</p>
            <p>Title: {encounter.title}</p>
            <p>Location: {encounter.location}</p>
            <p>Description: {encounter.description}</p>
            {encounter.createdBy && user && encounter.createdBy._id === user._id && (
            <div>
              <button onClick={() => setEditingEncounter(encounter)}>Edit</button>
              <button onClick={() => handleDelete(encounter)}>Delete</button>
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}




