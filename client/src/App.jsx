import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Main from "./components/Main";
import About from "./components/pages/About";
import Stories from "./components/pages/Stories";
import Btn1 from "./components/pages/Login";
import Register from "./components/pages/Register";
import Contact from "./components/pages/Contact";
import Bottom from "./components/Footer";
import { Toaster } from "react-hot-toast";
import CustomerDashboard from "./components/pages/CustomerDashboard";
import AdminPanel from "./components/pages/AdminPanel"
import Gallery from "./components/pages/Gallery";
import Elements from "./components/pages/Elements";
import Services from "./components/pages/Services";
import BanquetList from "./components/pages/BanquetList";
import CateringList from "./components/pages/CateringList";
import DecorationList from "./components/pages/DecorationList";
import EventBuilder from "./components/pages/EventBuilder";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

// Create a layout component to handle conditional footer rendering
const Layout = ({ children }) => {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/Register", "/CustomerDashboard", "/AdminPanel"];
  
  // Check if current path starts with any of the hideFooterRoutes or is exactly one of them
  const shouldHideFooter = hideFooterRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith(route + "/")
  );

  return (
    <>
      {children}
      {!shouldHideFooter && <Bottom />}
    </>
  );
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster />
        <Navbar />

        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Main />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Btn1 />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Contact" element={<Contact />} />
             <Route path="/Elements" element={<Elements />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/stories" element={<Stories />} />
             <Route path="/Services" element={<Services />} />
             <Route path="/banquets" element={<BanquetList />} />
            <Route path="/caterings" element={<CateringList />} />
            <Route path="/decorations" element={<DecorationList />} />
            <Route 
              path="/plan-event" 
              element={
                <ProtectedRoute>
                  <EventBuilder />
                </ProtectedRoute>
              } 
            />
            <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
            <Route path="/AdminPanel" element={<AdminPanel/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
