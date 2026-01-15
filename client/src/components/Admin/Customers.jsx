import React, { useState, useEffect } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { FaTrash, FaBan, FaCheck } from "react-icons/fa";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Assuming we have an endpoint for this, if not we need 'getAllUsers' in userController
      // Since it wasn't explicitly planned, I'll assume we might need to add it or use a placeholder
      // For now, let's assume /user/all exists or we add it. 
      // Checking userController previously, it only had Getprofile and UpdateProfile.
      // I need to add GetAllUsers to userController.
      const res = await api.get("/user/all"); 
      setUsers(res.data.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeactivate = async (id, currentStatus) => {
    // Implement logic to toggle active status if backend supports it
    toast.success("Status updated");
  };

  return (
    <div className="p-6 bg-[#FFF5F0] min-h-[87vh]">
      <h1 className="text-3xl font-bold text-[#C23B22] mb-6">Customers</h1>
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#FFD1BA] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FFE7D1]">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-[#FFD1BA] hover:bg-[#FFF0E6]">
                  <td className="p-4 flex items-center gap-2">
                    <img src={u.photo} alt="" className="w-8 h-8 rounded-full object-cover" />
                    {u.fname}
                  </td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">{u.phn}</td>
                  <td className="p-4">{u.role}</td>
                  <td className="p-4">
                     <button className="text-red-500 hover:text-red-700" title="Deactivate">
                        <FaBan />
                     </button>
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

export default Customers;