import React, { useState, useEffect, useRef } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import axios from "axios"; 

import AdminTable from "../components/admin/AdminTable.jsx";
import AdminModal from "../components/admin/AdminModal.jsx";
import ConfirmationModal from "../components/ConfirmationModal.jsx"; 
import api from "../lib/axios.js";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // सर्च इनपुट और फ़िल्टर्स स्टेट
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({ search: "", page: 1, limit: 10 });

  // क्रिएट/एडिट मोडल स्टेट
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // कंफर्मेशन मोडल स्टेट
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null, // "delete" | "suspend"
    admin: null,
    loading: false,
  });

  // सर्च डिबाउंस (Debounce) — 400ms
  const debounceRef = useRef(null);
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchInput(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: val, page: 1 }));
    }, 400);
  };

  // ─── API: GET ALL ADMINS ───────────────────────────────────────────────────
  const loadAdmins = async () => {
    setLoading(true);
    try {
      // सही पाथ: /api/admin/admins (बिना /users के)
      const response = await api.get("/admin/get-admins", {
        params: {
          search: filters.search,
          page: filters.page,
          limit: filters.limit
        }
      });
      
      if (response.data && response.data.success) {
        setAdmins(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
        setTotal(response.data.total || 0);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Error fetching admins";
      console.error("Fetch Error:", errMsg);
      alert(errMsg); // toast की जगह सेफ अलर्ट
    } finally {
      setLoading(false);
    }
  };

  // फ़िल्टर बदलने पर लोड करें
  useEffect(() => {
    loadAdmins();
  }, [filters]);

  // ─── API: DELETE ADMIN HANDLING ───────────────────────────────────────────
  const handleDeleteClick = (admin) => {
    setConfirmModal({ isOpen: true, type: "delete", admin, loading: false });
  };

  const handleDeleteConfirm = async () => {
    setConfirmModal((prev) => ({ ...prev, loading: true }));
    try {
      // सही पाथ: DELETE /api/admin/admins/:id
      const response = await api.delete(`/admin/delete-admin/admins/${confirmModal.admin._id}`);
      if (response.data.success) {
        loadAdmins(); 
        setConfirmModal({ isOpen: false, type: null, admin: null, loading: false });
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Error deleting admin";
      console.error("Delete Error:", errMsg);
      alert(errMsg); 
      setConfirmModal((prev) => ({ ...prev, loading: false }));
    }
  };

  // ─── API: SUSPEND / ACTIVATE HANDLING ──────────────────────────────────────
  const handleSuspendClick = (admin) => {
    setConfirmModal({ isOpen: true, type: "suspend", admin, loading: false });
  };

  const handleSuspendConfirm = async () => {
    setConfirmModal((prev) => ({ ...prev, loading: true }));
    try {
      // सही पाथ: PATCH /api/admin/admins/:id/suspend
      const response = await api.patch(`/admin/sus-admin/admins/${confirmModal.admin._id}/suspend`);
      if (response.data.success) {
        loadAdmins(); 
        setConfirmModal({ isOpen: false, type: null, admin: null, loading: false });
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Error toggling admin status";
      console.error("Suspend Error:", errMsg);
      alert(errMsg); 
      setConfirmModal((prev) => ({ ...prev, loading: false }));
    }
  };

  // ─── FORM MODAL OPENERS ────────────────────────────────────────────────────
  const openCreateModal = () => {
    setSelectedAdmin(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (admin) => {
    setSelectedAdmin(admin);
    setIsFormModalOpen(true);
  };

  // ─── CONFIRMATION MODAL CONFIGURATION ──────────────────────────────────────
  const getConfirmConfig = () => {
    const { type, admin } = confirmModal;
    if (type === "delete") {
      return {
        title: "Delete Admin",
        description: `Are you sure you want to permanently delete "${admin?.name}"? This action cannot be undone.`,
        confirmText: "Delete",
        variant: "danger",
        onConfirm: handleDeleteConfirm,
      };
    }
    const isSuspending = admin?.isActive;
    return {
      title: isSuspending ? "Suspend Admin" : "Activate Admin",
      description: isSuspending
        ? `Are you sure you want to suspend "${admin?.name}"? They will lose access immediately.`
        : `Are you sure you want to reactivate "${admin?.name}"?`,
      confirmText: isSuspending ? "Suspend" : "Activate",
      variant: isSuspending ? "warning" : "success",
      onConfirm: handleSuspendConfirm,
    };
  };

  const confirmConfig = getConfirmConfig();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-0 z-30">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-sm text-gray-500 font-medium">Create and manage admin accounts — {total} total admins</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-blue-100 transition-all active:scale-95 cursor-pointer"
        >
          <Plus size={18} /> Create Admin
        </button>
      </div>

      {/* Search Input Filter */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 max-w-sm group">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-800"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-gray-500 font-medium flex items-center justify-center gap-3">
            <Loader2 className="animate-spin text-blue-600" size={22} />
            Loading admins...
          </div>
        ) : (
          <AdminTable
            admins={admins}
            filters={filters}
            setFilters={setFilters}
            totalPages={totalPages}
            onEdit={openEditModal}
            onDelete={handleDeleteClick}
            onToggleSuspend={handleSuspendClick}
          />
        )}
      </div>

      {/* Create / Edit Form Modal */}
      <AdminModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        adminData={selectedAdmin}
        refreshData={loadAdmins}
      />

      {/* Action Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, type: null, admin: null, loading: false })}
        onConfirm={confirmConfig.onConfirm}
        loading={confirmModal.loading}
        title={confirmConfig.title}
        description={confirmConfig.description}
        confirmText={confirmConfig.confirmText}
        variant={confirmConfig.variant}
      />
    </div>
  );
};

export default Admin;