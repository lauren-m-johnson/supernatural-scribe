import React, { useState } from 'react';
import * as encountersService from '../../utilities/encounters-service';

export default function EncounterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
  });

  function handleChange(evt) {
    const newFormData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(newFormData);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    encountersService.createEncounter(formData)
      .then(savedData => {
        onSubmit(savedData);
      })
      .catch(error => {
        console.error('Error saving encounter:', error);
      });
  }

  return (
    <div className="encounter-form-container">
      <form onSubmit={handleSubmit} className="encounter-form">
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