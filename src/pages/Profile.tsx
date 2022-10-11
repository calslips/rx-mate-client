import Navbar from "../components/Navbar";
import { ProfileProps } from '../types';
import MedicationForm from "../components/medication/MedicationForm";
import MasterMedList from "../components/medication/MasterMedList";
import ToggleReminders from "../components/ToggleReminders";
import { getUserData } from './Dashboard';
import { useEffect } from "react";

const Profile = ({
  user,
  setUser,
  meds,
  setMeds,
  swRegistered,
  setSwRegistered
}: ProfileProps) => {
  useEffect(() => {
    getUserData(setUser, setMeds, setSwRegistered);
  }, [setUser, setMeds, setSwRegistered]);

  return (
    <>
      <Navbar />
      <section className='max-w-lg mx-auto py-8'>
        <h1 className='font-bold mb-8 text-sky-500 text-center text-xl'>{user}'s Profile</h1>
        <ToggleReminders swRegistered={swRegistered} setSwRegistered={setSwRegistered} />
        <MedicationForm meds={meds} setMeds={setMeds} />
        <MasterMedList meds={meds} setMeds={setMeds} />
      </section>
    </>
  );
};

export default Profile;