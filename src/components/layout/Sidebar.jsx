"use client";

import React, { useState } from "react"; 
import { NavLink, useNavigate } from "react-router-dom"; 
import {
  LayoutDashboard,
  Users,
  MessageCircle,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();
  
  // State to manage Lead Inbox dropdown toggle
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  // Main navigation items config (Retained original sub-channels & icons)
  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Leads Pipeline", icon: Users, path: "/leads" },
    { title: "Super Admin", icon: FiLayers, path: "/SuperAdmin" },
    
    // Lead Inbox configured as dropdown with original social data
    { 
      title: "Lead Inbox", 
      icon: MessageCircle, 
      isDropdown: true,
      children: [
        { title: "Facebook", icon: FaFacebook, path: "/facebook" },
        { title: "Instagram", icon: FaInstagram, path: "/instagram" },
        { title: "WhatsApp", icon: MessageCircle, path: "/whatsapp" },
      ]
    },
    { title: "Email Automations", icon: Mail, path: "/email" },
    { title: "Analytics Hub", icon: BarChart3, path: "/analytics" },
    { title: "System Setting", icon: Settings, path: "/admin" },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-[#090d16] border-r border-slate-800/60 flex flex-col z-50 shadow-xl">
      
      {/* Brand Healthcare Logo Section - "Nadeem Care" */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800/60 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/10 tracking-tighter">
          N
        </div>
        <div className="ml-3">
          <h2 className="text-white font-extrabold text-base tracking-tight flex items-center gap-1.5">
            Nadeem Care <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </h2>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Menu Navigation Area (Safe-Scroll Enabled) */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            // Render logic if the item is a Dropdown (Lead Inbox)
            if (item.isDropdown) {
              return (
                <div key={item.title} className="space-y-1">
                  <button
                    onClick={() => setIsInboxOpen(!isInboxOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm group ${
                      isInboxOpen 
                        ? "text-white bg-slate-800/30" 
                        : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isInboxOpen ? "text-cyan-400" : "text-slate-400 group-hover:text-white transition-colors"} />
                      <span>{item.title}</span>
                    </div>
                    {isInboxOpen ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                  </button>

                  {/* Nested Sub-Menu Area */}
                  {isInboxOpen && (
                    <div className="pl-3 ml-4 border-l border-slate-800/80 space-y-1 mt-1 transition-all duration-300">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-xs font-semibold ${
                                isActive
                                  ? "bg-blue-600/10 text-cyan-400 border border-blue-500/20"
                                  : "text-slate-400 hover:bg-slate-800/30 hover:text-white"
                              }`
                            }
                          >
                            <ChildIcon size={14} className="shrink-0" />
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
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-blue-600/10 border border-cyan-500/20"
                      : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className={isActive ? "text-white" : "text-slate-400 group-hover:text-white transition-colors"} />
                    <span>{item.title}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer Profile Control Panel */}
      <div className="border-t border-slate-800/60 p-4 shrink-0 bg-[#070a11]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-cyan-400 font-bold text-sm shadow-inner">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-wide">Dr. Nadeem</p>
              <p className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block animate-ping" />
                System Active
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-200"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}