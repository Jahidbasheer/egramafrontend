import React, { useEffect, useState } from 'react'
import { getInfoAPI } from '../../services/allAPIs'
import { serverURL } from '../../services/serverURL'

const PanchayathInfo = () => {
  const [info, setInfo] = useState([])
  const getInfo = async () => {
    const result = await getInfoAPI()
    console.log(result.data);
    if (result.status == 200) {
      setInfo(result.data)
    }
  }
  useEffect(() => {
    getInfo()
  }, [])
  return (
    <div>
      <div className='bg-green-950 p-2 flex justify-between'>
        <h1 className='text-3xl text-white font-bold'>Kunnamangalam Gramapanchayth</h1>
      </div>

      <div>
        <h1 className='text-3xl p-8 font-bold text-green-900 text-center shadow-xl'>PANCHAYATH INFO</h1>
      </div>

      {info?.map((item) => (
        <div className='flex flex-col justify-center items-center mt-8'>
          {item?.uploadedImages.map((item) => (
            <img src={`${serverURL}/upload/${item}`} alt="" style={{ width: '800px', height: '500px' }} />
          ))
          }
          <p className='p-20 text-2xl'>{item.details}</p>

        </div>
      ))
      }
    </div>
  )
}

export default PanchayathInfo