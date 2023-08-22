import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import Encounters from '../Encounters/Encounters'; 
import Header from '../../components/Header/Header';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [showAuthPage, setShowAuthPage] = useState(false);

  return (
    <div className='container'>
      <header>
        <Header />
      </header>
      <aside>
        <NavBar user={user} setUser={setUser} setShowAuthPage={setShowAuthPage} />
        {user ? null : showAuthPage && <AuthPage setUser={setUser} />} 
      </aside>
      <main>
        <Encounters user={user}/>
      </main>
    </div>
  );
}
