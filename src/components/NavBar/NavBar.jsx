import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser, setShowAuthPage }) { 
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  function handleLogInClick() { 
    setShowAuthPage(true);
  }

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <br />
          &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        </>
      ) : (
        <>
          <span>Welcome, Stranger</span>
          <br />
          &nbsp;&nbsp;<Link to="" onClick={handleLogInClick}>Log In</Link> 
        </>
      )}
    </nav>
  );
}