import React from 'react';

interface LoginProps {
  renderRegistration: () => void;
}

const Login = ({renderRegistration}: LoginProps) => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  return (
    <section style={{height: '300px'}}>
      <h1 className='font-bold text-center text-cyan-400 text-xl mb-5'>
        Login
      </h1>
      <form>
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