import { useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import StudentDashboard from "./components/StudentDashboard";
import TutorDashboard from "./components/TutorDashboard";
import RegisterStudent from "./components/RegisterStudentPage";
import RegisterTutor from "./components/RegisterTutorPage";

export default function App() {
  const [currentView, setCurrentView] = useState<
    | "login"
    | "student"
    | "tutor"
    | "admin"
    | "register_student"
    | "register_tutor"
  >("login");

  const handleLogin = (role: "student" | "tutor" | "admin") => {
    setCurrentView(role);
  };

  const navigateToRegister = (type: "student" | "tutor") => {
    if (type === "student") setCurrentView("register_student");
    else setCurrentView("register_tutor");
  };

  const handleLogout = () => {
    fetch("/api/logout", { method: "POST", credentials: "include" });
    setCurrentView("login");
  };

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