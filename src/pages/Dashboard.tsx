import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    (async function getUserData() {
      try {
        const result = await axios.get('/user', {
          headers: {
            token: localStorage.getItem('token') || ''
          }
        })
        console.log(result);
        setUser(result.data.user.username);
      }
      catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div>{user}'s Dashboard</div>
    </>
  )
}

export default Dashboard;