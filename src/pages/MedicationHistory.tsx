import Navbar from "../components/Navbar";
import { HistoryData } from '../types';
import Calendar from '../components/Calendar';

const MedicationHistory = ({ user, events }: HistoryData) => {

  return (
    <>
      <Navbar />
      <section className='max-w-3xl mx-auto'>
        <h1 className='font-bold my-8 text-sky-500 text-center text-xl'>{user}'s History</h1>
        <Calendar
          events={events}
        />
      </section>
    </>
  );
};

export default MedicationHistory;