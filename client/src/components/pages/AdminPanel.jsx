import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Admin/Sidebar";
import Overview from "../Admin/Overview";
import Customers from "../Admin/Customers";
import Bookings from "../Admin/Bookings";
import CustomerQueries from "../Admin/CustomerQueries";
import CustomerFeedback from "../Admin/CustomerFeedback";
import BanquetHall from "../Admin/BanquetHall";
import CateringService from "../Admin/CateringService";
import DecorationManagement from "../Admin/DecorationManagement";
const AdminPanel = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const { isLogin, isAdmin } = useAuth();

  useEffect(() => {
    if (!isLogin ) {
      navigate("/login");
    }
  }, [isLogin, isAdmin, navigate]);


  return (
    <>
      <div className="flex">
        <Sidebar active={active} setActive={setActive} />
        <div className="w-full">
          {active === "overview" && <Overview />}
          {active === "BanquetHall" && <BanquetHall/>}
          {active === "CateringService" && <CateringService/>}
          {active === "customers" && <Customers />}
          {active === "bookings" && <Bookings />}
          {active === "cusQueries" && <CustomerQueries />}
          {active === "cusFeedback" && <CustomerFeedback />}
          {active === "DecorationManagement" && <DecorationManagement />}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;