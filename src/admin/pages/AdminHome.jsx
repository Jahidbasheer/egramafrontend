import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBuildingCircleCheck, faCircleExclamation, faImages, faNoteSticky, faUser } from '@fortawesome/free-solid-svg-icons'

const AdminHome = () => {
  return (
    <>
        <AdminHeader/>
         <div className='grid grid-cols-[1fr_4fr]'>
            <div className='bg-blue-200'>
                <AdminSidebar/>
            </div>

            <div className='p-10'>
                <div className='md:grid grid-cols-3'>
                    
                    <div className='md:px-10 px-5 mb-7'>
                        <div className='bg-purple-900 p-4 flex rounded text-white h-30'>
                            <FontAwesomeIcon icon={faUser} className='fa-3x'/>
                            <div>
                                <h1 className='text-lg'>Total Number of Users</h1>
                                <h1 className='text-3xl'>100+</h1>
                            </div>
                        </div>
                    </div>

                    <div className='md:px-10 px-5 mb-7'>
                        <div className='bg-blue-900 p-4 flex rounded text-white h-30'>
                            <FontAwesomeIcon icon={faNoteSticky} className='fa-3x'/>
                            <div>
                                <h1 className='text-lg'>Total Number of Notice</h1>
                                <h1 className='text-3xl'>100+</h1>
                            </div>
                        </div>
                    </div>

                    <div className='md:px-10 px-5 mb-7'>
                        <div className='bg-green-900 p-4 flex rounded text-white h-30'>
                            <FontAwesomeIcon icon={faBuildingCircleCheck} className='fa-3x'/>
                            <div>
                                <h1 className='text-lg'>Total Number of Schemes</h1>
                                <h1 className='text-3xl'>100+</h1>
                            </div>
                        </div>
                    </div>

                    <div className='md:px-10 px-5 mb-7'>
                        <div className='bg-red-900 p-4 flex rounded text-white h-30'>
                            <FontAwesomeIcon icon={faCircleExclamation} className='fa-3x'/>
                            <div>
                                <h1 className='text-lg'>Total Number of Complaints</h1>
                                <h1 className='text-3xl'>100+</h1>
                            </div>
                        </div>
                    </div>

                    <div className='md:px-10 px-5 mb-7'>
                        <div className='bg-yellow-500 p-4 flex rounded text-white h-30'>
                            <FontAwesomeIcon icon={faImages} className='fa-3x'/>
                            <div>
                                <h1 className='text-lg'>Total Number of Photos</h1>
                                <h1 className='text-3xl'>100+</h1>
                            </div>
                        </div>
                    </div>

                    
                </div>

            </div>
        </div>
    </>
  )
}

export default AdminHome