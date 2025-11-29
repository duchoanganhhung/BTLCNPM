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
import { TutorHeader } from "./pages/TutorHeader";
import { TutorFooter } from "./pages/TutorFooter";

import { Toaster } from "./ui/sonner";

interface TutorDashboardProps {
  onLogout: () => void;
}

export default function TutorDashboard({ onLogout }: TutorDashboardProps) {
  const [mode, setMode] = useState<"student" | "tutor">("tutor");
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
    <div className="flex h-screen bg-gray-100 overflow-hidden">  
      {/* ----- MAIN CONTENT ----- */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
  <header className="bg-[#3BA5DB] px-6 py-4 flex items-center justify-between shadow">
  {/* Left side: Logo + Menu */}
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
        {menuList.map(item => ( 
          <li key={item.id}>
            <button
              onClick={() => setActiveMenu(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition
                ${activeMenu === item.id 
                  ? "bg-[#3BA5DB] text-white" 
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

  {/* Right side: Mode Switch + Logout */}
  <div className="flex items-center gap-3">
    <Button
      onClick={switchMode}
      className="flex items-center gap-2 px-4 py-2 bg-[#3BA5DB] text-white"
    >
      {mode === "student" ? <GraduationCap /> : <UserCircle />}
      {mode === "student" ? "Giảng viên" : "Sinh viên"}
    </Button>

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


        <main className="flex-1 overflow-auto bg-transparent">
          
          {mode === "tutor" && activeMenu === "home" && (
                <div className="flex-1 min-h-0"> 
                    <TutorHeroSection />
                </div>
          )}


          {mode === "tutor" && activeMenu === "classes" && <TutorClasses />}
          {mode === "tutor" && activeMenu === "schedule" && <TutorSchedule />}
          {mode === "tutor" && activeMenu === "registration" && <TeachingRegistration />}
          {mode === "tutor" && activeMenu === "feedback" && <Feedback mode="tutor" />}
          {mode === "tutor" && activeMenu === "profile" && <TutorProfile />}
          {mode === "tutor" && activeMenu === "documents" && <Documents />}
        </main>
        <TutorFooter />
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
