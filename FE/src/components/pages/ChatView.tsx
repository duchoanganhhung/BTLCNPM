import { X, Send, MoreVertical, Calendar, Clock, MapPin, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { useState } from "react";

interface ChatViewProps {
  onClose: () => void;
}

export function ChatView({ onClose }: ChatViewProps) {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 bg-white z-50 flex">
      {/* Left Panel - Schedule Info */}
      <div className="w-[400px] border-r bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 left-4"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="mt-16 flex-1">
          <Card className="bg-gradient-to-br from-[#1e293b] to-[#334155] text-white p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm opacity-90">Xin chào, Nguyễn Văn A!</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 mt-0.5 opacity-80" />
                <div>
                  <p className="text-sm opacity-80 mb-1">Buổi học sắp tới: 24/10/2025 - 09:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <div className="w-4 h-4 bg-white/20 rounded" />
                </div>
                <div>
                  <p className="text-sm">Môn học: Cấu trúc dữ liệu</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-5 w-5 mt-0.5 opacity-80" />
                <div>
                  <p className="text-sm">Giảng viên: Lê Văn B</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 opacity-80" />
                <div>
                  <p className="text-sm">Địa điểm: GDH6</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Right Panel - Chat */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h3 className="font-medium">Lê Văn B</h3>
              <p className="text-sm text-green-600">Đang hoạt động</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Message from Lê Văn B */}
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-medium">Lê Văn B</span>
                  <span className="text-xs text-muted-foreground">19:00 23/10/2025</span>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm border max-w-md">
                  <p className="text-sm leading-relaxed">
                    Thông báo đổi phòng học từ <span className="font-medium">GDH6</span> sang{" "}
                    <span className="font-medium text-blue-600">H3-306</span> lớp L02 lúc{" "}
                    <span className="font-medium">9AM</span>{" "}
                    <span className="text-blue-600 underline">ngày 24/10/2025</span>.
                  </p>
                  <p className="text-sm leading-relaxed mt-2">
                    Các bạn lưu ý đi đúng phòng học.
                  </p>
                  <p className="text-sm leading-relaxed mt-2">Thân ái!</p>
                  <p className="text-sm leading-relaxed mt-3">
                    <span className="text-blue-600 font-medium">Ký tên</span>
                  </p>
                  <p className="text-sm leading-relaxed">
                    <span className="text-blue-600 font-medium">B</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t bg-white p-4">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Input
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-gray-100 border-0 rounded-full px-6"
              onKeyDown={(e) => {
                if (e.key === "Enter" && message.trim()) {
                  // Handle send message
                  setMessage("");
                }
              }}
            />
            <Button
              size="icon"
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
