import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import Encounters from '../Encounters/Encounters'; 
import Header from '../../components/Header/Header';

// Functional component for the main application
export default function App() {
  // State to manage user authentication and showing the authentication page
  const [user, setUser] = useState(getUser());
  const [showAuthPage, setShowAuthPage] = useState(false);

  // Render the main layout of the application
  return (
    <div className='container'>
      {/* Header component */}
      <header>
        <Header />
      </header>
      {/* Sidebar with navigation bar and authentication page */}
      <aside>
        {/* Pass user state, setUser function, and showAuthPage state to the NavBar component */}
        <NavBar user={user} setUser={setUser} setShowAuthPage={setShowAuthPage} />
        {/* Conditionally render AuthPage if user is not authenticated and showAuthPage is true */}
        {user ? null : showAuthPage && <AuthPage setUser={setUser} />}
      </aside>
      {/* Main content area with encounters */}
      <main>
        {/* Pass user state to the Encounters component */}
        <Encounters user={user}/>
      </main>
    </div>
  );
}
