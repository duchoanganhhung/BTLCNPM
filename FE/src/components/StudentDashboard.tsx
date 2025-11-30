import { useState } from "react";
import { 
  Home,
  Calendar,
  UserCircle,
  FileText,
  BookOpen,
  MessageSquare,
  Users,
  LogOut,
} from "lucide-react";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";

import { HeroSection } from "./pages/HeroSection";
import { AcademicManagement } from "./pages/AcademicManagement";
import { ScheduleTable } from "./pages/ScheduleTable";
import { MySchedule } from "./pages/MySchedule";
import { Profile } from "./pages/Profile";
import { Documents } from "./pages/Documents";
import { CourseRegistration } from "./pages/CourseRegistration";
import { Feedback } from "./pages/Feedback";
import { ChatView } from "./pages/ChatView";

import { Toaster } from "./ui/sonner";

interface StudentDashboardProps {
  onLogout: () => void;
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [activeMenu, setActiveMenu] = useState("home");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // --- ONLY STUDENT MENU ---
  const studentMenu = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "academic", label: "Quản lý học tập", icon: BookOpen },
    { id: "schedule", label: "Thời khóa biểu", icon: Calendar },
    { id: "registration", label: "Đăng ký môn học", icon: FileText },
    { id: "feedback", label: "Phản hồi", icon: MessageSquare },
    { id: "profile", label: "Thông tin cá nhân", icon: UserCircle },
    { id: "documents", label: "Tài liệu", icon: FileText },
  ];

  const handleLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* ----- MAIN CONTENT ----- */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className="bg-[#1a95dc] px-6 py-4 flex items-center justify-between shadow">
          
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-6">

            {/* Logo */}
            <img 
              src="src/assets/bklogo.png" 
              alt="Logo" 
              className="h-10 w-auto object-contain"
            />

            {/* Horizontal Menu */}
            <nav>
              <ul className="flex items-center gap-4">
                {studentMenu.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveMenu(item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition
                        ${activeMenu === item.id 
                          ? "bg-[#1a95dc] text-white" 
                          : "hover:bg-gray-100"}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right: Logout */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowLogoutDialog(true)}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </Button>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeMenu === "home" && (
            <>
              <HeroSection />
              <ScheduleTable />
            </>
          )}
          {activeMenu === "academic" && <AcademicManagement />}
          {activeMenu === "schedule" && <MySchedule />}
          {activeMenu === "registration" && <CourseRegistration />}
          {activeMenu === "feedback" && <Feedback mode="student" />}
          {activeMenu === "profile" && <Profile />}
          {activeMenu === "documents" && <Documents />}
        </main>
      </div>

      {/* Chat */}
      {isChatOpen && <ChatView onClose={() => setIsChatOpen(false)} />}

      {/* Toaster */}
      <Toaster />

      {/* Logout Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận đăng xuất</DialogTitle>
            <DialogDescription>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>Hủy</Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
