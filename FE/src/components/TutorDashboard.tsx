import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home,
  Calendar,
  UserCircle,
  FileText,
  Users,
  LogOut
} from "lucide-react";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";

import { Documents } from "./pages/Documents";
import { TutorFooter} from "./pages/TutorFooter";
import { TutorHeroSection } from "./pages/TutorHeroSection";
import { TutorClasses } from "./pages/TutorClasses";
import { TutorSchedule } from "./pages/TutorSchedule";
import { TutorProfile } from "./pages/TutorProfile";
import { TeachingRegistration } from "./pages/TeachingRegistration";

import { Toaster } from "./ui/sonner";
import LogoBK from "../assets/bklogo.png";

interface TutorDashboardProps {
  onLogout: () => void;
}

export default function TutorDashboard({ onLogout }: TutorDashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const menuList = [
    { id: "trang_chu", label: "Trang chủ", icon: Home, path: "/tutor/trang_chu" },
    { id: "lop_day", label: "Lớp dạy", icon: Users, path: "/tutor/lop_day" },
    { id: "lich_day", label: "Lịch dạy", icon: Calendar, path: "/tutor/lich_day" },
    { id: "dang_ky_giang_day", label: "Đăng ký giảng dạy", icon: FileText, path: "/tutor/dang_ky_giang_day" },
    { id: "thong_tin", label: "Thông tin giảng viên", icon: UserCircle, path: "/tutor/thong_tin" },
    { id: "tai_lieu", label: "Tài liệu", icon: FileText, path: "/tutor/tai_lieu" },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  const activeMenuId = menuList.find(item => item.path === location.pathname)?.id || "trang_chu";

  const renderContent = () => {
    switch (location.pathname) {
      case "/tutor/trang_chu":
        return <TutorHeroSection />;
      case "/tutor/lop_day":
        return <TutorClasses />;
      case "/tutor/lich_day":
        return <TutorSchedule />;
      case "/tutor/dang_ky_giang_day":
        return <TeachingRegistration />;
      case "/tutor/thong_tin":
        return <TutorProfile />;
      case "/tutor/tai_lieu":
        return <Documents />;
      default:
        return <TutorHeroSection />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100" key={location.pathname}>
      <div className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <header className="bg-[#1a95dc] px-6 py-4 flex items-center justify-between shadow">
          
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 text-white rounded-lg overflow-hidden p-1">
              <img src={LogoBK} alt="Logo BK" className="w-full h-full object-contain" />
            </div>
            <nav>
              <ul className="flex items-center gap-4">
                {menuList.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuClick(item.path)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition
                        ${activeMenuId === item.id 
                          ? "bg-white text-[#1a95dc]" 
                          : "hover:bg-gray-100 text-white"}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <Button
              variant="ghost"
              onClick={() => setShowLogoutDialog(true)}
              className="flex items-center gap-2 text-white"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </Button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
        <TutorFooter />
      </div>

      <Toaster />

      {/* Logout Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận đăng xuất</DialogTitle>
            <DialogDescription>Bạn có chắc muốn đăng xuất?</DialogDescription>
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