import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ForgetPinPage from './pages/ForgetPinPage';
import DashboardPage from './pages/doctor/DashboardPage';
import DoctorMiniSite from './pages/public/DoctorMiniSite';
import BaDashboardPage from './pages/ba/BaDashboardPage';
import BaSignupPage from './pages/ba/BaSignupPage';
import BaLoginPage from './pages/ba/BaLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

function App() {
  // Set dark theme by default
  document.documentElement.classList.add('dark');

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/d/:shortId" element={<DoctorMiniSite />} />

      {/* Auth Routes */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget-pin" element={<ForgetPinPage />} />

      {/* Doctor Routes */}
      <Route path="/doctor/dashboard" element={<DashboardPage />} />

      {/* BA Routes */}
      <Route path="/ba/dashboard" element={<BaDashboardPage />} />
      <Route path="/ba/signup" element={<BaSignupPage />} />
      <Route path="/ba/login" element={<BaLoginPage />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
    </Routes>
  );
}

export default App;
