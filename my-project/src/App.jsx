import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import HomePage from "./components/HomePage"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Phrases from "./components/Phrases";
import HiraganaLearning from "./components/HiraganaLearning";
import KatakanaLearning from "./components/KatakanaLearning";
import KanjiLearning from "./components/KanjiLearning";
import Resources from "./components/Resources";
import TranslateForm from "./components/TranslateForm";
import ChatBot from "./components/ChatBot";
import TranscriptionAudio from "./components/TranscriptionAudio";
import TextToSpeech from "./components/TextToSpeech";
import FlashCard from "./components/FlashCard";
import Logout from "./components/Logout";

const App = () => {
  return (
    <main>
     <Router>  {/* Wrap your app in Router */}
      <Navbar />  {/* Navbar appears on all pages */}
    
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/" element={<HomePage />} />  {/* Home page route */}
        <Route path="/register" element={<RegisterForm />} />  
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/phrases" element={<Phrases />} /> 
        <Route path="/hiragana" element={<HiraganaLearning/>}/>
        <Route path="/katakana" element={<KatakanaLearning/>}/>
        <Route path="/kanji" element={<KanjiLearning/>}/>
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/translate" element={<TranslateForm/>}/>
        <Route path="/chatbot" element={<ChatBot/>}/>
        <Route path="/transcripton-audio" element={<TranscriptionAudio/>}/>
        <Route path="/text-to-speech" element={<TextToSpeech/>}/>
        <Route path="/flashcard" element={<FlashCard/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
      
      <Footer />  {/* Footer appears on all pages */}
    </Router>
    </main>
  )
}

export default App
