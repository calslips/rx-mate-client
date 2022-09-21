import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/entry/Login';
import Registration from '../components/entry/Registration';

const Landing = () => {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  return (
    token
      ? <Navigate to='/dashboard' replace />
      : <div className='flex w-full h-screen'>
          <div className='w-1/3 bg-sky-500'></div>
          <div className='w-2/3 relative max-w-xs mx-auto'>
            <div className='hover:rotate-45 text-center'>
              <img className='mx-auto mt-10' src="logo.png" alt="half yellow, half red medication capsule emoji" />
              <h2>
                <span className='bg-sky-500 font-bold py-1 px-2 rounded text-white'>RxMate</span>
              </h2>
            </div>
            <div className='inset-0 m-auto' style={{height: '300px'}}>
              {( isNewUser && <Registration renderLogin={() => setIsNewUser(false)} /> ) || <Login renderRegistration={() => setIsNewUser(true)} />}
            </div>
          </div>
       </div>
  )
}

export default Landing;