import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar"

export default function AppLayout() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-61 min-h-screen ">
        
        <Outlet />
      </main>
    </div>
  );
}