import React from 'react';
import { Link } from 'react-router-dom';

const imageArray = [
  'https://i.imgur.com/oCkEbrA.png',
  'https://i.imgur.com/FOeYt4E.png',
  'https://i.imgur.com/qIufhof.png',
  'https://i.imgur.com/Q2BAOd2.png',
  'https://i.imgur.com/DWO5Hzg.png',
  'https://i.imgur.com/QIxIKBH.png',
  'https://i.imgur.com/kZNTPqI.png',
  'https://i.imgur.com/O0DCcQy.png',
  'https://i.imgur.com/yW2W9SC.png',
  'https://i.imgur.com/hkRuanu.png',
];

const NotFoundPage = () => {
  const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500/30 to-pink-500/30">
      <div className="text-center space-y-6">
        <img src={randomImage} alt="Logo" className="w-32 h-32 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
