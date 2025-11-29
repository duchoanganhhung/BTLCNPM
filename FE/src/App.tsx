import { useState, useEffect } from "react";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import StudentDashboard from "./components/StudentDashboard"
//import TutorDashboard from "./components/TutorDashboard"
export default function App() {
   const [currentView, setCurrentView] = useState<
    "login" | "student" | "tutor" | "admin" | "register_student" | "register_tutor" >("login");

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
        {currentView === "student" && <StudentDashboard onLogout={handleLogout} />}
        {/*{currentView === "tutor" && <TutorDashboard onLogout={handleLogout} />} */}
        {currentView === "admin" && <AdminDashboard onLogout={handleLogout} />}
      </div>
    );
}