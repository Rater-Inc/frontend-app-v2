import React from 'react';
import LandingPage from './components/LandingPage';

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
            transformOrigin: "center",
            width: "200%",
            height: "200%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(345deg)",
            opacity: 0.5, // Optional: adjust opacity as needed
        }}
    ></div>

    {/* Content container */}
    <div className="relative z-10">
        <LandingPage />
    </div>
</div>
  );
}



export default App;