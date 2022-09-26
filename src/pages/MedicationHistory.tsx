import { useState } from 'react';
import Navbar from "../components/Navbar";
import { HistoryData } from '../types';
// import Calendar from '../components/Calendar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function isSameDay(a: Date, b: Date) {
  return a.toLocaleString().split('T')[0] === b.toLocaleString().split('T')[0];
}

// const datesToAddContentTo = [tomorrow, in3Days, in5Days];

// function tileContent({ date, view }) {
//   // Add class to tiles in month view only
//   if (view === 'month') {
//     // Check if a date React-Calendar wants to check is on the list of dates to add class to
//     if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
//       return 'My content';
//     }
//   }
// }

const MedicationHistory = ({ user, /*events*/ }: HistoryData) => {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue: Date) {
    setValue(nextValue);
  }
  console.log(value)

  return (
    <>
      <Navbar />
      <section className='max-w-3xl mx-auto'>
        <h1 className='font-bold my-8 text-sky-500 text-center text-xl'>{user}'s History</h1>
        <Calendar
          className={'mx-auto sm:w-screen'}
          calendarType={'US'}
          onChange={onChange}
          value={value}
          // tileContent={tileContent}
          // events={events}
        />
      </section>
    </>
  );
};

export default MedicationHistory;