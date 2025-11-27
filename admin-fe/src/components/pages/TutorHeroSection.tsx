import { Calendar, BookOpen, MapPin, User } from "lucide-react";
import { Card } from "../ui/card";

export function TutorHeroSection() {
  return (
    <div
      className="relative h-[500px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxNTcxODA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
      
      <div className="container mx-auto px-4 h-full">
        <div className="relative h-full flex items-center">
          <Card className="bg-gradient-to-br from-[#1e293b] to-[#334155] text-white p-8 shadow-2xl max-w-md border-0">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-5 w-5" />
              <h2>Xin chào, Giảng viên Lê Văn B!</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 mt-0.5 opacity-80" />
                <div>
                  <p className="text-sm opacity-80 mb-1">Buổi học sắp tới</p>
                  <p>24/10/2025 - 09:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 mt-0.5 opacity-80" />
                <div>
                  <p className="text-sm opacity-80 mb-1">Môn học</p>
                  <p>Cấu trúc dữ liệu</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-5 w-5 mt-0.5 opacity-80" />
                <div>
                  <p className="text-sm opacity-80 mb-1">Giảng viên</p>
                  <p>Lê Văn B</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 opacity-80" />
                <div>
                  <p className="text-sm opacity-80 mb-1">Địa điểm</p>
                  <p>GDH6</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer Contact Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-200 text-gray-800 py-4">
        <div className="container mx-auto px-4">
          <p className="text-sm">
            <span className="">Email contact:</span> bankt@hcmut.edu.vn
          </p>
          <p className="text-sm">
            <span className="">Số điện thoại:</span> 0905xxxxxx
          </p>
          <p className="text-sm">
            Quý Thầy/Cô chưa có tài khoản (hoặc quên mật khẩu) nhà trường vui lòng liên hệ Trung tâm Dữ liệu & Công nghệ
          </p>
          <p className="text-sm">
            Thông tin, phòng 109 nhà A5 để được hỗ trợ.
          </p>
        </div>
      </div>
    </div>
  );
}
