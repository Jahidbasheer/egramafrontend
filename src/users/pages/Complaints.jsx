import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { addComplaintAPI, deleteComplaintAPI, getComplaintAPI } from '../../services/allAPIs'
import { toast, ToastContainer } from 'react-toastify'

const Complaints = () => {
  const [complaintDetails, setComplaintDetails] = useState({
    name: "",
    subject: "",
    complaintBody: ""
  })
  const [deleteStatus, setDeleteStatus] = useState("")
  const [complaints, setComplaints] = useState([])
  const [token, setToken] = useState("")

  const getComplaint = async () => {
    const result = await getComplaintAPI()
    console.log(result.data);
    if (result.status == 200) {
      setComplaints(result.data)
    }
  }

  console.log(complaintDetails);

  const handleSubmit = async () => {
    const { name, subject, complaintBody } = complaintDetails
    if (!name || !subject || !complaintBody) {
      toast.warning("Please fill the fields!!!")
    } else {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const reqBody = {
        name: complaintDetails.name,
        subject: complaintDetails.subject,
        complaintBody: complaintDetails.complaintBody
      }
      const result = await addComplaintAPI(reqBody, reqHeader)
      console.log(result);

      if (result.status == 401) {
        toast.warning(result.response.data)
        setComplaintDetails({ name: '', subject: '', complaintBody: '' })
      } else if (result.status == 200) {
        toast.success(
          <>
            <div>Complaint Registered Successfully</div>
            <div>We will contact you soon</div>
          </>
        );
        setComplaintDetails({ name: '', subject: '', complaintBody: '' })
      } else {
        toast.error("Something went wrong!!")
        setComplaintDetails({ name: '', subject: '', complaintBody: '' })
      }

    }
  }


  // const deleteComplaint=async(id)=>{
  //   const result =await deleteComplaintAPI(id)
  //   console.log(result);
  //   if(result.status==200){
  //     setDeleteStatus(result.data)
  //   }

  // }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
    }
    getComplaint()
  }, [deleteStatus])
  return (
    <div>
      <div className='bg-green-950 p-2 flex justify-between'>
        <h1 className='text-3xl text-white font-bold'>Kunnamangalam Gramapanchayth</h1>
      </div>

      <div className='mb-10'>
        <h1 className='text-3xl p-8 font-bold text-green-900 text-center shadow-xl'>REGISTER COMPLAINTS</h1>
      </div>

      <div className='flex justify-center items-center mb-10'>
        <div className='bg-gray-200 p-8 rounded-2xl w-200 flex flex-col '>
          <h1 className='text-3xl text-center mb-8'>COMPLAINT FORM</h1>
          <input value={complaintDetails.name} onChange={(e) => setComplaintDetails({ ...complaintDetails, name: e.target.value })} type="text" placeholder='Name' className='bg-white p-3 rounded-xl w-100 mb-5' />
          <input value={complaintDetails.subject} onChange={(e) => setComplaintDetails({ ...complaintDetails, subject: e.target.value })} type="text" placeholder='Complaint Subject' className='bg-white p-3 rounded-xl w-100 mb-5' />
          <textarea value={complaintDetails.complaintBody} onChange={(e) => setComplaintDetails({ ...complaintDetails, complaintBody: e.target.value })} name="complaint" rows={'10'} className='bg-white rounded-xl p-3' placeholder='Complaint Body'></textarea>
          <div className='flex justify-center'>
            <button onClick={handleSubmit} type='button' className='p-3 bg-green-700 w-20 mt-3 rounded-xl text-white'>Send</button>
          </div>
        </div>
      </div>

      {/* <div>
            <div className='mt-20'>
              <h1 className='text-3xl p-8 font-bold text-green-900 text-center shadow-xl'>ADDED COMPLAINTS</h1>
            </div>

            <div>
              <table className='min-w-full  text-center mt-9 border-separate border-spacing-y-3 mb-20'>
                <thead className='bg-gray-200'>
                  <tr>
                    <th className='p-2'>S.No</th>
                    <th>name</th>
                    <th>Subject</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {complaints?.length>0?
                  complaints?.map((item,index)=>(
                    <tr>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.subject}</td>
                    <td><button onClick={()=>deleteComplaint(item?._id)}><FontAwesomeIcon icon={faTrash} className='text-red-600'/></button></td>
                  </tr>
                  ))
                  :
                  <h1>No Complaints</h1>}
                  

                </tbody>
              </table>
            </div>
          </div> */}


      <ToastContainer position='top-center' autoClose={2000} />
    </div>
  )
}

export default Complaints