import React from 'react';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="min-h-screen bg-[url('https://gartic.io/static/images/new/textura.png')] bg-repeat">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm" />
      <LandingPage />
    </div>
  );
}

export default App;