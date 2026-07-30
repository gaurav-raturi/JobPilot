import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6'>
        <h1 className='text-8xl font-bold text-blue-600'>
            404
        </h1>

        <h2 className='text-8xl font-bold text-blue-600'>
            Page Not Found
        </h2>

        <p className='mt-2 text-gray-600'>
            The page you're looking for doesn't exist.
        </p>

        <button
        onClick={() => navigate('/dashboard')}
        className='mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition'>
            Go to Dashboard
        </button>
      
    </div>
  );
};

export default NotFound;
