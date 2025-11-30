import { useState } from "react";
import { Button } from "./ui/button"; // dùng component button nếu có sẵn
import { Input } from "./ui/input";   // dùng component input nếu có sẵn
import { Label } from "./ui/label";   // dùng Label nếu muốn đồng bộ

interface RegisterStudentPageProps {
  onBack: () => void;
}

export default function RegisterStudentPage({ onBack }: RegisterStudentPageProps) {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setIsLoading(true);
    setError("");

    if (!username || !fullname || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, fullname, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Đăng ký thành công!");
        onBack();
      } else {
        setError(data.message || "Đăng ký thất bại");
      }
    } catch (err) {
      setError("Không thể kết nối đến máy chủ");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Đăng ký tài khoản Sinh viên
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="space-y-4">
          <div>
            <Label htmlFor="fullname" className="text-gray-700">Họ và tên</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Nguyễn Văn A"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="username" className="text-gray-700">Tên đăng nhập</Label>
            <Input
              id="username"
              type="text"
              placeholder="email@hcmut.edu.vn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            onClick={handleRegister}
            className="w-full bg-blue-600 hover:bg-blue-700 text-black font-medium py-2 rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>

          <button
            onClick={onBack}
            className="w-full text-blue-600 hover:underline text-sm text-center"
          >
            ← Quay lại trang đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
