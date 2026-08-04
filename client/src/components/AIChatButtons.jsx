import { Bot } from 'lucide-react';
import React from 'react'

const AIChatButtons = ( {onclick} ) => {
  return (
    <button
    onClick={onclick}
    className='fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-50'>
    <Bot size={28} />
    </button>
  );
};

export default AIChatButtons;
