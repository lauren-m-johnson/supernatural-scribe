import React, { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import './SignUpForm.css';

// Functional component for the sign-up form
export default function SignUpForm({ setUser }) {
  // State to manage form data and error message
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  });

  // Function to handle input changes
  const handleChange = (evt) => {
    // Update the formData state with the changed field value and clear error
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  // Function to handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      // Extract relevant fields from formData
      const { name, email, password } = formData;
      // Create an object with the user's registration data
      const formDataToSend = { name, email, password };
      // Call the signUp function with the registration data
      const user = await signUp(formDataToSend);
      // Call the provided setUser function with the newly registered user
      setUser(user);
    } catch {
      // Set an error message if sign-up fails
      setFormData({
        ...formData,
        error: 'Sign Up Failed - Try Again'
      });
    }
  };

  // Determine if the "SIGN UP" button should be disabled
  const disable = formData.password !== formData.confirm;

  // Render the sign-up form
  return (
    <div>
      <div className="signup-form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Display Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>
      {/* Display error message if there's an error */}
      <p className="error-message">&nbsp;{formData.error}</p>
    </div>
  );
}