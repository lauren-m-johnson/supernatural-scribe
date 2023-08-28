import React, { useState } from 'react';
import * as encountersService from '../../utilities/encounters-service';
import './EditEncounterForm.css';

// Functional component for editing an encounter
export default function EditEncounterForm({ onSubmit, onCancel, initialFormData }) {
  // State to manage the form data
  const [formData, setFormData] = useState(initialFormData);

  // Function to handle input changes
  function handleChange(evt) {
    // Update the form data with the changed field value
    const newFormData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(newFormData);
  }

  // Function to handle form submission
  async function handleEditSubmit(evt) {
    evt.preventDefault();

    try {
      // Call the encountersService to update the encounter
      const updatedData = await encountersService.updateEncounter(initialFormData._id, formData);
      // Call the provided onSubmit function with the updated data
      onSubmit(updatedData);
    } catch (error) {
      console.error('Error updating encounter:', error);
    }
  }

  // Render the edit form
  return (
    <div className="encounter-form-container">
      <form onSubmit={handleEditSubmit} className="encounter-form">
        <h2>Edit Encounter</h2>
        {/* Input fields for editing encounter details */}
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
        {/* Submit button to save changes and cancel button */}
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}