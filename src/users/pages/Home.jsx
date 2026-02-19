import React from 'react'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

const Home = () => {
  return (
    <>
     <div id='homebg'>
       <div className='flex justify-between'>
              <div className='flex  justify-center items-center'>
                  <img src="src/assets/egrama.png" alt="logo" style={{width:'130px',height:'130px'}}/>
              </div>
              <div className='flex justify-center items-center'>
                <h1 className='text-green-600 text-4xl'>E-GRAMA</h1>
              </div>
             
              <div className='md:flex justify-end items-center hidden'>
                  <FontAwesomeIcon icon={faInstagram} className='me-3 text-white' />
                  <FontAwesomeIcon icon={faXTwitter} className='me-3 text-white' />
                  <FontAwesomeIcon icon={faFacebookF} className='me-3 text-white' />
              </div>
          </div>
          <div className='flex justify-center items-center flex-col pb-87 pt-50'>
            <h1 className='text-5xl mb-8 text-white'>Select Your Panchayath</h1>
              <select name="" id="wardSelect" className='border w-200 rounded-xl p-3 mb-5 bg-white'>
                  <option value="">Select Panchayath</option>
                  <option value="1">Kunnamangalam</option>
              </select>
              <Link to={'/login'}><button type='button' className='p-2  w-25 rounded bg-green-700 text-white hover:border-green-700 hover:text-green-700 hover:bg-white hover:border'>Next</button></Link>
          </div>
     </div>
    <Footer/>
    </>
  )
}

export default Home