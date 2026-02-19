import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./users/components/Header"
import Home from "./users/pages/Home"
import Auth from "./pages/Auth"
import PageNotFound from "./pages/PageNotFound"
import { useEffect, useState } from "react"
import Preloader from "./components/Preloader"
import LandingPage from "./users/pages/LandingPage"
import Bill from "./users/pages/Bill"
import PanchayathInfo from "./users/pages/PanchayathInfo"
import Schemes from "./users/pages/Schemes"
import Gallery from "./users/pages/Gallery"
import Complaints from "./users/pages/Complaints"
import Notice from "./users/pages/Notice"
import AdminHome from "./admin/pages/AdminHome"
import AdminSettings from "./admin/pages/AdminSettings"
import AddBill from "./admin/pages/AddBill"
import AddNotice from "./admin/pages/AddNotice"
import AddSchemes from "./admin/pages/AddSchemes"
import ComplaintView from "./admin/pages/ComplaintView"
import AddPhotos from "./admin/pages/AddPhotos"
import AddPanchayathInfo from "./admin/pages/AddPanchayathInfo"
import PaymentSuccess from "./users/pages/PaymentSuccess"
import PaymentError from "./users/pages/PaymentError"

function App() {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 3000)
  }, [])


  return (
    <>
      <Routes>
        <Route path="/" element={loading ? <Home /> : <Preloader />} />
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/bills" element={<Bill />} />
        <Route path="/info" element={<PanchayathInfo />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/notice" element={<Notice />} />
        <Route path='/payment-success' element={<PaymentSuccess/>} />
        <Route path='/payment-error' element={<PaymentError />} />

        <Route path='/adminhome' element={loading ? <AdminHome /> : <Preloader />} />
        <Route path='/adminsettings' element={<AdminSettings />} />
        <Route path='/add-bills' element={<AddBill />} />
        <Route path='/add-notice' element={<AddNotice />} />
        <Route path='/add-schemes' element={<AddSchemes />} />
        <Route path='/complaintview' element={<ComplaintView />} />
        <Route path='/add-photos' element={<AddPhotos />} />
        <Route path='/add-panchayathInfo' element={<AddPanchayathInfo />} />
      </Routes>
    </>
  )
}

export default App
