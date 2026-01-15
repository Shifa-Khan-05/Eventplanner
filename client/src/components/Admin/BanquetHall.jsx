import React, { useState, useEffect } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const BanquetHall = () => {
  const [banquets, setBanquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    capacity: "",
    pricePerPlate: "",
    rentalPrice: "", // Added
    type: "Hall", // Added
    amenities: "",
    contactPhone: "",
    images: [],
  });

  const fetchBanquets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/banquet");
      setBanquets(res.data.data);
    } catch (error) {
      toast.error("Failed to load banquets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanquets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => data.append("images", file));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      if (editMode) {
        await api.put(`/banquet/${currentId}`, data);
        toast.success("Banquet updated successfully");
      } else {
        await api.post("/banquet", data);
        toast.success("Banquet created successfully");
      }
      setShowModal(false);
      resetForm();
      fetchBanquets();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banquet?")) {
      try {
        await api.delete(`/banquet/${id}`);
        toast.success("Banquet deleted");
        fetchBanquets();
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  const handleEdit = (banquet) => {
    setEditMode(true);
    setCurrentId(banquet._id);
    setFormData({
      name: banquet.name,
      description: banquet.description,
      address: banquet.address,
      city: banquet.city,
      state: banquet.state,
      capacity: banquet.capacity,
      pricePerPlate: banquet.pricePerPlate,
      amenities: banquet.amenities.join(","),
      contactPhone: banquet.contactPhone,
      images: [], // Keep empty to avoid re-uploading if not changed
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditMode(false);
    setCurrentId(null);
    setFormData({
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      capacity: "",
      pricePerPlate: "",
      amenities: "",
      contactPhone: "",
      images: [],
    });
  };

  return (
    <div className="p-6 bg-[#FFF5F0] min-h-[87vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#C23B22]">Banquet Halls</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[#E55353] text-white px-4 py-2 rounded-lg hover:bg-[#d44242]"
        >
          <FaPlus /> Add New Banquet
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#FFD1BA] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FFE7D1]">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Capacity</th>
                <th className="p-4 text-left">Price/Plate</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banquets.map((b) => (
                <tr key={b._id} className="border-b border-[#FFD1BA] hover:bg-[#FFF0E6]">
                  <td className="p-4 font-medium">{b.name}</td>
                  <td className="p-4">{b.city}, {b.state}</td>
                  <td className="p-4">{b.capacity}</td>
                  <td className="p-4">₹{b.pricePerPlate}</td>
                  <td className="p-4 flex gap-3">
                    <button onClick={() => handleEdit(b)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(b._id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit Banquet" : "Add Banquet"}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="border p-2 rounded" />
              <input type="text" name="contactPhone" placeholder="Contact Phone" value={formData.contactPhone} onChange={handleChange} required className="border p-2 rounded" />
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="border p-2 rounded" />
              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="border p-2 rounded" />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="border p-2 rounded" />
              <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required className="border p-2 rounded" />
              <input type="number" name="pricePerPlate" placeholder="Price Per Plate" value={formData.pricePerPlate} onChange={handleChange} required className="border p-2 rounded" />
              <input type="number" name="rentalPrice" placeholder="Base Rental Price" value={formData.rentalPrice} onChange={handleChange} className="border p-2 rounded" />
              <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded">
                  <option value="Hall">Hall</option>
                  <option value="Garden">Garden</option>
              </select>
              <input type="text" name="amenities" placeholder="Amenities (comma separated)" value={formData.amenities} onChange={handleChange} className="border p-2 rounded" />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="border p-2 rounded col-span-2" rows="3"></textarea>
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">Images</label>
                <input type="file" multiple onChange={handleFileChange} className="border p-2 rounded w-full" />
              </div>
              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#E55353] text-white rounded hover:bg-[#d44242]">{editMode ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BanquetHall;