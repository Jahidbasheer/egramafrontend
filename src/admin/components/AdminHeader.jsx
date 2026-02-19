import React from 'react'
import egrama from '../../assets/egrama.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
  return (
    <>
      <div className='flex justify-between px-20 h-20'>

        <div className='flex items-center'>
          <img src={egrama} alt="" style={{ width: '100px', height: '100px' }} />
          <h1 className='font-medium text-2xl text-green-800'>eGRAMA</h1>
        </div>

        <div className='mt-4'>
          <Link to={'/login'}><button className='px-3 py-2 border border-black rounded hover:bg-black hover:text-white'><FontAwesomeIcon icon={faPowerOff} className='me-3' />Logout</button></Link>
        </div>

      </div>

      <div>
        <h1 className='px-15 py-3 bg-green-950 text-white text-2xl'>Admin Dashboard</h1>
      </div>
    </>
  )
}

export default AdminHeader