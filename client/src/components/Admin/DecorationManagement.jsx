import React, { useState, useEffect } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const DecorationManagement = () => {
  const [decorations, setDecorations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    type: "Full Package",
    contactPhone: "",
    images: [],
  });

  const fetchDecorations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/decoration");
      setDecorations(res.data.data);
    } catch (error) {
      toast.error("Failed to load decorations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecorations();
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
        await api.put(`/decoration/${currentId}`, data);
        toast.success("Decoration updated successfully");
      } else {
        await api.post("/decoration", data);
        toast.success("Decoration created successfully");
      }
      setShowModal(false);
      resetForm();
      fetchDecorations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this decoration?")) {
      try {
        await api.delete(`/decoration/${id}`);
        toast.success("Decoration deleted");
        fetchDecorations();
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  const handleEdit = (decoration) => {
    setEditMode(true);
    setCurrentId(decoration._id);
    setFormData({
      name: decoration.name,
      description: decoration.description,
      price: decoration.price,
      type: decoration.type,
      contactPhone: decoration.contactPhone || "",
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
      price: "",
      type: "Full Package",
      contactPhone: "",
      images: [],
    });
  };

  return (
    <div className="p-6 bg-[#F3E5F5] min-h-[87vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#7B1FA2]">Decorations</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[#9C27B0] text-white px-4 py-2 rounded-lg hover:bg-[#7b1fa2]"
        >
          <FaPlus /> Add New Decoration
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#E1BEE7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#E1BEE7]">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Type</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {decorations.map((d) => (
                  <tr key={d._id} className="border-b border-[#E1BEE7] hover:bg-[#F3E5F5]">
                    <td className="p-4 font-medium">{d.name}</td>
                    <td className="p-4">{d.type}</td>
                    <td className="p-4">₹{d.price}</td>
                    <td className="p-4 flex gap-3">
                      <button onClick={() => handleEdit(d)} className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(d._id)} className="text-red-500 hover:text-red-700">
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
          <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#7B1FA2]">
                 {editMode ? "Edit Decoration" : "Add Decoration"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400" />
              
              <div className="grid grid-cols-2 gap-4">
                 <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded focus:ring-2 focus:ring-purple-400">
                    <option value="Full Package">Full Package</option>
                    <option value="Theme">Theme</option>
                    <option value="Floral">Floral</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Stage">Stage</option>
                 </select>
                 <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="border p-2 rounded focus:ring-2 focus:ring-purple-400" />
              </div>

              <input type="text" name="contactPhone" placeholder="Vendor Phone" value={formData.contactPhone} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400" />
              
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400" rows="3"></textarea>
              
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Images</label>
                <input type="file" multiple onChange={handleFileChange} className="w-full border p-2 rounded bg-gray-50" />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#9C27B0] text-white rounded hover:bg-[#7b1fa2] font-bold shadow-md">{editMode ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecorationManagement;
