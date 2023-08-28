import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import './LoginForm.css';

// Functional component for the login form
export default function LoginForm({ setUser }) {
  // State to manage user credentials and error message
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Function to handle input changes
  function handleChange(evt) {
    // Update the credentials state with the changed field value
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    // Clear the error message
    setError('');
  }

  // Function to handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      // Call the usersService to log in with provided credentials
      const user = await usersService.login(credentials);
      // Call the provided setUser function with the logged-in user
      setUser(user);
    } catch {
      // Set an error message if login fails
      setError('Log In Failed - Try Again');
    }
  }

  // Render the login form
  return (
    <div>
      <div className="form-container">
        <form className="log-form" autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <br />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <br />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      {/* Display error message if there's an error */}
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}