import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast, ToastContainer } from 'react-toastify'
import { adminProfileUpdateAPI } from '../../services/allAPIs'

const AdminSettings = () => {
    const [adminDetails, setAdminDetails] = useState({
        email:"",
        username: "",
        password: "",
        cPassword: ""
    })
    const [token, setToken] = useState("")
    const [updateStatus,setUpdateStatus]=useState({})

    const handleReset = () => {
        setAdminDetails({
            username: "",
            password: "",
            cPassword: ""
        })
    }

    const handleUpdate = async () => {
        const { email,username, password, cPassword } = adminDetails
        if (!username || !password || !cPassword) {
            toast.info("Please Enter Details")
        } else {
            if (password != cPassword) {
                toast.warning("Passwords Must Match")
            } else {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                const reqBody = {email, username, password }
                console.log(reqBody);
                
                const result = await adminProfileUpdateAPI(reqBody, reqHeader)
                console.log(result.data);
                if(result.status==200){
                    toast.success("Profile Updated Successfully")
                    sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                    setUpdateStatus(result.data)
                }else{
                    toast.error("Something went wrong")
                    setUpdateStatus({})
                }
            }
        }
    }
     useEffect(() => {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token')
            setToken(token)
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            console.log(user);
            
            setAdminDetails({email:user.email, username: user.username, password: user.password, cPassword: user.password })
        }
    }, [updateStatus])

    return (
        <>
            <AdminHeader />
            <div className='grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-200'>
                    <AdminSidebar />
                </div>
                <div className='bg-gray-950 '>
                    <h1 className='text-3xl text-center text-white mt-6'>Settings</h1>
                    <div className='flex justify-center items-center mt-5 p-20'>
                        
                        <div className='mx-3'>
                            <div className='bg-green-200 flex flex-col justify-center items-center p-10 rounded'>

                                <div className='mt-3'>
                                    <div>
                                        <h1 className='text-4xl text-center mb-15'>Edit Profile</h1>
                                    </div>

                                    <div className='mb-3'>
                                        <input value={adminDetails.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" placeholder='Username' className='p-2 bg-white rounded placeholder-gray-400 w-100' />
                                    </div>
                                    <div className='mb-3'>
                                        <input value={adminDetails.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} type="text" placeholder='Password' className='p-2 bg-white rounded placeholder-gray-400 w-100' />
                                    </div>
                                    <div className='mb-3'>
                                        <input value={adminDetails.cPassword} onChange={(e) => setAdminDetails({ ...adminDetails, cPassword: e.target.value })} type="text" placeholder='Confirm Password' className='p-2 bg-white rounded placeholder-gray-400 w-100' />
                                    </div>
                                </div>

                                <div className='flex justify-center items-center mb-8 mt-5'>
                                    <button onClick={handleReset} type='button' className='px-3 py-2 bg-red-400 rounded me-2 w-50'>Reset</button>
                                    <button onClick={handleUpdate} type='button' className='px-3 py-2 bg-green-500 rounded w-50'>Update</button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position='top-center' autoClose={2000} />
            <Footer />
        </>
    )
}

export default AdminSettings