import axios from 'axios';
import { useRef } from 'react';
import { Medication, MasterMedListProps } from '../../types';

const MedicationList = ({ meds, setMeds }: MasterMedListProps) => {
  const takenStyles: string[] = ['bg-slate-300', 'border-transparent', 'hover:shadow-inner', 'text-white'];
  const notTakenStyles: string[] = ['border-slate-400', 'hover:shadow-lg']
  const medsRef = useRef<HTMLLIElement[] | null[]>([]);
  const toggleAdministered = async (med: Medication) => {
    try {
      const res = await axios.put(`/medication/${med._id}`, {}, {
        headers: {
          token: localStorage.getItem('token') || '',
        }
      });
      if (res.status === 200) {
        const { medications } = res.data;
        setMeds(medications);
      }
    } catch (err) {
      console.error(err);
    }
  };

  medsRef.current.map((ref, i) => meds[i].administered
    ? (ref?.classList.add(...takenStyles), ref?.classList.remove(...notTakenStyles))
    : (ref?.classList.remove(...takenStyles), ref?.classList.add(...notTakenStyles))
  )

  return (
    <ul>
      {meds.map((med, i) => (
         <li
          className='border cursor-pointer font-bold text-center mb-2 p-4 rounded-md'
          ref={e => medsRef.current[i] = e}
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