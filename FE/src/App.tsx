import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import StudentDashboard from "./components/StudentDashboard";
import TutorDashboard from "./components/TutorDashboard";
import RegisterStudent from "./components/RegisterStudentPage";
import RegisterTutor from "./components/RegisterTutorPage";

function ProtectedRoute({ 
  children, 
  isAllowed, 
  redirectTo = "/login" 
}: { 
  children: React.ReactNode; 
  isAllowed: boolean; 
  redirectTo?: string;
}) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState<
    "loading" | "login" | "student" | "tutor" | "admin"
  >("loading");
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // ⭐ Khi F5 → kiểm tra session từ backend
  useEffect(() => {
    fetch("/api/check-auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          const role = data.user.role as "student" | "tutor" | "admin";
          setCurrentView(role);
        } else {
          setCurrentView("login");
          if (location.pathname !== "/login" && 
              !location.pathname.startsWith("/register")) {
            navigate("/login", { replace: true });
          }
        }
        setIsAuthChecked(true);
      })
      .catch(() => {
        setCurrentView("login");
        if (location.pathname !== "/login" && 
            !location.pathname.startsWith("/register")) {
          navigate("/login", { replace: true });
        }
        setIsAuthChecked(true);
      });
  }, []);

  // ⭐ Hàm login
  const handleLogin = (role: "student" | "tutor" | "admin") => {
    setCurrentView(role);
    if (role === "student") navigate("/trang_chu", { replace: true });
    else if (role === "tutor") navigate("/tutor/trang_chu", { replace: true });
    else if (role === "admin") navigate("/admin/dashboard", { replace: true });
  };

  // ⭐ Logout
  const handleLogout = () => {
    fetch("/api/logout", { method: "POST", credentials: "include" })
      .then(() => {
        setCurrentView("login");
        navigate("/login", { replace: true });
      })
      .catch(() => {
        setCurrentView("login");
        navigate("/login", { replace: true });
      });
  };

  // --- LOADING VIEW ---
  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    );
  }

  // --- ROUTES ---
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          currentView !== "login" ? (
            <Navigate 
              to={
                currentView === "student" ? "/trang_chu" :
                currentView === "tutor" ? "/tutor/trang_chu" :
                "/admin/dashboard"
              } 
              replace 
            />
          ) : (
            <LoginPage 
              onLogin={handleLogin} 
              onNavigateRegister={(type) => navigate(`/register/${type}`)} 
            />
          )
        } 
      />
      
      <Route 
        path="/register/student" 
        element={<RegisterStudent onBack={() => navigate("/login")} />} 
      />
      
      <Route 
        path="/register/tutor" 
        element={<RegisterTutor onBack={() => navigate("/login")} />} 
      />

      {/* Student Routes - Protected */}
      <Route 
        path="/trang_chu" 
        element={
          <ProtectedRoute isAllowed={currentView === "student"}>
            <StudentDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/quan_ly_hoc_tap" 
        element={
          <ProtectedRoute isAllowed={currentView === "student"}>
            <StudentDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/thoi_khoa_bieu" 
        element={
          <ProtectedRoute isAllowed={currentView === "student"}>
            <StudentDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dang_ky_mon_hoc" 
        element={
          <ProtectedRoute isAllowed={currentView === "student"}>
            <StudentDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/phan_hoi" 
        element={
          <ProtectedRoute isAllowed={currentView === "student"}>
            <StudentDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/thong_tin_ca_nhan" 
        element={
          <ProtectedRoute isAllowed={currentView === "student"}>
            <StudentDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tai_lieu" 
        element={
          <ProtectedRoute isAllowed={currentView === "student"}>
            <StudentDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />

      {/* Tutor Routes - Protected */}
      <Route 
        path="/tutor/trang_chu" 
        element={
          <ProtectedRoute isAllowed={currentView === "tutor"}>
            <TutorDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tutor/lop_day" 
        element={
          <ProtectedRoute isAllowed={currentView === "tutor"}>
            <TutorDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tutor/lich_day" 
        element={
          <ProtectedRoute isAllowed={currentView === "tutor"}>
            <TutorDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tutor/dang_ky_giang_day" 
        element={
          <ProtectedRoute isAllowed={currentView === "tutor"}>
            <TutorDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tutor/thong_tin" 
        element={
          <ProtectedRoute isAllowed={currentView === "tutor"}>
            <TutorDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tutor/tai_lieu" 
        element={
          <ProtectedRoute isAllowed={currentView === "tutor"}>
            <TutorDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />

      {/* Admin Routes - Protected */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute isAllowed={currentView === "admin"}>
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/nguoi_dung" 
        element={
          <ProtectedRoute isAllowed={currentView === "admin"}>
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/lop_hoc" 
        element={
          <ProtectedRoute isAllowed={currentView === "admin"}>
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/tai_lieu" 
        element={
          <ProtectedRoute isAllowed={currentView === "admin"}>
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/thong_bao" 
        element={
          <ProtectedRoute isAllowed={currentView === "admin"}>
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/bao_cao" 
        element={
          <ProtectedRoute isAllowed={currentView === "admin"}>
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/cau_hinh" 
        element={
          <ProtectedRoute isAllowed={currentView === "admin"}>
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/giam_sat" 
        element={
          <ProtectedRoute isAllowed={currentView === "admin"}>
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/phan_hoi" 
        element={
          <ProtectedRoute isAllowed={currentView === "admin"}>
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/bao_mat" 
        element={
          <ProtectedRoute isAllowed={currentView === "admin"}>
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } 
      />

      {/* Default redirect */}
      <Route 
        path="/" 
        element={
          <Navigate 
            to={
              currentView === "student" ? "/trang_chu" :
              currentView === "tutor" ? "/tutor/trang_chu" :
              currentView === "admin" ? "/admin/dashboard" :
              "/login"
            } 
            replace 
          />
        } 
      />

      {/* Catch all - redirect to appropriate page */}
      <Route 
        path="*" 
        element={
          <Navigate 
            to={
              currentView === "student" ? "/trang_chu" :
              currentView === "tutor" ? "/tutor/dashboard" :
              currentView === "admin" ? "/admin/dashboard" :
              "/login"
            } 
            replace 
          />
        } 
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}