import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

const LandingPage = () => {
  return (
    <div>
        <div className='bg-green-950 p-2 flex justify-between'>
            <h1 className='text-3xl text-white font-bold'>Kunnamangalam Gramapanchayth</h1>
            <Link to={'/login'}><button className='p-2 rounded-2xl w-25 bg-white text-green-950 hover:bg-green-950 hover:text-white hover:border hover:border-white'>Logout</button></Link>
        </div>
        
       <div className='md:grid grid-cols-[1fr_4fr] md;p-10 '>

            <div className='h-dvh bg-white flex flex-col items-center'>
                <img className='mt-7' src="https://cdn-icons-png.freepik.com/512/3177/3177440.png" alt="" style={{width:'100px',height:"100px"}}/>
                <h1 className='mt-4  text-2xl'>Username</h1>
                <h2 className='text-red-500'>House No:Kp 22/524</h2>
            </div>

           <div className='md:grid grid-cols-1 w-full pt-5 bg-gray-300 pb-20 '>
                <div className='flex justify-evenly items-center flex-wrap'>
        
                    <div className='flex flex-col justify-center items-center p-5 bg-gray-100 w-70 rounded-3xl h-80 mt-5 mx-3'>
                        <img src="https://cdn-icons-png.flaticon.com/512/5230/5230380.png" alt="Bills" style={{width:'100px',height:'100px'}} />
                        <h1 className='text-2xl text-black mt-5'>Bills</h1>
                        <Link to={'/bills'}><FontAwesomeIcon icon={faArrowRight} style={{color: "white",}}  className='bg-blue-600 p-3 rounded-4xl mt-6 px-7'/></Link>
                    </div>
        
                    <div className='flex flex-col justify-center items-center p-5 bg-gray-100 w-70 rounded-3xl h-80 mt-5 mx-3'>
                        <img src="https://cdn-icons-png.flaticon.com/512/3930/3930246.png" alt="Panchayath Info" style={{width:'100px',height:'100px'}} />
                        <h1 className='text-2xl text-black mt-5'>Gramapanchayath Info</h1>
                        <Link to={'/info'}><FontAwesomeIcon icon={faArrowRight} style={{color: "white",}}  className='bg-blue-600 p-3 rounded-4xl mt-6 px-7'/></Link>
                    </div>
        
                     <div className='flex flex-col justify-center items-center p-5 bg-gray-100 w-70 rounded-3xl h-80 mt-5 mx-3'>
                        <img src="https://cdn-icons-png.flaticon.com/512/7803/7803013.png" alt="Notice" style={{width:'100px',height:'100px'}} />
                        <h1 className='text-2xl text-black mt-5'>Notice</h1>
                        <Link to={'/notice'}><FontAwesomeIcon icon={faArrowRight} style={{color: "white",}}  className='bg-blue-600 p-3 rounded-4xl mt-6 px-7'/></Link>
                    </div>
        
                     <div className='flex flex-col justify-center items-center p-5 bg-gray-100 w-70 rounded-3xl h-80 mt-5 mx-3'>
                        <img src="https://cdn-icons-png.flaticon.com/512/1375/1375106.png" alt="Gallery" style={{width:'100px',height:'100px'}} />
                        <h1 className='text-2xl text-black mt-5'>Gallery</h1>
                        <Link to={'/gallery'}><FontAwesomeIcon icon={faArrowRight} style={{color: "white",}}  className='bg-blue-600 p-3 rounded-4xl mt-6 px-7'/></Link>
                    </div>
                    <div className='flex flex-col justify-center items-center p-5 bg-gray-100 w-70 rounded-3xl h-80 mt-7 mx-3'>
                        <img src="https://cdn-icons-png.flaticon.com/512/5640/5640021.png" alt="Scheme" style={{width:'100px',height:'100px'}} />
                        <h1 className='text-2xl text-black mt-5'>Schemes</h1>
                        <Link to={'/schemes'}><FontAwesomeIcon icon={faArrowRight} style={{color: "white",}}  className='bg-blue-600 p-3 rounded-4xl mt-6 px-7'/></Link>
                    </div>
        
                    <div className='flex flex-col justify-center items-center p-5 bg-gray-100 w-70 rounded-3xl h-80 mt-7 mx-3'>
                        <img src="https://cdn-icons-png.flaticon.com/512/10295/10295650.png" alt="Complaint" style={{width:'100px',height:'100px'}} />
                        <h1 className='text-2xl text-black mt-5'>Complaints</h1>
                        <Link to={'/complaints'}><FontAwesomeIcon icon={faArrowRight} style={{color: "white",}}  className='bg-blue-600 p-3 rounded-4xl mt-6 px-7'/></Link>
                    </div>
        
                </div>
           </div>
       </div>

        <Footer/>
       
    </div>
  )
}

export default LandingPage