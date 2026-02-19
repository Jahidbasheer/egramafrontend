import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Header = () => {
  return (
    <>
       <div className='flex justify-between'>
              <div className='flex  justify-center items-center'>
                  <img src="src/assets/egrama.png" alt="logo" style={{width:'130px',height:'130px'}}/>
              </div>
              <div className='flex justify-center items-center'>
                <h1 className='text-green-600 text-4xl'>E-GRAMA</h1>
              </div>
             
              <div className='md:flex justify-end items-center hidden'>
                  <FontAwesomeIcon icon={faInstagram} className='me-3' />
                  <FontAwesomeIcon icon={faXTwitter} className='me-3 ' />
                  <FontAwesomeIcon icon={faFacebookF} className='me-3 ' />
              </div>
          </div>
    </>
  )
}

export default Header