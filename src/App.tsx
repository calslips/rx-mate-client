import { useState } from 'react';
import Landing from './pages/Landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authenticate from './components/entry/Authenticate';
import Dashboard from './pages/Dashboard';
import MedicationHistory from './pages/MedicationHistory';
import Profile from './pages/Profile';
import { Medication } from './types';
import { History } from './types';
import { EventInput } from '@fullcalendar/react'

const App = () => {
  const [user, setUser] = useState<string>('');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [history, setHistory] = useState<History[]>([]);
  const [events, setEvents] = useState<EventInput[]>([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route
          path='/dashboard'
          element={
            <Authenticate>
              <Dashboard
                user={user}
                setUser={setUser}
                meds={medications}
                setMeds={setMedications}
                history={history}
                setHistory={setHistory}
                events={events}
                setEvents={setEvents}
              />
            </Authenticate>
          }
        />
        <Route
          path='/history'
          element={
            <Authenticate>
              <MedicationHistory user={user} events={events} />
            </Authenticate>
          }
        />
        <Route
          path='/profile'
          element={
            <Authenticate>
              <Profile user={user} setUser={setUser} meds={medications} setMeds={setMedications} />
            </Authenticate>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;