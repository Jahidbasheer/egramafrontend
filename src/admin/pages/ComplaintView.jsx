import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteComplaintAPI, getComplaintAPI } from '../../services/allAPIs'

const ComplaintView = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [complaints, setComplaints] = useState([])
  const [selectedRow, setSelectedRow] = useState({})
  const[deleteStatus,setDeleteStatus]=useState("")

  const getComplaint = async () => {
    const result = await getComplaintAPI()
    console.log(result.data);
    if (result.status == 200) {
      setComplaints(result.data)
    }
  }

  const deleteComplaint = async (id) => {
    const result = await deleteComplaintAPI(id)
    console.log(result);
    if (result.status == 200) {
      setDeleteStatus(result.data)
    }

  }
  useEffect(() => {
    getComplaint()
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
            <div className='mt-10'>
              <h1 className='text-3xl shadow-xl mb-5 p-2'>COMPLAINTS</h1>
            </div>

            <div>
              <table className='min-w-full  text-center mt-9 border-separate border-spacing-y-3'>
                <thead className='bg-gray-200'>
                  <tr>
                    <th className='p-2'>S.No</th>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {complaints?.length > 0 ?
                    complaints?.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.subject}</td>
                        <td className='flex justify-evenly'>
                          <button onClick={() => {
                            setModalOpen(true)
                            console.log(item)
                            setSelectedRow(item);
                          }} className='p-2 rounded bg-blue-600 text-white'>View</button>
                          <button onClick={()=>deleteComplaint(item?._id)}><FontAwesomeIcon icon={faTrash} className='text-red-600' /></button>
                        </td>
                      </tr>
                    ))
                    :
                    <h1>No complaints</h1>
                  }

                </tbody>
              </table>
            </div>
          </div>
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <div className="bg-white w-full max-w-200 rounded-lg shadow-xl p-6">
                <h1 className='text-center text-2xl'>Complaint</h1>
                <div>
                  <h1>Name: {selectedRow.name}</h1>
                  <h1>Subject: {selectedRow.subject}</h1>
                  <br></br>
                  <p>{selectedRow.complaintBody}<p></p></p>
                </div>
                <div className='flex justify-center mt-5'>
                  <button onClick={() => {
                    setModalOpen(false)
                    setSelectedRow({})
                  }} className='bg-red-600 p-2 rounded text-white'>Close</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default ComplaintView