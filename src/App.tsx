import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Statistics from './components/Statistics';
import Education from './components/Education';
import API from './components/API';
import Footer from './components/Footer';
import URLScanning from './pages/URLScanning';
import ThreatIntelligencePage from './pages/ThreatIntelligence';
import APIAccess from './pages/APIAccess';
import EnterpriseSolutions from './pages/EnterpriseSolutions';
import SecurityConsulting from './pages/SecurityConsulting';

const HomePage = () => (
  <>
    <Hero />
    <Features />
    <HowItWorks />
    <Statistics />
    <Education />
    <API />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scanner" element={<URLScanning />} />
          <Route path="/threat-intelligence" element={<ThreatIntelligencePage />} />
          <Route path="/api" element={<APIAccess />} />
          <Route path="/enterprise" element={<EnterpriseSolutions />} />
          <Route path="/consulting" element={<SecurityConsulting />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;