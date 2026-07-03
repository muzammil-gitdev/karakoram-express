import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Homepage from "../pages/Homepage"
import AboutUs from "../pages/AboutUs"
import Services from "../pages/Services"
import Offices from "../pages/Offices"
import Booking from "../pages/Booking"
import AppLayout from "../pages/AppLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Homepage />} />
          {/* <Route path="*" element={<NotFound/>}/> This is for not found page if you made one 😉*/}
          <Route path='aboutus' element={<AboutUs />} />
          <Route path='services' element={<Services />} />
          <Route path='offices' element={<Offices />} />
          <Route path='booking' element={<Booking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
