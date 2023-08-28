import React, { useState } from 'react';
import './EncounterForm.css';

// Functional component for submitting an encounter
export default function EncounterForm({ onSubmit, user, setShowEncounterForm }) {
  // Initial form data state
  const initialFormData = {
    title: '',
    location: '',
    description: '',
  };

  // State to manage the form data
  const [formData, setFormData] = useState(initialFormData);

  // Function to handle input changes
  function handleChange(evt) {
    // Update the form data with the changed field value
    const newFormData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(newFormData);
  }

  // Function to handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();

    // Create encounter data with the user's ID
    const encounterDataWithUser = {
      ...formData,
      createdBy: user._id,
    };

    // Call the provided onSubmit function with encounter data
    onSubmit(encounterDataWithUser);

    // Reset the form data and hide the encounter form
    setFormData(initialFormData);
    setShowEncounterForm(false);
  }

  // Render the encounter submission form
  return (
    <div className="encounter-form-container">
      <form onSubmit={handleSubmit} className="encounter-form">
        <h2>Submit an Encounter</h2>
        {/* Input fields for encounter details */}
        <label>
          Title:
          <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <br />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Describe the events:
          <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        {/* Submit button and cancel button */}
        <button type="submit">Submit</button>
        <button type='button' onClick={() => setShowEncounterForm(false)}>Cancel</button>
      </form>
    </div>
  );
}