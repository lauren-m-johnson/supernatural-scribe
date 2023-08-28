import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

// Functional component for the navigation bar
export default function NavBar({ user, setUser, setShowAuthPage }) {
  // Function to handle user log out
  function handleLogOut() {
    // Call the userService to log out the user
    userService.logOut();
    // Clear the user state
    setUser(null);
  }

  // Function to handle log in click
  function handleLogInClick() {
    // Show the authentication page (assuming setShowAuthPage function is used)
    setShowAuthPage(true);
  }

  // Render the navigation bar
  return (
    <nav>
      {user ? ( // If user is logged in
        <>
          <span>Hello, {user.name}</span>
          <br />
          &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
      ) : ( // If user is not logged in
        <>
          <span>Welcome, Stranger</span>
          <br />
          &nbsp;&nbsp;<Link to="" onClick={handleLogInClick}>Log In</Link>
        </>
      )}
    </nav>
  );
}