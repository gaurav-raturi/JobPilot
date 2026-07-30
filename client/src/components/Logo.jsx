import React from 'react'

const Logo = ({ size = 'lg' }) => {

    const sizes = {
        
        sm : 'w-14 h-14 text-xl',
        lg : 'w-16 h-16 text-2xl',
    };

  return (

    <div className='flex justify-center'>
        <div className= {`${sizes[size]} rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 flex items-center justify-center shadow-l`}>
            <span className='text-white font-bold'>
                JP
            </span>
        </div>
    </div>
  )
}

export default Logo;
