import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { addNoticeAPI, deleteNoticeAPI, getNoticeAPI } from '../../services/allAPIs'

const AddNotice = () => {
  const [noticeDetails,setNoticeDetails]=useState({
        title:"",
        subTitle:"",
        noticeBody:""
    })

    const [notices,setNotices]=useState([])
    const [token,setToken]=useState("")
    
    console.log(noticeDetails);

    const handleSubmit=async()=>{
      const {title , subTitle , noticeBody}=noticeDetails
      if(!title||!subTitle||!noticeBody){
        toast.warning("Please fill the fields!!!")
      }else{
        const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
        const reqBody ={
          title : noticeDetails.title,
          subTitle : noticeDetails.subTitle,
          noticeBody : noticeDetails.noticeBody
        }
          const result = await addNoticeAPI(reqBody,reqHeader)
          console.log(result);

          if(result.status ==401){
            toast.warning(result.response.data)
            setNoticeDetails({title:'',subTitle:'',noticeBody:''})
          }else if(result.status==200){
            toast.success("Notice added Succesfully")
            setNoticeDetails({title:'',subTitle:'',noticeBody:''})
          }else{
            toast.error("Something went wrong!!")
            setNoticeDetails({title:'',subTitle:'',noticeBody:''})
          }
          
      }
    }
    const[deleteStatus,setDeleteStatus]=useState("")
    const deleteNotice=async(id)=>{
      const result =await deleteNoticeAPI(id)
      console.log(result);
      if(result.status==200){
        setDeleteStatus(result.data)
      }
      
    }

    const getNotice =async()=>{
            const result = await getNoticeAPI()
            console.log(result.data);
            if(result.status == 200){
                setNotices(result.data)
            }
        }

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        const token =sessionStorage.getItem("token")
        setToken(token)
      }
      getNotice()
    },[deleteStatus])
    
  return (
    <>
      <AdminHeader />
      <div className='grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-200'>
          <AdminSidebar />
        </div>

        <div className='p-10'>
          <div>
            <h1 className='text-3xl shadow-xl mb-5 p-2'>ADD NOTICE</h1>
          </div>

          <div className='flex justify-center'>
            <div className='bg-gray-200 p-8 rounded-2xl w-200 flex flex-col '>
              <input value={noticeDetails.title} onChange={(e)=>setNoticeDetails({...noticeDetails,title:e.target.value})} type="text" placeholder='Title' className='bg-white p-3 rounded-xl w-100 mb-5' />
              <input value={noticeDetails.subTitle} onChange={(e)=>setNoticeDetails({...noticeDetails,subTitle:e.target.value})} type="text" placeholder='SubTitle' className='bg-white p-3 rounded-xl w-100 mb-5' />
              <textarea value={noticeDetails.noticeBody} onChange={(e)=>setNoticeDetails({...noticeDetails,noticeBody:e.target.value})} name="complaint" rows={'8'} className='bg-white rounded-xl p-3' placeholder='Notice Body'></textarea>
              <div className='flex justify-center'>
                <button onClick={handleSubmit} className='p-3 bg-green-700 w-20 mt-3 rounded-xl text-white'>ADD</button>
              </div>
            </div>
          </div>

          {/* added notice */}

          <div>
            <div className='mt-10'>
              <h1 className='text-3xl shadow-xl mb-5 p-2'>ADDED NOTICE</h1>
            </div>

            <div>
              <table className='min-w-full  text-center mt-9 border-separate border-spacing-y-3'>
                <thead className='bg-gray-200'>
                  <tr>
                    <th className='p-2'>S.No</th>
                    <th>Title</th>
                    <th>SubTitle</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                 {notices?.length>0?
                 notices?.map((item,index)=>(
                  <tr>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td>{item.subTitle}</td>
                    <td><button onClick={()=>deleteNotice(item?._id)}><FontAwesomeIcon icon={faTrash} className='text-red-600'/></button></td>
                  </tr>
                 ))
                  :
                  <h1>No Added Notices</h1>
                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer position='top-center' autoClose={2000} />
    </>
    
  )
}

export default AddNotice