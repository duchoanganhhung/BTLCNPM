import { useState } from "react";

export default function RegisterStudentPage({ onBack }) {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("/api/register/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, fullname, password })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) onBack();
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Đăng ký tài khoản Sinh viên</h2>

      <input className="border p-2 w-full mb-3" placeholder="Họ và tên"
        onChange={(e) => setFullname(e.target.value)} />

      <input className="border p-2 w-full mb-3" placeholder="Tên đăng nhập"
        onChange={(e) => setUsername(e.target.value)} />

      <input className="border p-2 w-full mb-3" type="password" placeholder="Mật khẩu"
        onChange={(e) => setPassword(e.target.value)} />

      <button className="bg-blue-600 text-white p-2 rounded w-full mb-3"
        onClick={handleRegister}>Đăng ký</button>

      <button className="underline text-center w-full" onClick={onBack}>
        ← Quay lại trang đăng nhập
      </button>
    </div>
  );
}
