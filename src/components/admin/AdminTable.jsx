import React from "react";
import { Edit2, Trash2, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

const AdminTable = ({ admins, filters, setFilters, totalPages, onEdit, onDelete, onToggleSuspend }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
            <th className="py-4 px-6">Admin</th>
            <th className="py-4 px-6">Email</th>
            <th className="py-4 px-6">Role</th>
            <th className="py-4 px-6">Created</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
          {admins.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                No admins found.
              </td>
            </tr>
          ) : (
            admins.map((admin) => (
              <tr key={admin._id} className="hover:bg-gray-50/60 transition-colors group">
                {/* Admin Name */}
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck size={16} className="text-blue-600" />
                    </div>
                    <span className="font-semibold text-gray-900">{admin.name}</span>
                  </div>
                </td>
                
                {/* Email */}
                <td className="py-4 px-6 text-gray-600 font-medium whitespace-nowrap">{admin.email}</td>
                
                {/* Role */}
                <td className="py-4 px-6 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-xl text-xs font-bold tracking-wide bg-purple-50 text-purple-700 border border-purple-100">
                    Admin
                  </span>
                </td>
                
                {/* Created Date */}
                <td className="py-4 px-6 text-gray-500 font-medium whitespace-nowrap">
                  {new Date(admin.createdAt).toLocaleDateString("en-GB", {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </td>
                
                {/* Status */}
                <td className="py-4 px-6 whitespace-nowrap">
                  <button
                    onClick={() => onToggleSuspend(admin)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      admin.isActive
                        ? "bg-green-50/60 text-green-700 border-green-100 hover:bg-green-100/80"
                        : "bg-red-50/60 text-red-600 border-red-100 hover:bg-red-100/80"
                    }`}
                  >
                    {admin.isActive ? "Active" : "Suspended"}
                  </button>
                </td>
                
                {/* Actions */}
                <td className="py-4 px-6 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(admin)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                      title="Edit Admin"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(admin)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                      title="Delete Admin"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modern Pagination */}
      <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between sm:px-6">
        <button
          disabled={filters.page <= 1}
          onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
          className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-all cursor-pointer active:scale-95 shadow-sm"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <span className="text-sm text-gray-500 font-medium">
          Page <span className="font-bold text-gray-800">{filters.page}</span> of <span className="font-bold text-gray-800">{totalPages}</span>
        </span>
        <button
          disabled={filters.page >= totalPages}
          onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
          className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-all cursor-pointer active:scale-95 shadow-sm"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default AdminTable;