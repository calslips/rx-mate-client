import axios from 'axios';
import { useEffect } from 'react';
import { History, MedHistoryProps, Medication } from '../types';
import MedicationList from '../components/medication/MedicationList';
import Navbar from '../components/Navbar';
import { EventInput } from '@fullcalendar/react';

// place in helpers
const getMedHistory = async (
  saveHistory: (medHistory: History[]) => void,
  saveEvents: (evtInput: EventInput[]) => void,
  events: EventInput[],
) => {
  try {
    const res = await axios.get('/user', {
      headers: {
        token: localStorage.getItem('token') || '',
      }
    });

    saveHistory(res.data.user.history);
    const historicalEvents: EventInput[] = formatHistory(res.data.user.history, events);
    saveEvents(historicalEvents);
  } catch (err) {
    console.error(err);
  }
};

const formatHistory = (history: History[], events: EventInput[]) => {
  const historyCount = history.reduce((count: number, dayHx: History) => dayHx.medsDue.length + count, 0);

  if (historyCount !== events.length) {
    for (let i = events.length; i <= historyCount; i++) {
      history[i]?.medsDue.forEach((med, j) => {
        events.push({
          id: history[i]._id + j,
          title: med.name + (med.administered ? ': Taken' : ': Not taken'),
          start: history[i].dateDue.toString().replace(/T.*$/, '') + `T${med.time}`,
        });
      })
    }
  }
  return events;
};

const getMedsDue = (medsList: Medication[]) => {
  const dayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date().getDay();
  return medsList.filter(med => med.days.includes(dayKey[today]));
};

export const getUserData = async (saveUser: (user: string) => void, saveMeds: (meds: Medication[]) => void) => {
  try {
    const res = await axios.get('/user', {
      headers: {
        token: localStorage.getItem('token') || ''
      }
    });
    saveUser(res.data.user.username);
    saveMeds(res.data.user.medications);
  }
  catch (err) {
    console.error(err);
  }
}

const Dashboard = ({ user, setUser, meds, setMeds, setHistory, events, setEvents }: MedHistoryProps) => {
  const displayDate = new Date().toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  useEffect(() => {
    getUserData(setUser, setMeds);
    getMedHistory(setHistory, setEvents, events);
  }, [setUser, setMeds, setHistory, setEvents, events]);

  return (
    <>
      <Navbar />
      <section className='max-w-2xl mx-auto p-8'>
        <h1 className='font-bold mb-8 text-cyan-400 text-center text-xl'>{user}'s Medications for {displayDate}</h1>
        <MedicationList meds={getMedsDue(meds)} setMeds={setMeds} />
      </section>
    </>
  )
}

export default Dashboard;