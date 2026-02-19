import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { loginAPI } from '../services/allAPIs'

const Auth = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleLogin = async()=>{
    const {email,password}=userDetails
    if(!email || !password){
      toast.info("Please fill the form..")
    }else{
      const result =await loginAPI({email,password})
      console.log(result);

      if(result.status==200){
        toast.success("Login Successful...")
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)

        setTimeout(()=>{
          if(result.data.existingUser.email == "admin@gmail.com"){
          navigate("/adminhome")
        }else{
          navigate("/landing")
        }
        },2500)
      }else{
        toast.error("Invalid Credentials!!")
      }
      
    }
  }
    return (
    <>
      <div className='flex justify-center items-center ' id='homebg'>
        <div className='bg-green-900 w-100 rounded-xl p-5 text-white mt-30 mb-50'>
          
          <div className='flex flex-col justify-center items-center pt-5'>
            <h1 className='text-white text-2xl mb-2'>Kunnamangalam Grampanchayth</h1>
            <img src="src/assets/egramalogo.png" alt="logo" className='rounded-4xl' style={{width:'100px',height:'100px'}}/>
            <h2 className='mt-3'>Resident Login</h2>
            <h3 className='p-3 underline underline-offset-9'>Sign In</h3>
          </div>

          <div className='flex flex-col justify-center items-center mt-3 pb-20'>
            <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder='Email Address' className='text-black bg-white rounded p-2 placeholder:text-gray-400 mb-3 w-60'/>
            <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder='Password' className='text-black bg-white rounded p-2 placeholder:text-gray-400 w-60'/>
            <button onClick={handleLogin} type='button' className='bg-white text-blue-500 p-2 rounded w-25 mt-5'>Sign In</button>
            <h2 className='mt-4 '>Forgot Password?</h2>
          </div>

        </div>
      </div>
      <ToastContainer position='top-center' autoClose={2000} />
    </>
  )
}

export default Auth