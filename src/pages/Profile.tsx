import Navbar from "../components/Navbar";
import { UserDataProps } from '../App';
import MedicationForm from "../components/medication/MedicationForm";
import MasterMedList from "../components/medication/MasterMedList";

const Profile = ({ user, meds, setMeds }: UserDataProps) => {
  return (
    <>
      <Navbar />
      <section className='max-w-lg mx-auto p-8'>
        <h1 className='font-bold mb-8 text-cyan-400 text-center text-xl'>{user}'s Profile</h1>
        <MedicationForm meds={meds} setMeds={setMeds} />
        <MasterMedList meds={meds} setMeds={setMeds} />
      </section>
    </>
  );
};

export default Profile;