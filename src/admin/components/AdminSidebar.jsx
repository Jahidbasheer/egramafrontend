import { faBook, faBuildingCircleCheck, faCircleExclamation, faCircleInfo, faFileInvoiceDollar, faGear, faHouse, faImages, faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSidebar = () => {

    const [homeStatus,setHomeStatus]=useState(false)
    const [billStatus,setBillStatus]=useState(false)
    const [schemeStatus,setSchemeStatus]=useState(false)
    const [noticeStatus,setNoticeStatus]=useState(false)
    const [galleryStatus,setGalleryStatus]=useState(false)
    const [panchayathInfoStatus,setPanchayathInfoStatus]=useState(false)
    const [complaintStatus,setComplaintStatus]=useState(false)
    const [settingStatus,setSettingStatus]=useState(false)
    

    const navigate=useNavigate()

    const pageSwap = (data)=>{
        if(data=='home'){
            navigate('/adminhome')
        }else if(data=='bills'){
            navigate('/add-bills')
        }else if(data=='notice'){
            navigate('/add-notice')
        }else if(data=='scheme'){
            navigate('/add-schemes')
        }else if(data=='complaint'){
            navigate('/complaintview')
        }else if(data=='photo'){
            navigate('/add-photos')
        }else if(data=='panchayathInfo'){
            navigate('/add-panchayathInfo')
        }else if(data =='settings'){
            navigate('/adminsettings')
        }else{
            navigate('*')
        }
    }

    useEffect(()=>{
        if(location.pathname=="/adminhome"){
            setHomeStatus(true)
        }else if(location.pathname=="/add-bills"){
            setBillStatus(true)
        }else if(location.pathname=="/add-notice"){
            setNoticeStatus(true)
        }else if(location.pathname=="/add-schemes"){
            setSchemeStatus(true)
        }else if(location.pathname=="/complaintview"){
            setComplaintStatus(true)
        }else if(location.pathname=="/add-photos"){
            setGalleryStatus(true)
        }else if(location.pathname=="/add-panchayathInfo"){
            setPanchayathInfoStatus(true)
        }else if(location.pathname=="/adminsettings"){
            setSettingStatus(true)
        }else{
            console.log("no such page");
            
        }
    })

  return (
    <>
       <div className='h-dvh'>
             <div className='flex flex-col justify-center items-center p-3'>
                
        
                 <h1 className='mt-7 mb-10 text-3xl text-center'>Admin</h1>
            </div>
    
            <div className='m-5'>
                <div className='mb-3' onClick={()=>pageSwap('home')}>
                    <input type="radio"  id='home' name='filter' readOnly checked={homeStatus}/>
                    <label htmlFor="home" className='mx-3' ><FontAwesomeIcon icon={faHouse} className='me-3'/>Home</label>
                </div>
                <div className='mb-3'  onClick={()=>pageSwap('bills')}>
                    <input type="radio" id='bills' name='filter' readOnly checked={billStatus}/>
                    <label htmlFor="bills" className='mx-3' ><FontAwesomeIcon icon={faFileInvoiceDollar} className='me-3'/>Bills</label>
                </div>
                <div className='mb-3' onClick={()=>pageSwap('notice')}>
                    <input type="radio" id='notice' name='filter' readOnly checked={noticeStatus}/>
                    <label htmlFor="notice" className='mx-3'  ><FontAwesomeIcon icon={faNoteSticky} className='me-3'/>Notice</label>
                </div>
                <div className='mb-3' onClick={()=>pageSwap('scheme')}>
                    <input type="radio" id='scheme' name='filter' readOnly checked={schemeStatus}/>
                    <label htmlFor="scheme" className='mx-3'  ><FontAwesomeIcon icon={faBuildingCircleCheck} className='me-3'/>Schemes</label>
                </div>
                <div className='mb-3' onClick={()=>pageSwap('complaint')}>
                    <input type="radio" id='complaint' name='filter' readOnly checked={complaintStatus}/>
                    <label htmlFor="complaint" className='mx-3'  ><FontAwesomeIcon icon={faCircleExclamation} className='me-3'/>Complaints</label>
                </div>
                <div className='mb-3' onClick={()=>pageSwap('photo')}>
                    <input type="radio" id='photo' name='filter' readOnly checked={galleryStatus}/>
                    <label htmlFor="photo" className='mx-3'  ><FontAwesomeIcon icon={faImages} className='me-3'/>Gallery</label>
                </div>
                <div className='mb-3' onClick={()=>pageSwap('panchayathInfo')}>
                    <input type="radio" id='panchayathInfo' name='filter' readOnly checked={panchayathInfoStatus}/>
                    <label htmlFor="panchayathInfo" className='mx-3'  ><FontAwesomeIcon icon={faCircleInfo} className='me-3'/>Panchayath Info</label>
                </div>
                <div className='mb-3' onClick={()=>pageSwap('settings')}>
                    <input type="radio" id='settings' name='filter' readOnly checked={settingStatus}/>
                    <label htmlFor="settings" className='mx-3'  ><FontAwesomeIcon icon={faGear} className='me-3'/>Settings</label>
                </div>
            </div>
       </div>
    </>
  )
}

export default AdminSidebar