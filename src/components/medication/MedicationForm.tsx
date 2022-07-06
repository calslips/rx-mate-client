import axios from 'axios';
import { useState } from 'react';
import { MedListProps } from './MedicationList';

const MedicationForm = ({ meds, setMeds }: MedListProps) => {
  const [medication, setMedication] = useState<string>('');

  const addMedication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // validate user is submitting an actual med name
      if (medication.trim().length) {
        const res = await axios.post(
          '/medication',
          { name: medication },
          {
            headers: {
              token: localStorage.getItem('token') || '',
            },
          }
        );
        // if medication added succcessfully, reload dashboard to display
        if (res.status === 200) {
          setMeds([...meds, res.data.medication]);
          setMedication('');
        } // handle other status codes?
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className='flex mb-10' onSubmit={e => addMedication(e)}>
      <input
        className='border border-cyan-400 px-4 py-2 rounded-l-md w-full'
        type="text"
        value={medication}
        onChange={e => setMedication(e.target.value)}
      />
      <input
        className='bg-cyan-400 cursor-pointer hover:text-white px-4 py-2 rounded-r-md'
        type='submit'
        value='Add'
      />
    </form>
  )
}

export default MedicationForm;