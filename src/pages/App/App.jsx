import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import EncounterForm from '../../components/EncounterForm/EncounterForm';
import Encounters from '../Encounters/Encounters';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [showAuthPage, setShowAuthPage] = useState(false);

  return (
    <>
      <aside>
        <NavBar user={user} setUser={setUser} setShowAuthPage={setShowAuthPage} /> {/* Add setShowAuthPage prop */}
        {user ? <EncounterForm /> : null}
      </aside>
      <main className="App">
        <Encounters />
      </main>
      {user ? null : showAuthPage && <AuthPage setUser={setUser} />}
    </>
  );
}
