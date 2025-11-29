import { useState } from "react";
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

import { TutorHeroSection } from "./pages/TutorHeroSection";
import { TutorClasses } from "./pages/TutorClasses";
import { TutorSchedule } from "./pages/TutorSchedule";
import { TutorProfile } from "./pages/TutorProfile";
import { TeachingRegistration } from "./pages/TeachingRegistration";

import { Toaster } from "./ui/sonner";

interface TutorDashboardProps {
  onLogout: () => void;
}

export default function TutorDashboard({ onLogout }: TutorDashboardProps) {
  const [activeMenu, setActiveMenu] = useState("home");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const menuList = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "classes", label: "Lớp dạy", icon: Users },
    { id: "schedule", label: "Lịch dạy", icon: Calendar },
    { id: "registration", label: "Đăng ký giảng dạy", icon: FileText },
    { id: "profile", label: "Thông tin giảng viên", icon: UserCircle },
  ];

  const handleLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <header className="bg-[#1a95dc] px-6 py-4 flex items-center justify-between shadow">
          
          <div className="flex items-center gap-6">
            <img 
              src="src/assets/bklogo.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />

            <nav>
              <ul className="flex items-center gap-4">
                {menuList.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveMenu(item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition
                        ${activeMenu === item.id 
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
          {activeMenu === "home" && <TutorHeroSection />}
          {activeMenu === "classes" && <TutorClasses />}
          {activeMenu === "schedule" && <TutorSchedule />}
          {activeMenu === "registration" && <TeachingRegistration />}
          {activeMenu === "profile" && <TutorProfile />}
        </main>
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
