import 'react';
import { Link } from 'react-router-dom';
import UserLogout from './UserLogout';
import { useState,useEffect } from 'react';
const BeginnerNavbar = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
      // Check if the token is present in localStorage and retrieve the username
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername); // Set username from localStorage
      }
     }, []);
     console.log(username);
  return (
    <div className=''>
      <div className="navbar bg-gradient-to-r size-500 h-40 from-blue-300 to-blue-500 shadow-lg text-white rounded-b-lg">
        <div className="flex-1">
           <Link to="/home" className="btn btn-ghost text-6xl font-semibold hover:text-yellow-500 transition-all font-mono">Kantanna Nihongo</Link>
        </div>
        
        <div className="flex-none">
        <Link to="/home"> <button className="btn btn-ghost text-2xl hover:bg-white hover:text-yellow-500 transition-all mr-4">
            Home
          </button></Link>  
          <button>{username}</button>
          <Link to="/translate">  <button className="btn btn-ghost text-2xl hover:bg-white hover:text-yellow-500 transition-all mr-4">
            Translation
          </button></Link>  
       <Link to="/phrases"> <button className="btn btn-ghost text-2xl hover:bg-white hover:text-yellow-500 transition-all">
            Phrases
          </button></Link>   
          <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-ghost text-2xl hover:bg-white hover:text-yellow-500 transition-all mr-4">Learn Japanese</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box ">
            <li><Link to="/hiragana"> <button className="btn text-xl border-t-cyan-600">
            Hiragana
          </button></Link>  </li>
          <li><Link to="/katakana"> <button className="btn text-xl border-t-cyan-600">
            Katakana
          </button></Link>  </li>
          <li> <Link to="/kanji"> <button className="btn text-xl border-t-cyan-600">
            Kanji
          </button></Link>  </li>
  </ul>
</div>
        </div>
        <UserLogout/>
      </div>
    </div>
  )
}

export default BeginnerNavbar
