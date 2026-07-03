import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Homepage from "../pages/Homepage"
import AboutUs from "../pages/AboutUs"
import Services from "../pages/Services"
import Offices from "../pages/Offices"
import Booking from "../pages/Booking"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        {/* <Route path="*" element={<NotFound/>}/> This is for not found page if you made one 😉*/}
        <Route path='aboutus' element={<AboutUs />} />
        <Route path='services' element={<Services />} />
        <Route path='offices' element={<Offices />} />
        <Route path='booking' element={<Booking />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
