import React from 'react'

const Preloader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='md:grid grid-cols-3'>
        <div></div>
        <div className='flex justify-center items-center flex-col p-5 md:p-0'>
          <img height={'200px'} width={'200px'} src='src/assets/preloadimage.gif' alt="Pzge Not Found" />
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Preloader