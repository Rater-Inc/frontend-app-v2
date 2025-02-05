import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    setRandomImage(imageArray[randomIndex]);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 max-w-md w-full mx-auto">
        <div className="flex flex-col items-center">
          <img 
            src={randomImage} 
            alt="404 Not Found" 
            className="w-48 h-48 sm:w-64 sm:h-64 object-contain mb-4 sm:mb-6"
          />
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-gray-800 text-center">
            404 - Page Not Found
          </h1>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-600 text-center px-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 min-w-[200px]"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 