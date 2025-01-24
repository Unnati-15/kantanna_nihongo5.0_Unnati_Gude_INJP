import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/logout')
      .then((response) => {
        setMessage(response.data.message);
        navigate('/login'); // Redirect to login page after logging out
      })
      .catch((error) => {
        console.error(error,message);
      });
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
