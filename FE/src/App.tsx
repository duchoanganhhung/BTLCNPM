import { useState, useEffect } from "react";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import StudentDashboard from "./components/StudentDashboard";
import TutorDashboard from "./components/TutorDashboard";
import RegisterStudent from "./components/RegisterStudentPage";
import RegisterTutor from "./components/RegisterTutorPage";

export default function App() {
  const [currentView, setCurrentView] = useState<
    "loading" | "login" | "student" | "tutor" | "admin" | "register_student" | "register_tutor"
  >("loading");

  // ⭐ Khi F5 → kiểm tra session từ backend
  useEffect(() => {
    fetch("/api/check-auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentView(data.user.role as "student" | "tutor" | "admin");
        } else {
          setCurrentView("login");
        }
      })
      .catch(() => setCurrentView("login"));
  }, []);

  // ⭐ Hàm login
  const handleLogin = (role: "student" | "tutor" | "admin") => {
    setCurrentView(role);
  };

  // ⭐ Điều hướng tới trang register
  const navigateToRegister = (type: "student" | "tutor") => {
    if (type === "student") setCurrentView("register_student");
    else setCurrentView("register_tutor");
  };

  // ⭐ Logout
  const handleLogout = () => {
    fetch("/api/logout", { method: "POST", credentials: "include" });
    setCurrentView("login");
  };

  // --- LOADING VIEW ---
  if (currentView === "loading") {
    return <div>Đang kiểm tra đăng nhập...</div>;
  }

  // --- RENDER VIEW ---
  switch (currentView) {
    case "login":
      return <LoginPage onLogin={handleLogin} onNavigateRegister={navigateToRegister} />;

    case "register_student":
      return <RegisterStudent onBack={() => setCurrentView("login")} />;

    case "register_tutor":
      return <RegisterTutor onBack={() => setCurrentView("login")} />;

    case "student":
      return <StudentDashboard onLogout={handleLogout} />;

    case "tutor":
      return <TutorDashboard onLogout={handleLogout} />;

    case "admin":
      return <AdminDashboard onLogout={handleLogout} />;

    default:
      return null;
  }
}
