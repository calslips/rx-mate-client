import axios from 'axios';
import { useEffect } from 'react';
import { Medication, MasterMedListProps } from './MasterMedList';

const MedicationList = ({ meds, setMeds }: MasterMedListProps) => {
  const toggleAdministered = async (med: Medication) => {
    try {
      const res = await axios.put(`/medication/${med._id}`, {}, {
        headers: {
          token: localStorage.getItem('token') || '',
        }
      });
      if (res.status === 200) {
        const { medication } = res.data;
        setMeds(meds.map(med => med._id === medication._id ? medication : med));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Array.from(
      document.querySelectorAll('.med'),
      (node, i) => {
        const cls = ['bg-slate-300', 'border-transparent', 'hover:shadow-none', 'shadow-inner', 'text-white'];
        return meds[i].administered
          ? node.classList.add(...cls)
          : node.classList.remove(...cls)
      }
    );
  }, [meds]);

  return (
    <ul>
      {meds.map(med => (
         <li
          className='med border border-slate-400 cursor-pointer font-bold hover:shadow-lg text-center mb-2 p-4 rounded-md'
          id={med._id}
          key={med._id}
          onClick={() => {toggleAdministered(med)}}
        >
          {med.name}
        </li>
      ))}
    </ul>
  )
}

export default MedicationList;