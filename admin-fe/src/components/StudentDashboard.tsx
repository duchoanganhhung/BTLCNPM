import { useState } from "react";
import { 
  Home,
  Calendar,
  UserCircle,
  FileText,
  BookOpen,
  MessageSquare,
  GraduationCap,
  Users,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";

// ===== Student Pages =====
import { HeroSection } from "./pages/HeroSection";
import { AcademicManagement } from "./pages/AcademicManagement";
import { ScheduleTable } from "./pages/ScheduleTable";
import { MySchedule } from "./pages/MySchedule";
import { Profile } from "./pages/Profile";
import { Documents } from "./pages/Documents";
import { CourseRegistration } from "./pages/CourseRegistration";
import { Feedback } from "./pages/Feedback";
import { ChatView } from "./pages/ChatView";

// ===== Tutor Pages =====
import { TutorHeroSection } from "./pages/TutorHeroSection";
import { TutorClasses } from "./pages/TutorClasses";
import { TutorSchedule } from "./pages/TutorSchedule";
import { TutorProfile } from "./pages/TutorProfile";
import { TeachingRegistration } from "./pages/TeachingRegistration";

import { Toaster } from "./ui/sonner";

interface StudentDashboardProps {
  onLogout: () => void;
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [mode, setMode] = useState<"student" | "tutor">("student");
  const [activeMenu, setActiveMenu] = useState("home");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const studentMenu = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "academic", label: "Quản lý học tập", icon: BookOpen },
    { id: "schedule", label: "Thời khóa biểu", icon: Calendar },
    { id: "registration", label: "Đăng ký môn học", icon: FileText },
    { id: "feedback", label: "Phản hồi", icon: MessageSquare },
    { id: "profile", label: "Thông tin cá nhân", icon: UserCircle },
    { id: "documents", label: "Tài liệu", icon: FileText },
  ];

  const tutorMenu = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "classes", label: "Lớp dạy", icon: Users },
    { id: "schedule", label: "Lịch dạy", icon: Calendar },
    { id: "registration", label: "Đăng ký giảng dạy", icon: FileText },
    { id: "feedback", label: "Phản hồi", icon: MessageSquare },
    { id: "profile", label: "Thông tin giảng viên", icon: UserCircle },
    { id: "documents", label: "Tài liệu", icon: FileText },
  ];

  const menuList = mode === "student" ? studentMenu : tutorMenu;

  const switchMode = () => {
    setMode(mode === "student" ? "tutor" : "student");
    setActiveMenu("home");
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    onLogout(); // gọi lên App xử lý logout thật (xóa session, redirect...)
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* ----- SIDEBAR ----- */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0"} bg-[#1a95dc] text-white transition-all duration-300 overflow-hidden`}>
        <div className="p-6 flex items-center justify-between border-b border-white/20">
          <h1 className="text-lg font-semibold">{mode === "student" ? "Student Portal" : "Tutor Portal"}</h1>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuList.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeMenu === item.id ? "bg-white text-[#1a95dc]" : "hover:bg-white/10"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mode Switch */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={switchMode}
            className="w-full px-4 py-3 flex items-center gap-3 rounded-lg bg-white text-[#1a95dc]"
          >
            {mode === "student" ? <GraduationCap /> : <UserCircle />}
            {mode === "student" ? "Chuyển sang Giảng viên" : "Chuyển sang Sinh viên"}
          </button>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* ----- MAIN CONTENT ----- */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
          <h2 className="text-lg font-semibold">{mode === "student" ? "Student Dashboard" : "Tutor Dashboard"}</h2>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {mode === "student" && activeMenu === "home" && (
            <>
              <HeroSection />
              <ScheduleTable />
            </>
          )}
          {mode === "student" && activeMenu === "academic" && <AcademicManagement />}
          {mode === "student" && activeMenu === "schedule" && <MySchedule />}
          {mode === "student" && activeMenu === "registration" && <CourseRegistration />}
          {mode === "student" && activeMenu === "feedback" && <Feedback mode="student" />}
          {mode === "student" && activeMenu === "profile" && <Profile />}
          {mode === "student" && activeMenu === "documents" && <Documents />}

          {mode === "tutor" && activeMenu === "home" && <TutorHeroSection />}
          {mode === "tutor" && activeMenu === "classes" && <TutorClasses />}
          {mode === "tutor" && activeMenu === "schedule" && <TutorSchedule />}
          {mode === "tutor" && activeMenu === "registration" && <TeachingRegistration />}
          {mode === "tutor" && activeMenu === "feedback" && <Feedback mode="tutor" />}
          {mode === "tutor" && activeMenu === "profile" && <TutorProfile />}
          {mode === "tutor" && activeMenu === "documents" && <Documents />}
        </main>
      </div>

      {/* Chat */}
      {isChatOpen && <ChatView onClose={() => setIsChatOpen(false)} />}

      {/* Toaster */}
      <Toaster />

      {/* Logout Confirmation Dialog */}
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
