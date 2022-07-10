import axios from 'axios';
import { useEffect } from 'react';
import { Medication } from '../components/medication/MasterMedList';
import MedicationList from '../components/medication/MedicationList';
import Navbar from '../components/Navbar';
import { UserDataProps } from '../App';

export const getUserData = async (saveUser: (user: string) => void, saveMeds: (meds: Medication[]) => void) => {
  try {
    const userRes = await axios.get('/user', {
      headers: {
        token: localStorage.getItem('token') || ''
      }
    });
    const medRes = await axios.get('/medications', {
      headers: {
        token: localStorage.getItem('token') || ''
      }
    });
    saveUser(userRes.data.user.username);
    saveMeds(medRes.data.medications);
  }
  catch (err) {
    console.error(err);
  }
}

const Dashboard = ({ user, setUser, meds, setMeds }: UserDataProps) => {
  useEffect(() => {
    getUserData(setUser, setMeds);
  }, [setUser, setMeds]);

  return (
    <>
      <Navbar />
      <section className='max-w-md mx-auto p-8'>
        <h1 className='font-bold mb-8 text-cyan-400 text-center text-xl'>{user}'s Medications</h1>
        <MedicationList meds={meds} setMeds={setMeds} />
      </section>
    </>
  )
}

export default Dashboard;