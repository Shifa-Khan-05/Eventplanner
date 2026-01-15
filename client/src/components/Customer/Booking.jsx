import React, { useState, useEffect } from "react";
import api from "../../config/api";
import { FaCalendarAlt, FaMapMarkerAlt, FaUtensils, FaUsers } from "react-icons/fa";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await api.get("/booking/my-bookings");
        setBookings(res.data.data);
      } catch (error) {
        console.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{booking.type}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {booking.banquet?.name || booking.catering?.name || "Event Service"}
                </h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-amber-500" />
                    {new Date(booking.eventDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                     <FaUsers className="text-amber-500" />
                     {booking.guests} Guests
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-gray-800">
                    ₹{booking.totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
              
              {/* <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">View Details</button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booking;