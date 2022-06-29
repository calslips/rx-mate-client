import React from 'react';
import axios from 'axios';

interface LoginProps {
  renderRegistration: () => void;
}

const Login = ({renderRegistration}: LoginProps) => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:8000/login', {
        username: username,
        password: password,
      });

      if (result.status === 200) {
        // if successful, save token
        const token = result.data.token;
        localStorage.setItem('token', token);
        // once login successful, redirect user to dashboard
        window.location.href = '/dashboard';
      } else {
        // do some validation (400 vs 401 error), logging / display error to user
        // (Invalid user / password display for user feedback, etc)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section style={{height: '300px'}}>
      <h1 className='font-bold text-center text-cyan-400 text-xl mb-5'>
        Login
      </h1>
      <form onSubmit={(e) => submitLogin(e)}>
        <div className='mb-5'>
          <label>Username</label>
          <input
            onChange={e => setUsername(e.target.value)}
            className='border border-slate-400 px-4 py-3 mt-2 rounded-md p-2 w-full'
            type="text"
            placeholder='username'
            autoComplete='on'
          />
        </div>
        <div className='mb-5'>
          <label>Password</label>
          <input
            onChange={e => setPassword(e.target.value)}
            className='border border-slate-400 px-4 py-3 mt-2 rounded-md p-2 w-full'
            type="password"
            placeholder='password'
            autoComplete='on'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p>
            Not a user? <span onClick={renderRegistration} className='cursor-pointer text-cyan-400 underline underline-offset-4'>Register!</span>
          </p>
          <button className='bg-cyan-400 font-bold px-8 py-3 rounded-md text-white'>
            Login
          </button>
        </div>
      </form>
    </section>
  )
};

export default Login;