import { useNavigate } from 'react-router-dom';

const Logout = () => {
  let navigate = useNavigate();
  return (
    <li className='cursor-pointer hover:text-white' onClick={() => {
      localStorage.removeItem('token');
      navigate('/', { replace: true });
    }}>Logout</li>
  )
}

export default Logout;