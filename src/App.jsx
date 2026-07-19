import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Homepage from "../pages/Homepage"
import AboutUs from "../pages/AboutUs"
import Services from "../pages/Services"
import Offices from "../pages/Offices"
import Booking from "../pages/Booking"
import AppLayout from "../pages/AppLayout"
import PortalLayout from "../components/portal/PortalLayout"
import PortalDashboard from "../pages/portal/PortalDashboard"
import PortalFeaturedRoutes from "../pages/portal/PortalFeaturedRoutes"
import PortalTransitRoutes from "../pages/portal/PortalTransitRoutes"

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

        {/* Admin Portal */}
        <Route path='portal' element={<PortalLayout />}>
          <Route index element={<PortalDashboard />} />
          <Route path='featured-routes' element={<PortalFeaturedRoutes />} />
          <Route path='transit-routes' element={<PortalTransitRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
