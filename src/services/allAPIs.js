import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

// login
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

//update admin profile 
export const adminProfileUpdateAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/admin-profile-update`,reqBody,reqHeader)
}

// add bill
export const addBillAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/addbill`,reqBody,reqHeader)
}

// get all bill
export const getBillAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/get-bill`,{},reqHeader)
}

// make payment
export const makePaymentAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/make-payment`,reqBody,reqHeader)
}

// add scheme
export const addSchemeAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/addscheme`,reqBody,reqHeader)
}

// get all schemes
export const getSchemeAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/get-schemes`)
}

// delete notice
export const deleteSchemeAPI = async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/delete-scheme/${id}`)
}


// add notice
export const addNoticeAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/addnotice`,reqBody,reqHeader)
}

// get all notice
export const getNoticeAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/get-notice`)
}
// delete notice
export const deleteNoticeAPI = async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/delete-notice/${id}`)
}

// get info
export const getInfoAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/get-info`)
}

// add panchayath info
export const addInfoAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/add-info`,reqBody,reqHeader)
}

// add images
export const addPhotosAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/addphotos`,reqBody,reqHeader)
}

// get all photos
export const getPhotosAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/get-photos`)
}

// delete photo
export const deletePhotoAPI = async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/delete-photo/${id}`)
}
// register complaint
export const addComplaintAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/addcomplaint`,reqBody,reqHeader)
}

// get all complaints
export const getComplaintAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/get-complaint`)
}

// delete notice
export const deleteComplaintAPI = async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/delete-complaint/${id}`)
}