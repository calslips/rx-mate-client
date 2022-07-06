import axios from 'axios';
import { useEffect, useState } from 'react';
import MedicationForm from '../components/medication/MedicationForm';
import MedicationList, { Medication } from '../components/medication/MedicationList';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [user, setUser] = useState<string>('');
  const [medications, setMedications] = useState<Medication[]>([]);

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
        setMedications(medRes.data.medications);
      }
      catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <section className='max-w-md mx-auto p-8'>
        <h1 className='font-bold mb-8 text-cyan-400 text-center text-xl'>{user}'s Medications</h1>
        <MedicationForm meds={medications} setMeds={setMedications} />
        <MedicationList meds={medications} setMeds={setMedications} />
      </section>
    </>
  )
}

export default Dashboard;