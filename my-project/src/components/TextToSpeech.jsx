import  { useState } from 'react';
import axios from 'axios';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
   
        try {
            // Send POST request to Django API with JSON payload
    const response = await axios.post('http://localhost:8000/text-to-speech/', 
        { text },
        {
          headers: {
            'Content-Type': 'application/json',  // Make sure the Content-Type is set to application/json
          },
        }
      );
        
            // Get the audio file URL from the response
            const { audio_file_url } = response.data;
            setAudioUrl(audio_file_url);
        
          } catch (err) {
            setError('An error occurred while processing your request.');
            console.error('Error:', err);
          } finally {
            setLoading(false);
          }
  };

  return (
    <div>
      <h1>Text to Speech</h1>

      {/* Form to capture text input */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text here"
          rows="4"
          cols="50"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating Audio...' : 'Generate Audio'}
        </button>
      </form>

      {/* Display error if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display button to play audio if available */}
      {audioUrl && (
        <div>
          <p>Audio is ready! Click to play:</p>
          {/* <button onClick={handlePlayAudio}>Play Audio</button> */}
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
