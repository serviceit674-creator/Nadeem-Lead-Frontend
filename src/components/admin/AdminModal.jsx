import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import api from '../../lib/axios.js' // सीधे axios का उपयोग करेंगे

const AdminModal = ({ isOpen, onClose, adminData, refreshData }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // अगर एडिट मोड है, तो फॉर्म में पुराना डेटा भरें
  useEffect(() => {
    if (adminData) {
      setFormData({ name: adminData.name, email: adminData.email, password: "" }); // एडिट पर पासवर्ड खाली रखेंगे
    } else {
      setFormData({ name: "", email: "", password: "" });
    }
  }, [adminData, isOpen]);

  if (!isOpen) return null;

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (adminData) {

        const response = await api.patch(`/admin/edit-admin/admins/${adminData._id}`, formData);
        if (response.data.success) {
          alert("Admin updated successfully");
        }
      } else {
      
        const response = await api.post("/admin/create", formData);
        if (response.data.success) {
          alert("Admin created successfully");
        }
      }

      refreshData(); 
      onClose(); 
    } catch (error) {

      const errMsg = error.response?.data?.message || "Something went wrong";
      console.error("Form Submit Error:", errMsg);
      alert(errMsg); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {adminData ? "Edit Admin Account" : "Create Admin Account"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {adminData ? "Update admin details below" : "Fill in the details to create a new administrator"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-800"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              placeholder="admin@example.com"
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-800"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
              Password {adminData && <span className="text-gray-400 text-[11px] font-normal">(Leave blank to keep unchanged)</span>}
            </label>
            <input
              type="password"
              required={!adminData} // क्रिएट करते समय ज़रूरी है, एडिट पर नहीं
              placeholder="••••••••"
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-800"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-blue-100 transition-all active:scale-95 cursor-pointer disabled:opacity-70 disabled:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Saving...
                </>
              ) : adminData ? (
                "Save Changes"
              ) : (
                "Create Admin"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;