import { useState, useEffect } from "react";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";

export default function App() {
  const [currentView, setCurrentView] = useState<"login" | "student" | "tutor" | "admin">("login");

  const handleLogin = (role: "student" | "tutor" | "admin") => {
    setCurrentView(role);
  };

  const handleLogout = () => {
    //if (currentView !== "admin") {
      fetch("/api/logout", { method: "POST", credentials: "include" });
    //}
    setCurrentView("login");
  };

  if (currentView === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  //xong view nào uncomment cái đó
  return (
    <div>
      {/* {currentView === "student" && <StudentDashboard onLogout={handleLogout} />}
      {currentView === "tutor" && <TutorDashboard onLogout={handleLogout} />} */}
      {currentView === "admin" && <AdminDashboard onLogout={handleLogout} />}
    </div>
  );
}