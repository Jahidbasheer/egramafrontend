import React, { useEffect, useState } from 'react'
import { getSchemeAPI } from '../../services/allAPIs'
import { serverURL } from '../../services/serverURL'

const Schemes = () => {
    const [schemes, setSchemes] = useState([])

    const getSchemes = async () => {
        const result = await getSchemeAPI()
        console.log(result.data);
        if (result.status == 200) {
            setSchemes(result.data)
        }
    }
    useEffect(() => {
        getSchemes()
    }, [])
    return (
        <div>
            <div className='bg-green-950 p-2 flex justify-between'>
                <h1 className='text-3xl text-white font-bold'>Kunnamangalam Gramapanchayth</h1>
            </div>

            <div className='mb-5'>
                <h1 className='text-3xl p-8 font-bold text-green-900 text-center shadow-xl'>SCHEMES</h1>
            </div>

            <div className='flex flex-col justify-center items-center p-10'>
                {schemes?.length > 0 ?
                    schemes?.map((item) => (
                        <div className='flex flex-col justify-center items-center bg-green-950 text-white w-300 p-10 m-10'>
                            {item?.uploadedImages.map((item)=>(
                                <img src={`${serverURL}/upload/${item}`} alt="" style={{ width: '800px', height: '500px' }} />
                            ))
                                }
                            <h1 className='text-3xl font-extrabold mt-8'>{item.title}</h1>
                            <p className='text-lg mt-5'>{item.description}</p>
                        </div>
                    ))

                    :
                    <h1>No Added Schemes</h1>}
            </div>
        </div>
    )
}

export default Schemes