import React, { useEffect, useState } from 'react'
import { getNoticeAPI } from '../../services/allAPIs'

const Notice = () => {

    const [notices,setNotices]=useState([])

    const getNotice =async()=>{
        const result = await getNoticeAPI()
        console.log(result.data);
        if(result.status == 200){
            setNotices(result.data)
        }
    }
    useEffect(()=>{
        getNotice()
    },[])
  return (
    <div>
        <div className='bg-green-950 p-2 flex justify-between'>
            <h1 className='text-3xl text-white font-bold'>Kunnamangalam Gramapanchayth</h1>
        </div>

        <div>
            <h1 className='text-3xl p-8 font-bold text-green-900 text-center shadow-xl mb-8'>NOTICES</h1>
        </div>

        <div className='flex flex-col justify-center items-center'>
            {notices?.length>0?
            notices?.map((item)=>(
                <div className='flex flex-col justify-center items-center w-200 p-8 border mb-4'>
                <h1 className='text-4xl'>{item.title}</h1>
                <h2 className='text-2xl'>{item.subTitle}</h2>
                <p>{item.noticeBody}</p>
            </div>
            ))  
            :
            <h1>No added notices</h1>
            }
        </div>

    </div>
  )
}

export default Notice


