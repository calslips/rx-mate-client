import Navbar from "../components/Navbar";
import { UserDataProps } from '../App';

const Profile = ({ user }: UserDataProps) => {
  return (
    <>
      <Navbar />
      <section className='max-w-lg mx-auto p-8'>
        <h1 className='font-bold mb-8 text-cyan-400 text-center text-xl'>{user}'s Profile</h1>
      </section>
    </>
  );
};

export default Profile;