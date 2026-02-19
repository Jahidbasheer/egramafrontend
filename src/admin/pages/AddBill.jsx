import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { addBillAPI, getBillAPI } from '../../services/allAPIs'

const AddBill = () => {
    const [billDetails, setBillDetails] = useState({
        houseNo: "",
        username: "",
        billType: "",
        amount: "",
        status: false
    })
    console.log(billDetails);
    const [bills, setBills] = useState([])
    const [token, setToken] = useState("")

    const getBill = async (token, houseNo) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "houseNo": `${houseNo}`
        }
        const result = await getBillAPI(reqHeader)
        console.log(result.data);
        if (result.status == 200) {
            setBills(result.data)
        }
    }


    const handleSubmit = async () => {
        const { houseNo, username, billType, amount, status } = billDetails
        if (!houseNo || !username || !billType || !amount) {
            toast.warning("Please fill the fields!!!")
        } else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const reqBody = {
                houseNo: billDetails.houseNo,
                username: billDetails.username,
                billType: billDetails.billType,
                amount: billDetails.amount,
                status: billDetails.status
            }
            const result = await addBillAPI(reqBody, reqHeader)
            console.log(result);

        }
    }


    useEffect(() => {
        const existingUser = sessionStorage.getItem("existingUser")
        console.log(existingUser);
        let user;
        if (existingUser) {
            user = JSON.parse(existingUser)
            console.log(user.houseNo);
        }

        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)
            getBill(token, user.houseNo)
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
                        <h1 className='text-3xl shadow-xl mb-5'>ADD BILL</h1>
                    </div>
                    <div>
                        <table className='min-w-full  text-center mt-9 border-separate border-spacing-y-3'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className='p-2'>House No</th>
                                    <th>UserName</th>
                                    <th>Bill Type</th>
                                    <th>Bill Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td><input value={billDetails.houseNo} onChange={(e) => setBillDetails({ ...billDetails, houseNo: e.target.value })} type="text" placeholder='Enter House No' className='bg-gray-200 rounded p-2' /></td>
                                    <td><input value={billDetails.username} onChange={(e) => setBillDetails({ ...billDetails, username: e.target.value })} type="text" placeholder='Enter Username' className='bg-gray-200 rounded p-2' /></td>
                                    <td><select onChange={(e) => setBillDetails({ ...billDetails, billType: e.target.value })} name="bill-type" id='bill-type' className='bg-gray-200 rounded p-2'>
                                        <option value="">Select Type</option>
                                        <option value="Electricity">Electricity</option>
                                        <option value="Water">Water</option>
                                    </select></td>
                                    <td><input value={billDetails.amount} onChange={(e) => setBillDetails({ ...billDetails, amount: e.target.value })} type="text" placeholder='Enter Amount' className='bg-gray-200 rounded p-2' /></td>
                                    <button type='button' onClick={handleSubmit} className='bg-green-800 text-white p-2 rounded w-25'>Add</button>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* added Bill */}
                    <div>
                        <div>
                            <h1 className='text-3xl shadow-xl mb-5 mt-20'>ADDED BILL</h1>
                        </div>
                        <div><table className='min-w-full  text-center mt-9 border-separate border-spacing-y-3'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className='p-2'>House No</th>
                                    <th>Bill Type</th>
                                    <th>Bill Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bills?.length > 0 ?
                                    bills.map((item) => (
                                        <tr>
                                            <td>{item.houseNo}</td>
                                            <td>{item.billType}</td>
                                            <td>{item.amount}</td>
                                            <td className={`${item.status != "false" ? 'text-green-600' : 'text-red-600'}`}>
                                                {item.status != "false" ? "Paid" : "Pending"}
                                            </td>
                                        </tr>
                                    ))

                                    :
                                    <h1>No Bills Added</h1>}
                            </tbody>
                        </table></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddBill