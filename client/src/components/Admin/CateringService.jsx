import React, { useState, useEffect } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const CateringService = () => {
  const [catering, setCatering] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    menuType: "Veg",
    pricePerPlate: "",
    items: "",
    contactPhone: "",
    images: [],
  });

  const fetchCatering = async () => {
    try {
      setLoading(true);
      const res = await api.get("/catering");
      setCatering(res.data.data);
    } catch (error) {
      toast.error("Failed to load catering services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatering();
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
        await api.put(`/catering/${currentId}`, data);
        toast.success("Service updated successfully");
      } else {
        await api.post("/catering", data);
        toast.success("Service created successfully");
      }
      setShowModal(false);
      resetForm();
      fetchCatering();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/catering/${id}`);
        toast.success("Deleted successfully");
        fetchCatering();
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  const handleEdit = (service) => {
    setEditMode(true);
    setCurrentId(service._id);
    setFormData({
      name: service.name,
      description: service.description,
      menuType: service.menuType,
      pricePerPlate: service.pricePerPlate,
      items: service.items.join(","),
      contactPhone: service.contactPhone,
      images: [],
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditMode(false);
    setCurrentId(null);
    setFormData({
      name: "",
      description: "",
      menuType: "Veg",
      pricePerPlate: "",
      items: "",
      contactPhone: "",
      images: [],
    });
  };

  return (
    <div className="p-6 bg-[#FFF5F0] min-h-[87vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#C23B22]">Catering Services</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[#E55353] text-white px-4 py-2 rounded-lg hover:bg-[#d44242]"
        >
          <FaPlus /> Add New Service
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
                <th className="p-4 text-left">Menu Type</th>
                <th className="p-4 text-left">Price/Plate</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {catering.map((c) => (
                <tr key={c._id} className="border-b border-[#FFD1BA] hover:bg-[#FFF0E6]">
                  <td className="p-4 font-medium">{c.name}</td>
                  <td className="p-4">{c.menuType}</td>
                  <td className="p-4">₹{c.pricePerPlate}</td>
                  <td className="p-4">{c.contactPhone}</td>
                  <td className="p-4 flex gap-3">
                    <button onClick={() => handleEdit(c)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(c._id)} className="text-red-500 hover:text-red-700">
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
            <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit Service" : "Add Service"}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Service Name" value={formData.name} onChange={handleChange} required className="border p-2 rounded" />
              <input type="text" name="contactPhone" placeholder="Contact Phone" value={formData.contactPhone} onChange={handleChange} required className="border p-2 rounded" />
              <select name="menuType" value={formData.menuType} onChange={handleChange} className="border p-2 rounded">
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Mixed">Mixed</option>
              </select>
              <input type="number" name="pricePerPlate" placeholder="Price Per Plate" value={formData.pricePerPlate} onChange={handleChange} required className="border p-2 rounded" />
              <input type="text" name="items" placeholder="Items (comma separated)" value={formData.items} onChange={handleChange} className="border p-2 rounded col-span-2" />
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

export default CateringService;