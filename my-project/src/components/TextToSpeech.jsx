
import  { useState } from 'react';
import axios from 'axios';

const TextToSpeech = () => { const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
      setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('myfile', file);

      axios.post('http://localhost:8000/text-to-speech/', formData)
          .then(response => {
              alert('Audio file is ready!',response);
          })
          .catch(error => {
              console.error('There was an error uploading the file!', error);
          });
  };

  return (
      <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
      </form>
  );
};

export default TextToSpeech;
