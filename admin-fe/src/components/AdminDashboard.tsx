import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  Bell, 
  Activity,
  Calendar,
  BookOpen,
  MessageSquare,
  Shield,
  Menu,
  X,
  BarChart3,
  LogOut,
  UserCircle,
  ChevronDown
} from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

// Import các page components
import DashboardPage from "./pages/DashboardPage";
import UserManagementPage from "./pages/UserManagementPage";
import ClassManagementPage from "./pages/ClassManagementPage";
import MaterialsPage from "./pages/MaterialsPage";
import NotificationsPage from "./pages/NotificationsPage";
import ReportsPage from "./pages/ReportsPage";
import SystemSettingsPage from "./pages/SystemSettingsPage";
import MonitoringPage from "./pages/MonitoringPage";
import FeedbackPage from "./pages/FeedbackPage";
import SecurityPage from "./pages/SecurityPage";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Quản lý người dùng", id: "users" },
  { icon: Calendar, label: "Lớp học & Lịch học", id: "classes" },
  { icon: BookOpen, label: "Học liệu & Tài liệu", id: "materials" },
  { icon: Bell, label: "Thông báo", id: "notifications" },
  { icon: BarChart3, label: "Báo cáo", id: "reports" },
  { icon: Settings, label: "Cấu hình hệ thống", id: "settings" },
  { icon: Activity, label: "Giám sát & Logs", id: "monitoring" },
  { icon: MessageSquare, label: "Phản hồi", id: "feedback" },
  { icon: Shield, label: "Bảo mật", id: "security" },
];

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    // Xóa session/token (trong thực tế sẽ call API logout)
    console.log("Đăng xuất...");
    setShowLogoutDialog(false);
    onLogout();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-[#1a95dc] text-white transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#1a95dc]">BK</span>
            </div>
            <span>Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === item.id
                      ? "bg-white text-[#1a95dc]"
                      : "hover:bg-white/10"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/20 space-y-2">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p>Admin User</p>
              <p className="text-white/60">admin@hcmut.edu.vn</p>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white/90"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <h1 className="text-black">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 h-auto py-2 px-3">
                    <div className="text-right">
                      <p className="text-black">Admin</p>
                      <p className="text-gray-500">Administrator</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <UserCircle className="w-4 h-4 mr-2" />
                    Thông tin cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => setShowLogoutDialog(true)}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeMenu === "dashboard" && <DashboardPage />}
          {activeMenu === "users" && <UserManagementPage />}
          {activeMenu === "classes" && <ClassManagementPage />}
          {activeMenu === "materials" && <MaterialsPage />}
          {activeMenu === "notifications" && <NotificationsPage />}
          {activeMenu === "reports" && <ReportsPage />}
          {activeMenu === "settings" && <SystemSettingsPage />}
          {activeMenu === "monitoring" && <MonitoringPage />}
          {activeMenu === "feedback" && <FeedbackPage />}
          {activeMenu === "security" && <SecurityPage />}
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận đăng xuất</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}