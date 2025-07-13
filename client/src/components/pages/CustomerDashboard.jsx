import React, { useState } from 'react'
import Sidebar from '../Customer/Sidebar'
import Overview from '../Customer/Overview';
import Profile from '../Customer/Profile';
import Booking from '../Customer/Booking';
import Feedback from '../Customer/Feedback';
import Support from '../Customer/Support';

const CustomerDashboard = () => {
 const [active, setactive]=useState("overview");

  return (
    <>

   <div className="w-full h-15 -mt-20 blur-xl rounded-full bg-gradient-to-r from-fuchsia-400 via-rose-400 to-orange-300 opacity-70"></div>

  <div className=' flex mt-5'>
       <Sidebar  active={active} setactive={setactive} />
       <div className=' w-full border'>
       {active=== 'overview' && <Overview/>}
        {active=== 'Profile' && <Profile/>}
         {active=== 'Booking' && <Booking/>}
          {active=== 'Feedback' && <Feedback/>}
           {active=== 'Support' && <Support/>}
       </div>
</div>    
    </>
  )
}

export default CustomerDashboard