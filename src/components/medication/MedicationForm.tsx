import axios from 'axios';
import { useState } from 'react';
import { MasterMedListProps } from '../../types';

const MedicationForm = ({ meds, setMeds }: MasterMedListProps) => {
  const [medication, setMedication] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [dose, setDose] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);
  const [days, setDays] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);

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
        // if medication added succcessfully, modify state causing rerender
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
    <form onSubmit={e => addMedication(e)}>
      <fieldset className='border flex-col mb-10 p-4 rounded'>
        <legend className='font-bold'>Add Medication</legend>
        <div className='flex items-center mb-4'>
          <label htmlFor='medName' className='w-2/5'>Name:</label>
          <input
            className='border border-cyan-400 px-4 py-2 rounded-md w-3/4'
            id='medName'
            required
            type="text"
            value={medication}
            onChange={e => setMedication(e.target.value)}
          />
        </div>
        <div className='flex items-center mb-4'>
          <label htmlFor='medType' className='w-2/5'>Type:</label>
          <input
            className='border border-cyan-400 px-4 py-2 rounded-md w-3/4'
            id='medType'
            placeholder='e.g. pill, tablet, injection, etc.'
            type="text"
            value={type}
            onChange={e => setType(e.target.value)}
          />
        </div>
        <div className='flex items-center mb-4'>
          <label htmlFor='medDose' className='w-2/5'>Dose:</label>
          <input
            className='border border-cyan-400 px-4 py-2 rounded-md w-3/4'
            id='medDose'
            placeholder='e.g. 100 mg, 50 ml, etc.'
            type="text"
            value={dose}
            onChange={e => setDose(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between mb-4'>
          <label htmlFor='medAmount' className='w-2/5'>Amount:</label>
          <input
            className='border border-cyan-400 mr-5 p-2 rounded-md w-1/5'
            id='medAmount'
            max='100'
            min='1'
            type="number"
            value={amount}
            onChange={e => {
              if (times.length > amount) {
                setTimes(times.slice(0, amount));
              }
              setAmount(+e.target.value);
            }}
          />
          <label htmlFor='medDays' className='mr-4'>Day(s):</label>
          <select
            className='border border-cyan-400 rounded-md'
            name='days'
            id='medDays'
            multiple
            value={days}
            onChange={e => {
              if (e.target.value === 'none') {
                return setDays([]);
              } else if (e.target.value === 'everyday') {
                return setDays(e.target.innerText.toLowerCase().split('\n').filter((_, i) => i > 0 && i < 8));
              }
              days.includes(e.target.value)
                ? setDays(days.filter(d => d !== e.target.value))
                : setDays(days.concat(e.target.value))
            }}
          >
            <option value='none' className='hover:bg-cyan-400 hover:cursor-pointer'>
              None
            </option>
            <option value='sunday' className='hover:bg-cyan-400 hover:cursor-pointer'>
              Sunday
            </option>
            <option value='monday' className='hover:bg-cyan-400 hover:cursor-pointer'>
              Monday
            </option>
            <option value='tuesday' className='hover:bg-cyan-400 hover:cursor-pointer'>
              Tuesday
            </option>
            <option value='wednesday' className='hover:bg-cyan-400 hover:cursor-pointer'>
              Wednesday
            </option>
            <option value='thursday' className='hover:bg-cyan-400 hover:cursor-pointer'>
              Thursday
            </option>
            <option value='friday' className='hover:bg-cyan-400 hover:cursor-pointer'>
              Friday
            </option>
            <option value='saturday' className='hover:bg-cyan-400 hover:cursor-pointer'>
              Saturday
            </option>
            <option value='everyday' className='hover:bg-cyan-400 hover:cursor-pointer'>
              Everyday
            </option>
          </select>
        </div>
        {Array.from({length: amount}, (_, i) =>
          <div className='flex items-center mb-4' key={i}>
            <label htmlFor='medTime' className='w-2/5'>Time {i + 1}:</label>
            <input
              className='border border-cyan-400 px-4 py-2 rounded-md w-3/4'
              id='medTime'
              required
              type="time"
              value={times[i] || ''}
              onChange={e =>
                setTimes([...Array(amount)].map((_, j) => i === j ? e.target.value : times[j]))
              }
            />
          </div>
        )}
        <div className='flex justify-end'>
        <input
          className='bg-cyan-400 cursor-pointer hover:text-white px-4 py-2 rounded-md'
          type='submit'
          value='Add'
        />
        </div>
      </fieldset>
    </form>
  )
}

export default MedicationForm;