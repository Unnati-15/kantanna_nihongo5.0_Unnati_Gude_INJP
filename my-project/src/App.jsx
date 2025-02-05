import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import MainPage from "./components/MainPage";
import MainNavbar from "./components/MainNavbar";
import LearnerRegistration from "./components/LearnerRegistration";
import UserLogin from "./components/UserLogin";
import UserLogout from "./components/UserLogout";
import BeginnerPages from "./components/BeginnerPages";
import AdvancedPages from "./components/AdvancedPages";
import Phrases from "./components/Phrases";
const App = () => {
  const [token, setToken] = useState('');
  const [skillLevel, setSkillLevel] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedSkillLevel = localStorage.getItem('skill_level');

    if (storedToken && storedSkillLevel) {
      setToken(storedToken);
      setSkillLevel(storedSkillLevel);
    }
  }, []);

  return (
    <Router>
      <MainApp token={token} skillLevel={skillLevel} setToken={setToken} />
    </Router>
  );
};

// MainApp: The part of the app where routing happens

const MainApp = ({ token, skillLevel, setToken }) => {
  const location = useLocation(); // This will now work because it's inside Router
  const showMainNavbar = !['/beginner-pages', '/advanced-pages','/phrases'].includes(location.pathname);

  return (
    <>
      {showMainNavbar && <MainNavbar />}
      <Routes>
        <Route path="/login" element={<UserLogin setToken={setToken} />} />
        <Route path="/register" element={<LearnerRegistration />} />
        <Route path="/logout" element={<UserLogout setToken={setToken}  />} />
        
        {/* Protecting the /beginner-pages route */}
        <Route
          path="/beginner-pages"
          element={token ? (skillLevel === 'beginner' ? <BeginnerPages /> : <MainPage />) : <Navigate to="/login" />}
        />

        {/* Protecting the /advanced-pages route */}
        <Route
          path="/advanced-pages"
          element={token ? (skillLevel === 'advanced' ? <AdvancedPages /> : <MainPage />) : <Navigate to="/login" />}
        />
        
        {/* Protecting the /phrases route */}
        <Route
          path="/phrases"
          element={token ? (skillLevel === 'beginner' ? <Phrases/> : <BeginnerPages />) : <Navigate to="/login" />}
        />

        <Route path="/" element={<MainPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
