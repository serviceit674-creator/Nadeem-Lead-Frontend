import React, { useState } from "react";
import { Shield, User, UserCog, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

export default function SuperAdmin() {
  const navigate = useNavigate();

  // Mock data for pure client-side state
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Shahrukh Khan",
      email: "shahrukhkhan753490@gmail.com",
      role: "superadmin",
      status: "active",
      createdAt: "2025-12-23",
      last_login: "2026-06-17T14:57:54",
    },
    {
      id: "2",
      name: "Shahrukh Khan",
      email: "shahrukhkhan766879@gmail.com",
      role: "superadmin",
      status: "active",
      createdAt: "2025-12-24",
      last_login: "2026-01-19T17:46:47",
    },
    {
      id: "3",
      name: "Khushboo Khan",
      email: "khushbookhan5093@gmail.com",
      role: "superadmin",
      status: "active",
      createdAt: "2024-04-24",
      last_login: "2026-06-17T12:01:21",
    },
    {
      id: "4",
      name: "Kashif",
      email: "Kashif123@gmail.com",
      role: "superadmin",
      status: "active",
      createdAt: "2026-05-21",
      last_login: "2026-06-17T10:18:11",
    },

  ]);

  const [deleteModal, setDeleteModal] = useState({
    show: false,
    userId: "",
    userName: "",
  });

  // Status Toggle Handler
  const toggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user
      )
    );
  };

  // Delete Handler
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteModal({ show: false, userId: "", userName: "" });
  };

  return (
    // max-w-7xl और px-4 sm:px-6 lg:px-8 का उपयोग करके क्रिएट पेज जैसा ही मार्जिन सेट किया है
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-500">
      
      {/* हेडर सेक्शन */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          {/* मॉडर्न बैक बटन */}
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-100 active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Super Admin Management</h1>
            <p className="text-sm text-gray-500 font-medium">Manage and monitor high-privilege administrative accounts</p>
          </div>
        </div>

        {/* क्रिएट यूजर बटन */}
        <button 
          onClick={() => navigate("/create")}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all font-bold text-sm cursor-pointer shadow-md shadow-blue-100 active:scale-95"
        >
          <Plus size={16} />
          Create User
        </button>
      </div>

      {/* टेबल कार्ड कंटेनर */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-xs text-gray-500 font-bold uppercase tracking-wider">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Last Login</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="text-sm hover:bg-gray-50/60 transition-colors group">
                  {/* नाम और ज्वाइन डेट */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Joined: {new Date(user.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </td>

                  {/* ईमेल */}
                  <td className="py-4 px-6 text-gray-600 font-medium whitespace-nowrap">
                    {user.email}
                  </td>

                  {/* रोल बैज */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <RoleBadge role={user.role} />
                  </td>

                  {/* स्टेटस बैज */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <StatusBadge status={user.status} />
                  </td>

                  {/* लास्ट लॉगिन समय */}
                  <td className="py-4 px-6 text-gray-500 font-medium whitespace-nowrap">
                    {user.last_login
                      ? new Date(user.last_login).toLocaleString("en-US", {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                          month: 'short',
                          day: 'numeric'
                        })
                      : "—"}
                  </td>

                  {/* एक्शन्स टॉगल और डिलीट बटन */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-4">
                      <ToggleSwitch
                        enabled={user.status === "active"}
                        onToggle={() => toggleStatus(user.id)}
                      />

                      <button
                        onClick={() =>
                          setDeleteModal({
                            show: true,
                            userId: user.id,
                            userName: user.name,
                          })
                        }
                        className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all cursor-pointer"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* इनलाइन कस्टमाइज्ड मॉडर्न डिलीट कन्फर्मेशन डायलॉग */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-gray-900">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete <span className="font-semibold text-gray-800">{deleteModal.userName}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteModal({ show: false, userId: "", userName: "" })}
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal.userId)}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* ===================== HELPER COMPONENTS (NO TYPESCRIPT) ===================== */

const RoleBadge = ({ role }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center justify-center bg-gray-100 text-gray-500 rounded-xl w-8 h-8 border border-gray-200/50 shadow-sm">
        <User size={15} />
      </span>
      <span className="text-xs font-bold text-gray-700 capitalize tracking-wide bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
        {role}
      </span>
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-2.5 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border ${
      status === "active"
        ? "bg-green-50/60 text-green-600 border-green-100"
        : "bg-red-50/60 text-red-500 border-red-100"
    }`}
  >
    {status}
  </span>
);

const ToggleSwitch = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-11 h-6 flex items-center rounded-full px-0.5 transition duration-200 ease-in-out cursor-pointer ${
      enabled ? "bg-green-500 shadow-inner" : "bg-gray-200"
    }`}
  >
    <span
      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition duration-200 ease-in-out ${
        enabled ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);