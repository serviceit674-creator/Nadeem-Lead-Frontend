import React, { useState } from "react";
import { Phone, Video, Send, Paperclip, Mail, BookOpen, MoreHorizontal } from "lucide-react";

const facebookUsers = [
  { id: 3, name: "Rao Sahab Mohit", platform: "Messenger", message: "Ok", time: "1h", unread: 1, avatar: "https://i.pravatar.cc/150?img=3", phone: "+91 91234 56789", email: "rao@tech.com", course: "BBA" },
  { id: 6, name: "Amit Kumar", platform: "Messenger", message: "I'm interested", time: "45m", unread: 0, avatar: "https://i.pravatar.cc/150?img=8", phone: "+91 98765 33333", email: "amit@mail.com", course: "B.Tech" },
  { id: 9, name: "Deepika", platform: "Messenger", message: "Need brochure", time: "6h", unread: 0, avatar: "https://i.pravatar.cc/150?img=12", phone: "+91 98765 66666", email: "deepika@mail.com", course: "B.Tech" },
];

export default function FacebookInbox() {
  const [selectedUser, setSelectedUser] = useState(facebookUsers[0]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "user", text: "I filled out the Facebook Lead Form." },
    { id: 2, sender: "me", text: "Thank you for connecting! Our executive will share the details." },
  ]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "me", text: inputValue }]);
    setInputValue("");
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      
      {/* 1. LEFT USER LIST */}
      <div className="w-[360px] bg-white border-r flex flex-col shadow-sm">
        <div className="p-5 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Facebook Chats</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {facebookUsers.length} Leads
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {facebookUsers.map((user) => (
            <div 
              key={user.id} 
              onClick={() => setSelectedUser(user)}
              className={`cursor-pointer px-4 py-3.5 flex items-center gap-3 transition-all ${
                selectedUser.id === user.id ? "bg-blue-50/70 border-r-4 border-blue-600" : "hover:bg-slate-50"
              }`}
            >
              <img src={user.avatar} className="w-11 h-11 rounded-full object-cover shadow-sm" alt="" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold text-slate-800 text-sm truncate">{user.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{user.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{user.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. MAIN CHAT CONTAINER */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Chat Header */}
        <div className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <img src={selectedUser.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
            <div>
              <h3 className="font-semibold text-sm text-slate-800">{selectedUser.name}</h3>
              <p className="text-[10px] text-blue-600 font-bold">Messenger Live Hook</p>
            </div>
          </div>
          <div className="flex gap-5 text-slate-500">
            <Phone size={18} className="cursor-pointer hover:text-slate-800" />
            <Video size={18} className="cursor-pointer hover:text-slate-800" />
            <MoreHorizontal size={18} className="cursor-pointer hover:text-slate-800" />
          </div>
        </div>

        {/* Chat Messages Section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[65%] px-4 py-2.5 rounded-2xl shadow-xs text-sm leading-relaxed ${
                msg.sender === "me" ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-200 text-slate-800 rounded-tl-none"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Footer */}
        <div className="bg-white p-4 flex items-center gap-3 border-t">
          <Paperclip size={20} className="text-slate-400 cursor-pointer hover:text-slate-600" />
          <input 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
            className="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 outline-none text-sm border border-slate-200 focus:border-blue-600 transition-colors" 
            placeholder="Type a message on Messenger..." 
          />
          <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 p-2.5 rounded-xl text-white shadow-sm transition-colors">
            <Send size={15} />
          </button>
        </div>
      </div>

      {/* 3. RIGHT LEAD PANEL */}
      <div className="w-[300px] bg-white border-l p-6 hidden xl:block">
        <div className="flex flex-col items-center text-center border-b pb-6">
          <img src={selectedUser.avatar} className="w-20 h-20 rounded-full mb-3 ring-4 ring-blue-50 object-cover shadow-md" alt="" />
          <h2 className="font-bold text-slate-800 text-base">{selectedUser.name}</h2>
          <span className="mt-1 px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-full text-[10px] tracking-wider uppercase">
            Meta Lead Profiles
          </span>
        </div>
        
        <div className="mt-6 space-y-5">
          {[
            { label: "Contact No.", value: selectedUser.phone, icon: <Phone size={14}/> },
            { label: "Email Registered", value: selectedUser.email, icon: <Mail size={14}/> },
            { label: "Stream Mapping", value: selectedUser.course, icon: <BookOpen size={14}/> },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 items-start">
              <div className="text-blue-600 p-1.5 bg-blue-50 rounded-lg mt-0.5">{item.icon}</div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{item.label}</p>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}