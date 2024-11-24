import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateSpacePage from './pages/CreateSpacePage';
import SelectionPage from './pages/SelectionPage';
import RatingPage from './pages/RatingPage';
import OverallResultsPage from './pages/OverallResultsPage';
import IndividualResultsPage from './pages/IndividualResultsPage';

function App() {
  return (
<div className="min-h-screen relative bg-gradient-to-br from-purple-500/30 to-pink-500/30 ">
    {/* Background container */}
    <div
        className="absolute inset-0"
        style={{
            backgroundImage:
                "url('https://gartic.io/static/images/new/textura.png')",
            backgroundRepeat: "repeat",
            opacity: 0.7,
        }}
    ></div>

    {/* Content container */}
    <div className="relative z-10">
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-space" element={<CreateSpacePage />} />
          <Route path="/select-action" element={<SelectionPage />} />
          <Route path="/rate" element={<RatingPage />} />
          <Route path="/results/overall" element={<OverallResultsPage />} />
          <Route path="/results/individual" element={<IndividualResultsPage />} />
        </Routes>
    </BrowserRouter>
    </div>
</div>
  );
}



export default App;