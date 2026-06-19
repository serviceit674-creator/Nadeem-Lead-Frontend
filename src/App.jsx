import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Whatsapp from "./pages/Whatsapp.jsx";
import Email from "./pages/Email";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import Setting from "./pages/Setting";
import Facebook from "./pages/Facebook";
import Instagram from "./pages/Instagram";
import LoginForm from "./components/LoginForm.jsx";
// import LoginLending from './pages/LoginLending.jsx'
import { Navigate } from "react-router-dom";
import SuperAdmin from "./pages/SuperAdmin.jsx";
import CreateSuperAdminPage from "./pages/CreateSuperAdminPage.jsx";
import Admin from "./pages/Admin.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  // Agar token nahi hai, login page par bhej do
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Agar token hai, dashboard/layout dikhao
  return children;
};
function App() {
  return (
    <BrowserRouter> 
      <Routes>
        {/* Public Route */}
        <Route path='/login' element={<LoginForm role="admin" title="Admin Login" subTitle="Sign in to manage the organization"/>}/>

        {/* Protected Routes (Wrapper) */}
        <Route element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Dashboard />} />
          <Route path="/SuperAdmin" element={<SuperAdmin/>}/>
          <Route path="/create" element={<CreateSuperAdminPage/>}/>
          <Route path="/leads" element={<Leads />} />
          <Route path="/whatsapp" element={<Whatsapp />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/facebook" element={<Facebook />} />
          <Route path="/instagram" element={<Instagram />} />
          <Route path="/email" element={<Email />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/team" element={<Team />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;