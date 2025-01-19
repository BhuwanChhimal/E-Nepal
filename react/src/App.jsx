import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaxProvider } from "./context/TaxContext";
import ComNavbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";
import BirthCertificate from "./components/BirthCertificate";
import Citizenship from "./components/Citizenship";
import NationalId from "./components/NationalId";
import Passport from "./components/Passport";
import License from "./components/License";
import PanCard from "./components/PanCard";
import ComplaintBox from "./components/ComplaintBox";
import FormSuccess from "./components/FormSuccess";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import TaxForm from "./components/TaxForm";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true)

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 3000 //  seconds
    const intervalTime = 30 // Update every 40ms
    const increment = 100 / (duration / intervalTime)

    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const nextProgress = prevProgress + increment
        if (nextProgress >= 100) {
          clearInterval(interval)
          setIsLoading(false) // Immediately hide loading screen at 100%
          return 100
        }
        return nextProgress
      })
    }, intervalTime)

    return () =>  clearInterval(interval)

    
  }, [])

  const hideHeroPaths = [
    "/birthcertificate",
    "/citizenship",
    "/nationalid",
    "/passport",
    "/license",
    "/pancard",
    "/complaintbox",
    "/taxportal",
    "/form-success",
  ];

  return (
    <AuthProvider>
      <TaxProvider>
        {isLoading && <LoadingScreen progress={progress} isLoading={isLoading}/> }
        {!isLoading && (
        <div className={`flex flex-col min-h-screen hero-pattern transition-opacity duration-500 
          ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <ComNavbar />
          {!hideHeroPaths.includes(location.pathname) && <Hero />}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/birthcertificate"
                element={
                  <ProtectedRoute>
                    <BirthCertificate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/citizenship"
                element={
                  <ProtectedRoute>
                    <Citizenship />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/nationalid"
                element={
                  <ProtectedRoute>
                    <NationalId />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/passport"
                element={
                  <ProtectedRoute>
                    <Passport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/license"
                element={
                  <ProtectedRoute>
                    <License />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pancard"
                element={
                  <ProtectedRoute>
                    <PanCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/complaintbox"
                element={
                  <ProtectedRoute>
                    <ComplaintBox />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/taxportal"
                element={
                  <ProtectedRoute>
                    <TaxForm />
                  </ProtectedRoute>
                }
              />
              <Route path="/form-success" element={<FormSuccess />} />
            </Routes>
          </div>
          <Footer />
        </div>
        )}
      </TaxProvider>
    </AuthProvider>
  );
}

export default App;
