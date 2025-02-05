
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
const UserLogout = () => {
const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
      // Check if the token is present in localStorage and retrieve the username
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername); // Set username from localStorage
      }
     }, []);
     console.log(username);
    const handleLogout = () => {
        // Clear the localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('skill_level');
        localStorage.removeItem('role');

        // Redirect to the login page
        navigate('/login'); // Replace '/login' with the actual route for your login page
    };

    return (
        
        <div tabIndex={0} role="button" onClick={handleLogout} className="btn btn-ghost text-2xl hover:bg-white hover:text-yellow-500 transition-all mr-4">Logout</div>
    );
    };


export default UserLogout;
