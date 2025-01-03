import { Routes, Route } from "react-router-dom"
import Home from './components/Home'
import { ComNavbar } from './components/Navbar'
import './index.css'
import BirthCertificate from "./components/BirthCertificate"
import Citizenship from "./components/Citizenship"
import NationalId from "./components/NationalId"
import Passport from "./components/Passport"
import License from "./components/License"
import PanCard from "./components/PanCard"
import ComplaintBox from "./components/ComplaintBox"
import TaxPortal from "./components/TaxPortal"


function App() {

  return (
    <>
    <ComNavbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/birthcertificate" element={<BirthCertificate/>}/>
      <Route path="/citizenship" element={<Citizenship/>}/>
      <Route path="/nationalid" element={<NationalId/>}/>
      <Route path="/passport" element={<Passport/>}/>
      <Route path="/license" element={<License/>}/>
      <Route path="/pancard" element={<PanCard/>}/>
      <Route path="/complaintbox" element={<ComplaintBox/>}/>
      <Route path="/taxportal" element={<TaxPortal/>}/>
    </Routes>
    </>


  )
}

export default App
