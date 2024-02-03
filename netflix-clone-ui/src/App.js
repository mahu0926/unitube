import './App.css';
import './normalize.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Billboard from './components/Billboard';
import Titles from './components/Titles';
import Footer from './components/Footer';
import UploadPage from './components/Upload/UploadPage';
import LearnMorePage from './components/LearnMore/LearnMorePage';


function App() {
    return (
        <Router>
            <Navigation /> {/* Add the Navigation component here */}
            <Routes>
                <Route path="/" element={<><Billboard /><Titles /></>} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/learn-more" element={<LearnMorePage />} />
            </Routes>
            <Footer />
        </Router>
    );
}
  
export default App;
