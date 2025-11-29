import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff } from "lucide-react";
import LogoBK from "../assets/bklogo.png";

interface LoginPageProps {
  onLogin: (role: "student" | "tutor" | "admin") => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //xong student hoặc tutor view thì uncommment useEffect này

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          const role = data.user.role === "student" ? "student" : "tutor";
          onLogin(role);
        }
      })
      .catch(() => {});
  }, [onLogin]);

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
    if (username === "student" && password === "student") {
      onLogin("student");          
      setIsLoading(false);
      return;
    }
    if (username === "tutor" && password === "tutor") {
      onLogin("tutor");          
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
        console.log("Đăng nhập thành công:", data.user);
        onLogin(data.user.role);  
        return;
      }

      // user ko tồn tại thì tự động đky với role = "student"
      // cái này chỉ để test, ae bỏ đi r làm register riêng
      if (data.message.includes("không đúng") || data.message.includes("không tồn tại")) {
        console.log("Tài khoản chưa tồn tại → Đang tự động đăng ký...");

        const registerResponse = await fetch("/api/register/student", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username,
            password,
            fullname: "Sinh viên",
          }),
        });

        if (registerResponse.ok) {
          const loginAgain = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password }),
          });

          if (loginAgain.ok) {
            const finalData = await loginAgain.json();
            console.log("Đăng ký + Đăng nhập thành công:", finalData.user);
            onLogin("student");
          }
        } else {
          const regError = await registerResponse.json();
          setUsernameError(regError.message || "Đăng ký thất bại");
        }
      } else {
        setPasswordError(data.message || "Đăng nhập thất bại");
      }
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
      <header className="bg-[#1a95dc] text-white px-6 py-4 flex items-center gap-4">
        <div className="w-10 h-10 text-white rounded-lg overflow-hidden p-1">
          <img src={LogoBK} alt="BK" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl">ĐĂNG NHẬP</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
          {/* Big Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={LogoBK}
              alt="Đại học Bách Khoa - ĐHQG TP.HCM"
              className="w-32 h-32 object-contain drop-shadow-xl"
            />
          </div>

          <h2 className="text-center text-gray-800 mb-6 text-lg font-medium">
            Nhập tài khoản và mật khẩu
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="username" className="text-blue-600">
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
                className={usernameError ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {usernameError && (
                <p className="text-red-500 text-xs mt-1 text-right">{usernameError}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-blue-600">
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
                  className={`pr-10 ${passwordError ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1 text-right">{passwordError}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-[#4169e1] hover:bg-[#3557c7] text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </Button>
            </div>
            <div className="pt-2">
              <Button
                type="button"
                onClick={()=> alert}   // Sau thay bằng onRegister()
                className="w-full bg-white border border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Tạo tài khoản cho sinh viên
              </Button>
            </div>
            <div className="pt-2">
              <Button
                type="button"
                onClick={()=> alert}   // Sau thay bằng onRegister()
                className="w-full bg-white border border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Tạo tài khoản cho giảng viên
              </Button>
            </div>
            <div className="text-center text-sm text-gray-600">
              <p>Nếu chưa có tài khoản, hệ thống sẽ tự động đăng ký</p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4 text-sm text-gray-600 text-center">
        © 2025 Trường Đại học Bách Khoa - ĐHQG TP.HCM
      </footer>
    </div>
  );
}