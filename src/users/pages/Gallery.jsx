import React, { useEffect, useState } from 'react'
import { getPhotosAPI } from '../../services/allAPIs'
import { serverURL } from '../../services/serverURL'
import { useParams } from 'react-router-dom'

const Gallery = () => {

    const [photos,setPhotos]=useState([])
    
        const getPhotos =async()=>{
            const result = await getPhotosAPI()
            console.log(result.data);
            if(result.status == 200){
                setPhotos(result.data)
            }
        }
        useEffect(()=>{
            getPhotos()
        },[])

  return (
    <div>
        <div className='bg-green-950 p-2 flex justify-between'>
            <h1 className='text-3xl text-white font-bold'>Kunnamangalam Gramapanchayth</h1>
        </div>

        <div>
            <h1 className='text-3xl p-8 font-bold text-green-900 text-center shadow-xl'>GALLERY</h1>
        </div>

        <div className='m-4 flex flex-wrap justify-center items-center'>

            {photos?.length>0?
            photos?.map((item)=>(
                <div className='flex flex-col justify-center items-center bg-gray-900 w-80 p-7 h-90 rounded-xl m-4'>
                {item?.uploadedImages.map((item)=>(
                <img src={`${serverURL}/upload/${item}`}
                 alt="" style={{width:'400px',height:'300px'}} />
                ))
                    }
                <div className='text-white mt-10 text-xl text-center'>
                    <h1>{item.title}</h1>
                    <h2>{item.date}</h2>
                </div>
            </div>
            ))
                :
            <h1>No Photos Added</h1>}

        </div>
    </div>
  )
}

export default Gallery