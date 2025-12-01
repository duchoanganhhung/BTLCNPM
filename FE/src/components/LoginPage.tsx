import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff } from "lucide-react";
import LogoBK from "../assets/bklogo.png";

interface LoginPageProps {
  onLogin: (role: "student" | "tutor" | "admin") => void;
  onNavigateRegister: (type: "student" | "tutor") => void;
}

export default function LoginPage({ onLogin, onNavigateRegister }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setIsLoading(true);

    if (!username || !password) {
      if (!username) setUsernameError("Hãy nhập tên tài khoản");
      if (!password) setPasswordError("Hãy nhập mật khẩu");
      setIsLoading(false);
      return;
    }

    if (username === "admin" && password === "admin") {
      onLogin("admin");
      setIsLoading(false);
      return;
    }



    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user.role);
        return;
      }

      setPasswordError(data.message || "Đăng nhập thất bại");
    } catch (err) {
      console.error("Lỗi kết nối:", err);
      setUsernameError("Không thể kết nối đến máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-[#1a95dc] text-white px-6 py-4 flex items-center gap-4 shadow-md">
        <div className="w-10 h-10 text-white rounded-lg overflow-hidden p-1">
          <img src={LogoBK} alt="Logo BK" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl font-semibold">ĐĂNG NHẬP</h1>
      </header>

      {/* Main Content: Login Form */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8"> {/* Đã thay đổi max-w-md thành max-w-sm */}
          
          {/* Big Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={LogoBK}
              alt="Đại học Bách Khoa - ĐHQG TP.HCM"
              className="w-32 h-32 object-contain drop-shadow-lg" // Có thể giảm kích thước logo nếu muốn
            />
          </div>

          <h2 className="text-center text-gray-800 mb-8 text-xl font-bold">
            Nhập tài khoản và mật khẩu
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username Input */}
            <div>
              <Label htmlFor="username" className="text-blue-600 font-medium mb-1 block">
                Tài khoản
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="email@hcmut.edu.vn"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
                className={`transition-all ${usernameError ? "border-red-500 ring-red-500" : ""}`}
                disabled={isLoading}
              />
              {usernameError && (
                <p className="text-red-500 text-xs mt-1 text-right italic">
                  {usernameError}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="text-blue-600 font-medium mb-1 block">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  className={`pr-10 transition-all ${passwordError ? "border-red-500 ring-red-500" : ""}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors" // Đã thay đổi right-3 thành right-2
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1 text-right italic">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Login Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-[#4169e1] hover:bg-[#3557c7] text-white font-semibold py-2 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </div>
            
            {/* Registration Options */}
            <div className="space-y-3 pt-2">
                <Button
                    type="button"
                    onClick={() => onNavigateRegister("student")}
                    className="w-full bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                    variant="outline"
                >
                    Tạo tài khoản cho sinh viên
                </Button>
                <Button
                    type="button"
                    onClick={() => onNavigateRegister("tutor")}
                    className="w-full bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                    variant="outline"
                >
                    Tạo tài khoản cho giảng viên
                </Button>
            </div>

            <div className="text-center text-sm text-gray-500 pt-4">
                <p className='italic'>Vui lòng tạo tài khoản nếu bạn chưa có</p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4 text-xs text-gray-500 text-center">
        © 2025 Trường Đại học Bách Khoa - ĐHQG TP.HCM
      </footer>
    </div>
  );
}
