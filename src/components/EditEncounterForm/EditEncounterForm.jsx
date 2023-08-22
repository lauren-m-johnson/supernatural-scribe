import React, { useState } from 'react';
import * as encountersService from '../../utilities/encounters-service';
import './EditEncounterForm.css';

export default function EditEncounterForm({ onSubmit, onCancel, initialFormData }) {
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(evt) {
    const newFormData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(newFormData);
  }

  function handleEditSubmit(evt) {
    evt.preventDefault();

    const updatedEncounterData = {
      ...formData,
    };

    encountersService.updateEncounter(initialFormData._id, updatedEncounterData)
      .then(updatedData => {
        onSubmit(updatedData);
      })
      .catch(error => {
        console.error('Error updating encounter:', error);
      });
  }

  // Render the form
  return (
    <div className="encounter-form-container">
      <form onSubmit={handleEditSubmit} className="encounter-form">
        <h2>Edit Encounter</h2>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}