import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { addInfoAPI } from '../../services/allAPIs'

const AddPanchayathInfo = () => {
    const [infoDetails, setInfoDetails] = useState({
        details: "",
        uploadedImages: []
    })
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
    console.log(infoDetails);


    const handleUpload = (e) => {

    const fileArray = infoDetails.uploadedImages
    fileArray.push(e.target.files[0])
    setInfoDetails({ ...infoDetails, uploadedImages: fileArray })

    const url = URL.createObjectURL(e.target.files[0])
    console.log(url);
    setPreview(url)

  }


    const handleSubmit = async () => {
        const { details, uploadedImages } = infoDetails

        if (!details || uploadedImages.length == 0) {
            toast.warning("Please fill all fields")
        } else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const reqBody = new FormData()

            for (let key in infoDetails) {
                if (key != 'uploadedImages') {
                    reqBody.append(key, infoDetails[key])
                } else {
                    infoDetails.uploadedImages.forEach((item) => {
                        reqBody.append("uploadedImages", item)
                    })
                }
            }

            const result = await addInfoAPI(reqBody,reqHeader)
            console.log(result);

            if (result.status == 401) {
                toast.warning(result.response.data)
                handleReset()
            } else if (result.status == 200) {
                toast.success("Info Added Succefully")
                handleReset()
            } else {
                toast.error("Something went wrong")
                handleReset()
            }

        }
    }

    const handleReset = () => {
    setInfoDetails({
        details: "",
        uploadedImages: []
    })
    setPreview("")
}

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)
        }
    }, [])

    return (
        <>
            <AdminHeader />
            <div className='grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-200'>
                    <AdminSidebar />
                </div>

                <div className='p-10'>
                    <div>
                        <h1 className='text-3xl shadow-xl mb-5'>Panchayath Details</h1>
                    </div>
                    <div className='p-5 flex flex-col justify-center items-center bg-gray-300 rounded'>

                        <div className='mb-3 flex justify-center items-center w-full mt-4'>
                            {!preview ?
                                <label htmlFor="imageFile">
                                    <input onChange={(e) => handleUpload(e)} type="file" id='imageFile' style={{ display: 'none' }} />
                                    <img src="https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png" alt="" style={{ width: '100px', height: '100px' }} />
                                </label>
                                :
                                <img src={preview} alt="" style={{ width: '100px', height: '100px' }} />
                            }
                        </div>

                        <div className='mt-8'>
                            <textarea value={infoDetails.details} onChange={(e) => setInfoDetails({ ...infoDetails, details: e.target.value })} name="panchayathdetails" id="details" rows={10} placeholder='Enter Details' className='bg-gray-50 w-200 p-3 rounded-2xl'></textarea>
                        </div>

                        <div className='ml-200'>
                            <button onClick={handleSubmit} type='button' className='bg-green-700 text-white p-3 rounded mt-4'>Add</button>
                        </div>

                    </div>

                </div>
            </div>
            <ToastContainer position='top-center' autoClose={2000} />
        </>
    )
}

export default AddPanchayathInfo