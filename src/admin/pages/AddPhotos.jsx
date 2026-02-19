import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { addPhotosAPI, deletePhotoAPI, getPhotosAPI } from '../../services/allAPIs'

const AddPhotos = () => {
    const [galleryDetails, setGalleryDetails] = useState({
        title: "",
        date: "",
        uploadedImages: []
    })
    const [photos, setPhotos] = useState([])

    const getPhotos = async () => {
        const result = await getPhotosAPI()
        console.log(result.data);
        if (result.status == 200) {
            setPhotos(result.data)
        }
    }
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
    const[deleteStatus,setDeleteStatus]=useState("")
    console.log(galleryDetails);


    const handleUpload = (e) => {

        const fileArray = galleryDetails.uploadedImages
        fileArray.push(e.target.files[0])
        setGalleryDetails({ ...galleryDetails, uploadedImages: fileArray })

        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);
        setPreview(url)

    }

    const handleReset = () => {
        setGalleryDetails({
            title: "",
            date: "",
            uploadedImages: []
        })
        setPreview('')
    }

    const handleSubmit = async () => {
        const { title, date, uploadedImages } = galleryDetails

        if (!title || !date || uploadedImages.length == 0) {
            toast.warning("Please fill all fields")
        } else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const reqBody = new FormData()

            for (let key in galleryDetails) {
                if (key != 'uploadedImages') {
                    reqBody.append(key, galleryDetails[key])
                } else {
                    galleryDetails.uploadedImages.forEach((item) => {
                        reqBody.append("uploadedImages", item)
                    })
                }
            }

            const result = await addPhotosAPI(reqBody, reqHeader)
            console.log(result);

            if (result.status == 401) {
                toast.warning(result.response.data)
                handleReset()
            } else if (result.status == 200) {
                toast.success("Photo Added Succefully")
                handleReset()
            } else {
                toast.error("Something went wrong")
                handleReset()
            }

        }
    }
    
        const deletePhoto=async(id)=>{
          const result =await deletePhotoAPI(id)
          console.log(result);
          if(result.status==200){
            setDeleteStatus(result.data)
          }
          
        }


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)
        }
        getPhotos()
    }, [deleteStatus])

    return (
        <>
            <AdminHeader />
            <div className='grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-200'>
                    <AdminSidebar />
                </div>

                <div className='p-10'>
                    <div>
                        <h1 className='text-3xl shadow-xl mb-3'>ADD PHOTOS</h1>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='bg-gray-200 rounded w-100 flex flex-col justify-center items-center p-10 mt-8'>
                            <div className='mb-3 flex justify-center items-center w-full'>
                                {!preview ?
                                    <label htmlFor="imageFile">
                                        <input onChange={(e) => handleUpload(e)} type="file" id='imageFile' style={{ display: 'none' }} />
                                        <img src="https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png" alt="" style={{ width: '100px', height: '100px' }} />
                                    </label>
                                    :
                                    <img src={preview} alt="" style={{ width: '100px', height: '100px' }} />
                                }
                            </div>
                            <div className='mt-4 flex flex-col justify-center items-center'>
                                <input value={galleryDetails.title} onChange={(e) => setGalleryDetails({ ...galleryDetails, title: e.target.value })} type="text" placeholder='image title' className='bg-white rounded p-1 mb-3' />
                                <input value={galleryDetails.date} onChange={(e) => setGalleryDetails({ ...galleryDetails, date: e.target.value })} type="text" placeholder='date' className='bg-white rounded p-1' />
                            </div>
                            <div className='flex justify-center'>
                                <button type='button' onClick={handleSubmit} className='p-2 bg-green-700 w-20 mt-3 rounded-xl text-white'>ADD</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='mt-10'>
                            <h1 className='text-3xl shadow-xl mb-5 p-2'>ADDED PHOTOS</h1>
                        </div>

                        <div>
                            <table className='min-w-full  text-center mt-9 border-separate border-spacing-y-3'>
                                <thead className='bg-gray-200'>
                                    <tr>
                                        <th className='p-2'>S.No</th>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {photos?.length > 0 ?
                                        photos?.map((item, index) => (
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{item.title}</td>
                                                <td>{item.date}</td>
                                                <td><button onClick={()=>deletePhoto(item?._id)}><FontAwesomeIcon icon={faTrash} className='text-red-600' /></button></td>
                                            </tr>
                                        ))
                                        :
                                        <h1>No added Images</h1>}

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

export default AddPhotos