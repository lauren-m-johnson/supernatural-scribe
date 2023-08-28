import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

// Functional component for the authentication page
export default function AuthPage({ setUser }) {
  // State to manage toggling between sign-up and log-in forms
  const [showSignUp, setShowSignUp] = useState(false);

  // Render the main content of the authentication page
  return (
    <main>
      {/* Toggle button to switch between sign-up and log-in forms */}
      <button onClick={() => setShowSignUp(!showSignUp)}>
        {showSignUp ? 'LOG IN' : 'SIGN UP'}
      </button>
      {/* Conditionally render either the sign-up or log-in form */}
      { showSignUp ?
          <SignUpForm setUser={setUser} />  // Render sign-up form if showSignUp is true
          :
          <LoginForm setUser={setUser} />   // Render log-in form if showSignUp is false
      }
    </main>
  );
}