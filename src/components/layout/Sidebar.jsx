import { useState } from "react"; // useState import kiya dropdown open/close ke liye
import { NavLink, useNavigate } from "react-router-dom"; 
import {
  LayoutDashboard,
  Users,
  MessageCircle,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown, // Dropdown indicator ke liye
  ChevronUp,
  
    // Social Icons

} from "lucide-react";
import { FaFacebook, FaInstagram, FaFacebookMessenger } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";


export default function Sidebar() {
  const navigate = useNavigate();
  
  // State to manage Lead Inbox dropdown toggle
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  // Main navigation items config
  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Leads Pipeline", icon: Users, path: "/leads" },
    {title: "Super Admin",    icon : FiLayers, path: "/SuperAdmin"},
    
    // Lead Inbox configured as dropdown now
    { 
      title: "Lead Inbox", 
      icon: MessageCircle, 
      isDropdown: true,
      children: [
        { title: "Facebook", icon:  FaFacebook, path: "/facebook" },
        { title: "Instagram", icon:  FaInstagram, path: "/instagram" },
        { title: "WhatsApp", icon: MessageCircle, path: "/whatsapp" },
      ]
    },
    { title: "Email Automations", icon: Mail, path: "/email" },
    { title: "Analytics", icon: BarChart3, path: "/analytics" },
    // { title: "System Settings", icon: Settings, path: "/setting" },
    {title: "System Setting",    icon : Settings, path: "/admin"},
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-[#020617] border-r border-slate-800 flex flex-col z-50">
      
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">C</div>
        <div className="ml-3">
          <h2 className="text-white font-bold text-lg">LeadHub</h2>
          <p className="text-xs text-slate-500">Admin Panel</p>
        </div>
      </div>

      {/* Menu Navigation */}
      <nav className="flex-1 overflow-y-hidden px-3 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            // Render logic if the item is a Dropdown (e.g., Lead Inbox)
            if (item.isDropdown) {
              return (
                <div key={item.title} className="space-y-1">
                  <button
                    onClick={() => setIsInboxOpen(!isInboxOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                      isInboxOpen 
                        ? "text-white bg-slate-800/40" 
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    {isInboxOpen ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                  </button>

                  {/* Nested Sub-Menu Area */}
                  {isInboxOpen && (
                    <div className="pl-4 ml-4 border-l border-slate-800 space-y-1 transition-all duration-300">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-xs font-medium ${
                                isActive
                                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                              }`
                            }
                          >
                            <ChildIcon size={14} />
                            <span>{child.title}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Normal Flat Links Setup
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer Profile Control Panel */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">A</div>
            <div>
              <p className="text-sm font-medium text-white">Admin Team</p>
              <p className="text-xs text-green-400">● System Active</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}