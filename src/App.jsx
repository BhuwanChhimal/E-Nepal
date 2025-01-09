import { Routes, Route } from "react-router-dom";
import { TaxProvider } from './context/TaxContext';
import Home from './components/Home';
import { ComNavbar } from './components/Navbar';
import Footer from './components/Footer';
import BirthCertificate from "./components/BirthCertificate";
import Citizenship from "./components/Citizenship";
import NationalId from "./components/NationalId";
import Passport from "./components/Passport";
import License from "./components/License";
import PanCard from "./components/PanCard";
import ComplaintBox from "./components/ComplaintBox";
import TaxPortal from "./components/TaxPortal";
import IncomeDeclaration from "./components/IncomeDeclaration";
import TaxDeduction from "./components/TaxDeduction";
import TaxCalculation from "./components/TaxCalculation";

function App() {
  return (
    <TaxProvider>
      <ComNavbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/birthcertificate" element={<BirthCertificate />} />
          <Route path="/citizenship" element={<Citizenship />} />
          <Route path="/nationalid" element={<NationalId />} />
          <Route path="/passport" element={<Passport />} />
          <Route path="/license" element={<License />} />
          <Route path="/pancard" element={<PanCard />} />
          <Route path="/complaintbox" element={<ComplaintBox />} />
          <Route path="/taxportal" element={<TaxPortal />} />
          <Route path="/tax-portal-income-declarations" element={<IncomeDeclaration />} />
          <Route path="/tax-deductions" element={<TaxDeduction />} />
          <Route path="/tax-calculation" element={<TaxCalculation />} />
        </Routes>
      </div>
      <Footer />
    </TaxProvider>
  );
}

export default App;