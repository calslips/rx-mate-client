import React from 'react';
import axios from 'axios';

interface RegistrationProps {
  renderLogin: () => void;
}

const Registration = ({renderLogin}: RegistrationProps) => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmCredentials, setConfirmCredentials] = React.useState<string>('');
  const [disableBtn, setDisableBtn] = React.useState<boolean>(false);

  const submitRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post('/registration', {
        username: username,
        password: password,
      });
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    password === confirmCredentials ? setDisableBtn(false) : setDisableBtn(true);
  }, [password, confirmCredentials]);

  return (
    <section style={{height: '300px'}}>
    <h1 className='font-bold text-center text-cyan-400 text-xl mb-5'>
      Registration
    </h1>
    <form onSubmit={e => submitRegistration(e)}>
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
      <div className='mb-5'>
        <label>Confirm Password</label>
        <input
          onChange={e => setConfirmCredentials(e.target.value)}
          className='border border-slate-400 px-4 py-3 mt-2 rounded-md p-2 w-full'
          type="password"
          placeholder='password'
          autoComplete='on'
        />
      </div>
      <div className='flex items-center justify-between'>
        <p>
          Already a user? <span onClick={renderLogin} className='cursor-pointer text-cyan-400 underline underline-offset-4'>Login!</span>
        </p>
        <button className={`font-bold px-8 py-3 rounded-md text-white ${disableBtn ? 'bg-slate-400' : 'bg-cyan-400'}`} disabled={disableBtn} >
          Register
        </button>
      </div>
    </form>
  </section>
  )
};

export default Registration;