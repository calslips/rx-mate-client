import Logout from './entry/Logout';

const Navbar = () => {
  return (
    <nav className='bg-cyan-400 px-8 py-4'>
      <ul className='flex justify-between'>
        <li className='font-bold hover:text-white'>Rx Mate</li>
        <Logout />
      </ul>
    </nav>
  )
}

export default Navbar;