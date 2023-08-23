import React, { useState } from 'react';
import './EncounterForm.css';

export default function EncounterForm({ onSubmit, user, setShowEncounterForm }) {
  const initialFormData = {
    title: '',
    location: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(evt) {
    const newFormData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(newFormData);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
  
    const encounterDataWithUser = {
      ...formData,
      createdBy: user._id,
    };

      onSubmit(encounterDataWithUser); 
      setFormData(initialFormData);
      setShowEncounterForm(false); 
  }

  // Render the form
  return (
    <div className="encounter-form-container">
      <form onSubmit={handleSubmit} className="encounter-form">
        <h2>Submit an Encounter</h2>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}