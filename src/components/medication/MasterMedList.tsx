import axios from 'axios';
import { useRef } from 'react';
import { MasterMedListProps, Medication } from '../../types';

const MasterMedList = ({ meds, setMeds }: MasterMedListProps) => {
  const sortedMeds = [...meds].sort((a, b) => a.name.localeCompare(b.name));
  const medsRef = useRef<HTMLLIElement[] | null[]>([]);
  const removeFromList = async (medication: Medication) => {
    try {
      const res = await axios.delete(`/medication/${medication._id}`, {
        headers: {
          token: localStorage.getItem('token') || '',
        }
      });
      if (res.status === 204) {
        const newList = meds.filter(med => med._id !== medication._id);
        setMeds(newList);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const filterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    medsRef.current.map((ref, i) =>
      sortedMeds[i]?.name.toLowerCase().includes(e.target.value.toLowerCase())
        ? (ref?.classList.remove('hidden'))
        : (ref?.classList.add('hidden'))
    );
  };

  return (
    <section className='max-w-lg'>
      <h2 className='font-bold mb-10 text-center text-sky-500'>Medication List</h2>
      <div className='flex items-center justify-between pb-2'>
        <label className='font-bold' htmlFor="filter">Filter By Medication Name:</label>
        <input
          className='border border-sky-500 px-4 py-2 rounded-md w-1/2'
          id='filter'
          name='filter'
          type='text'
          onChange={e => {filterList(e)}}
        />
      </div>
      <ul>
        {sortedMeds.map((med, i) => (
          <li
            className='border border-slate-400 flex items-center justify-between mb-2 p-4 rounded-md'
            ref={e => medsRef.current[i] = e}
            key={med._id}
          >
            {med.time} {med.count} {med.name} {med.type} {med.dose}
            <input
              className='bg-red-400 cursor-pointer hover:text-white px-4 py-2 rounded-md'
              type='button'
              value='Remove'
              onClick={() => {removeFromList(med)}}
            />
          </li>
        ))}
      </ul>
    </section>
  )
};

export default MasterMedList;