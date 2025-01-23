import { useNavigate } from 'react-router-dom';
import {Link} from  'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
      navigate('/register');
      
    }; 
    const handleNavigationL = () => {
        navigate('/login');
        
      };   
  return (
    
    <main>
       
  <div className="navbar  bg-blue-400 h-20 text-2xl">
  <div className="navbar-start">
    <div className="dropdown">
    
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow h-9">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <Link
          to="/" className="btn btn-ghost text-4xl font-light ">KANTAN NA NIHONGO</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link
          to="/" className="text-2xl">Home</Link></li>
      <li>
        <details>
          <summary className="text-2xl">Basics</summary>
          <ul className="p-2">
            <li><Link
          to="/phrases" className="text-2xl">Phrases</Link></li>
            <li><summary className="text-2xl">Scripts</summary></li>
            <ul className="p-2">
                <li><Link to="/hiragana" className="text-2xl">Hiragana</Link></li>
                <li><Link to="/katakana" className="text-2xl">Katakana</Link></li>
                <li><Link to="/kanji" className="text-2xl">Kanji</Link></li>
            </ul>
          </ul>
        </details>
      </li>
      <li><Link to="/resources" className="text-2xl">Resources</Link></li>
      <li><a className="text-2xl">Flashcard</a></li>
      <li><a className="text-2xl">Quiz</a></li>
      <li><a className="text-2xl">Book a Translator</a></li>
      <li><details>
          <summary className="text-2xl">More</summary>
          <ul className="p-2">
            <li><Link to="translate/" className="text-2xl">Translation</Link></li>
            <li><Link to="/transcripton-audio" className="text-2xl">Transcription</Link></li>
            <li><Link to="text-to-speech/" className="text-2xl">Text-Audio</Link></li>
            <li><Link to="/chatbot" className="text-2xl">Robot Friend</Link></li>
            <li><a className="text-2xl">Summarization</a></li>
          </ul>
        </details></li>
    </ul>
  </div>
  <div className="navbar-end">
  
   
   <button onClick={handleNavigation} className="btn btn-outline btn-primary text-2xl">Sign Up</button>
   
    <button onClick={handleNavigationL} className="btn btn-outline btn-primary text-2xl">Sign In</button>
  
  
  </div>
</div> 

    </main>
  )
}

export default Navbar
