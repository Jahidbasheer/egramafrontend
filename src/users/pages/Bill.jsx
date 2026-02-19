import React, { useEffect, useState } from 'react'
import { getBillAPI, makePaymentAPI } from '../../services/allAPIs';
import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from 'react-toastify';

const Bill = () => {
  const [bills, setBills] = useState([])
  const [token,setToken]=useState("")
      
      const getBill = async (token,houseNo) => {
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

      const makePayment=async(bill)=>{
        console.log(bill);
        const stripe = await loadStripe('pk_test_51Sed8ER4ePs1JTxrU3muhbwAC5F3X3RkhzZeyLtAGPOuG3WhYoeEz1PCMD4qLykV5CgrCyRwcbM8ypuKPz6UZb2k00N91RDzKp');
        const reqBody={
          billDetails:bill
        }
        const reqHeader = {
                "Authorization": `Bearer ${token}`
        }
        const result =await makePaymentAPI(reqBody,reqHeader)
        console.log(result);
        const checkoutURL = result?.data?.url

        if(checkoutURL){
            // redirect to page
            window.location.href = checkoutURL
        }else{
            toast.error("Something went wrong!!")
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
                  getBill(token,user.houseNo)
              }
              
          }, [])
  return (
    <div>
        <div className='bg-green-950 p-2 flex justify-between'>
            <h1 className='text-3xl text-white font-bold'>Kunnamangalam Gramapanchayth</h1>
        </div>

        <div>
            <h1 className='text-3xl p-8 font-bold text-green-900 text-center shadow-xl'>BILL PAYMENT</h1>
        </div>

        <table className='min-w-full  text-center mt-9 border-separate border-spacing-y-3'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='p-2'>S.No</th>
            <th>Bill Type</th>
            <th>Bill Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bills?.length>0?
            bills?.map((item,index)=>(
            <tr>
            <td>{index+1}</td>
            <td>{item.billType}</td>
            <td>{item.amount}</td>
            <td>
              <button onClick={()=>makePayment(item)}  className={`p-2 rounded-xl text-white 
              ${item.status!="false" ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-800'}
            `}>
              {item.status!="false" ? "Paid" : "Pay Now"}
              </button>
              </td>

            <td>{item.status != "false" ? "Paid" : "pending"}</td>
          </tr>
            ))
          :
          <h1>No Added Bills</h1>}
          
        </tbody>
      </table>
      <ToastContainer position='top-center' autoClose={2000} />
    </div>
  )
}

export default Bill