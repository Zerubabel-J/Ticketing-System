import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MainLayout from "./layouts/MainLayout";
import EditTicket from "./components/EditTicket";
import ManageUsers from "./components/ManageUsers";
import AdminEditTicket from "./components/AdminEditTicket";
import { Services } from "./pages/Services";
import AdminManageTickets from "./components/AdminManageTickets";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/edit-ticket/:id" element={<EditTicket />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />}>
              <Route path="tickets" element={<AdminManageTickets />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="edit-ticket/:id" element={<AdminEditTicket />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
