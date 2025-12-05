import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

import LogoBK from "../assets/bklogo.png";

interface StudentDashboardProps {
  onLogout: () => void;
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const studentMenu = [
    { id: "trang_chu", label: "Trang chủ", icon: Home, path: "/trang_chu" },
    { id: "quan_ly_hoc_tap", label: "Quản lý học tập", icon: BookOpen, path: "/quan_ly_hoc_tap" },
    { id: "thoi_khoa_bieu", label: "Thời khóa biểu", icon: Calendar, path: "/thoi_khoa_bieu" },
    { id: "dang_ky_mon_hoc", label: "Đăng ký môn học", icon: FileText, path: "/dang_ky_mon_hoc" },
    { id: "phan_hoi", label: "Phản hồi", icon: MessageSquare, path: "/phan_hoi" },
    { id: "thong_tin_ca_nhan", label: "Thông tin cá nhân", icon: UserCircle, path: "/thong_tin_ca_nhan" },
    { id: "tai_lieu", label: "Tài liệu", icon: FileText, path: "/tai_lieu" },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  const activeMenuId = studentMenu.find(item => item.path === location.pathname)?.id || "trang_chu";

  const renderContent = () => {
    switch (location.pathname) {
      case "/trang_chu":
        return (
          <>
            <HeroSection />
            <MySchedule />
          </>
        );
      case "/quan_ly_hoc_tap":
        return <AcademicManagement />;
      case "/thoi_khoa_bieu":
        return <ScheduleTable />;
      case "/dang_ky_mon_hoc":
        return <CourseRegistration />;
      case "/phan_hoi":
        return <Feedback mode="student" />;
      case "/thong_tin_ca_nhan":
        return <Profile />;
      case "/tai_lieu":
        return <Documents />;
      default:
        return (
          <>
            <HeroSection />
            <MySchedule />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" key={location.pathname}>
      {/* ----- MAIN CONTENT ----- */}
      <div className="flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Left: Logo + Menu */}
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 text-white rounded-lg overflow-hidden p-1">
                              <img src={LogoBK} alt="Logo BK" className="w-full h-full object-contain" />
                            </div>

                {/* Menu */}
                <nav className="hidden md:flex items-center gap-1">
                  {studentMenu.map(item => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => handleMenuClick(item.path)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition
                        ${activeMenuId === item.id
                          ? "bg-[#1a95dc] text-white"
                          : "hover:bg-gray-100"}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </div>

              {/* Right: Logout */}
              <Button
                variant="ghost"
                onClick={() => setShowLogoutDialog(true)}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
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
            <DialogDescription>
              Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>Hủy</Button>
            <Button onClick={handleLogout}>Đăng xuất</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}