import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser, setShowAuthPage }) { // Update the prop here
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  function handleLogInClick() { // Add this function
    setShowAuthPage(true);
  }

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
      ) : (
        <>
          <span>Welcome, Guest</span>
          &nbsp;&nbsp;<Link to="" onClick={handleLogInClick}>Log In</Link> {/* Update this line */}
        </>
      )}
    </nav>
  );
}