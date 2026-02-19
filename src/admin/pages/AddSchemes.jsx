import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { addSchemeAPI, deleteSchemeAPI, getSchemeAPI } from '../../services/allAPIs'

const AddSchemes = () => {
  const [schemeDetails, setSchemeDetails] = useState({
    title: "",
    description: "",
    uploadedImages: []
  })
  const [schemes, setSchemes] = useState([])
  
      const getSchemes = async () => {
          const result = await getSchemeAPI()
          console.log(result.data);
          if (result.status == 200) {
              setSchemes(result.data)
          }
      }
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
   const[deleteStatus,setDeleteStatus]=useState("")
  console.log(schemeDetails);


  const handleUpload = (e) => {

    const fileArray = schemeDetails.uploadedImages
    fileArray.push(e.target.files[0])
    setSchemeDetails({ ...schemeDetails, uploadedImages: fileArray })

    const url = URL.createObjectURL(e.target.files[0])
    console.log(url);
    setPreview(url)

  }

  const handleReset = () => {
    setSchemeDetails({
      title: "",
      description: "",
      uploadedImages: []
    })
    setPreview('')
  }

  const handleSubmit = async() => {
    const { title, description, uploadedImages } = schemeDetails

    if (!title || !description || uploadedImages.length == 0) {
      toast.warning("Please fill all fields")
    } else {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const reqBody = new FormData()

      for (let key in schemeDetails) {
        if (key != 'uploadedImages') {
          reqBody.append(key, schemeDetails[key])
        } else {
          schemeDetails.uploadedImages.forEach((item) => {
            reqBody.append("uploadedImages", item)
          })
        }
      }

      const result =await addSchemeAPI(reqBody,reqHeader)
      console.log(result);

      if(result.status ==401){
                toast.warning(result.response.data)
                handleReset()
            }else if(result.status ==200){
                toast.success("Scheme Added Succefully")
                handleReset()
            }else{
                toast.error("Something went wrong")
                handleReset()
            }
      
    }
  }

  
      const deleteScheme=async(id)=>{
        const result =await deleteSchemeAPI(id)
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
    getSchemes()
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
            <h1 className='text-3xl shadow-xl mb-5 p-2'>ADD SCHEMES</h1>
          </div>

          <div className='flex justify-center'>
            <div className='bg-gray-200 p-8 rounded-2xl w-200 flex flex-col '>
              <div className='mb-8 flex justify-start items-center w-full mt-2'>
                {!preview ?
                  <label htmlFor="imageFile">
                    <input onChange={(e) => handleUpload(e)} type="file" id='imageFile' style={{ display: 'none' }} />
                    <img src="https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png" alt="" style={{ width: '100px', height: '100px' }} />
                  </label>
                  :
                  <img src={preview} alt="" style={{ width: '100px', height: '100px' }} />
                }
              </div>
              <input value={schemeDetails.title} onChange={(e) => setSchemeDetails({ ...schemeDetails, title: e.target.value })} type="text" placeholder='Name of Scheme' className='bg-white p-3 rounded-xl w-100 mb-5' />
              <textarea value={schemeDetails.description} onChange={(e) => setSchemeDetails({ ...schemeDetails, description: e.target.value })} name="complaint" rows={'6'} className='bg-white rounded-xl p-3' placeholder='Scheme Description'></textarea>
              <div className='flex justify-center'>
                <button type='button' onClick={handleSubmit} className='p-3 bg-green-700 w-20 mt-3 rounded-xl text-white'>ADD</button>
              </div>
            </div>
          </div>

          {/* added Scheme */}

          <div>
            <div className='mt-10'>
              <h1 className='text-3xl shadow-xl mb-5 p-2'>ADDED SCHEMES</h1>
            </div>

            <div>
              <table className='min-w-full  text-center mt-9 border-separate border-spacing-y-3'>
                <thead className='bg-gray-200'>
                  <tr>
                    <th className='p-2'>S.No</th>
                    <th>Name of Scheme</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {schemes?.length>0?
                  schemes?.map((item,index)=>(
                    <tr>
                    <td>{index+1}</td>
                    <td>{item.title} </td>
                    <td><button onClick={()=>deleteScheme(item?._id)}><FontAwesomeIcon icon={faTrash} className='text-red-600' /></button></td>
                  </tr>
                  ))
                  :
                  <h1>No schemes Added</h1>}

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

export default AddSchemes