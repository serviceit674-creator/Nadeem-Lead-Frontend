import { Bell, Search, User, ChevronDown, Command } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left: Breadcrumbs or Current Page Title */}
      <div className="flex items-center gap-2 text-slate-500">
        <span className="text-sm font-medium">CRM</span>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-semibold text-blue-600">Leads Pipeline</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search leads..."
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
          <Bell size={20} />
          {/* Notification Dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Dropdown Placeholder */}
        <div className="flex items-center gap-2 pl-4 border-l cursor-pointer hover:opacity-80">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
            AD
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}