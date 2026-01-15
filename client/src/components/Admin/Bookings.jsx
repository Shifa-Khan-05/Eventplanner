import React, { useState, useEffect } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { FaCheck, FaTimes } from "react-icons/fa";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/booking/all");
      setBookings(res.data.data);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/booking/${id}/status`, { status });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6 bg-[#FFF5F0] min-h-[87vh]">
      <h1 className="text-3xl font-bold text-[#C23B22] mb-6">Bookings</h1>
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#FFD1BA] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FFE7D1]">
              <tr>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Event Type</th>
                <th className="p-4 text-left">Venue/Service</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b border-[#FFD1BA] hover:bg-[#FFF0E6]">
                  <td className="p-4">
                    <div className="font-medium">{b.user?.fname}</div>
                    <div className="text-xs text-gray-500">{b.user?.phn}</div>
                  </td>
                  <td className="p-4">{b.type}</td>
                  <td className="p-4">
                    {b.banquet && <div>{b.banquet.name} (Banquet)</div>}
                    {b.catering && <div>{b.catering.name} (Catering)</div>}
                  </td>
                  <td className="p-4">{new Date(b.eventDate).toLocaleDateString()}</td>
                  <td className="p-4">₹{b.totalAmount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      b.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      b.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    {b.status === 'Pending' && (
                      <>
                        <button onClick={() => handleStatusUpdate(b._id, "Confirmed")} className="text-green-500 hover:text-green-700" title="Confirm">
                          <FaCheck />
                        </button>
                        <button onClick={() => handleStatusUpdate(b._id, "Cancelled")} className="text-red-500 hover:text-red-700" title="Cancel">
                          <FaTimes />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
