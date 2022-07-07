import axios from 'axios';
import { useEffect } from 'react';
import MedicationForm from '../components/medication/MedicationForm';
import MedicationList from '../components/medication/MedicationList';
import Navbar from '../components/Navbar';
import { UserDataProps } from '../App';

const Dashboard = ({ user, setUser, meds, setMeds }: UserDataProps) => {
  useEffect(() => {
    (async function getUserData() {
      try {
        const userRes = await axios.get('/user', {
          headers: {
            token: localStorage.getItem('token') || ''
          }
        })
        const medRes = await axios.get('/medications', {
          headers: {
            token: localStorage.getItem('token') || ''
          }
        })
        setUser(userRes.data.user.username);
        setMeds(medRes.data.medications);
      }
      catch (err) {
        console.error(err);
      }
    })();
  }, [setUser, setMeds]);

  return (
    <>
      <Navbar />
      <section className='max-w-md mx-auto p-8'>
        <h1 className='font-bold mb-8 text-cyan-400 text-center text-xl'>{user}'s Medications</h1>
        <MedicationForm meds={meds} setMeds={setMeds} />
        <MedicationList meds={meds} setMeds={setMeds} />
      </section>
    </>
  )
}

export default Dashboard;