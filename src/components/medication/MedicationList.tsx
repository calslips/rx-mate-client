import axios from 'axios';

export interface Medication {
  _id: string;
  name: string;
  administered: boolean;
}

export interface MedListProps {
  meds: Medication[];
  setMeds: (meds: Medication[]) => void;
}

const MedicationList = ({ meds, setMeds }: MedListProps) => {
  const toggleAdministered = async (med: Medication) => {
    try {
      const res = await axios.put(`/medication/${med._id}`, {}, {
        headers: {
          token: localStorage.getItem('token') || '',
        }
      });
      if (res.status === 200) {
        let {medication} = res.data;
        setMeds(meds.filter(med => med._id !== medication._id));
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ul>
      {meds.filter(med => !med.administered).map((med) => (
        <li
          className='border border-slate-400 flex items-center justify-between mb-2 p-4 rounded-md'
          key={med._id}
        >
          {med.name}
          <input
            className='bg-cyan-400 cursor-pointer hover:text-white px-4 py-2 rounded-md'
            type='button'
            value='Taken'
            onClick={() => {toggleAdministered(med)}}
          />
        </li>
      ))}
    </ul>
  )
}

export default MedicationList;