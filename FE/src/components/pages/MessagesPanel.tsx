import { MessageCircle, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Message {
  id: string;
  sender: string;
  avatar?: string;
  message: string;
  time: string;
  read: boolean;
  online: boolean;
}

const messages: Message[] = [
  {
    id: "1",
    sender: "Lê Văn B",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    message: "Thông báo đổi phòng học từ GDH6 sang H3-306 lớp L02 lúc 9AM ngày 24/10/2025. Các bạn lưu ý đi đúng phòng học. Thân ái! Ký tên B",
    time: "10 phút trước",
    read: false,
    online: true,
  },
  {
    id: "2",
    sender: "Trần Thị B - Lớp IT01",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    message: "Mình có tài liệu ôn tập môn Cấu trúc dữ liệu, bạn có cần không?",
    time: "1 giờ trước",
    read: false,
    online: false,
  },
];

interface MessagesPanelProps {
  onOpenChat: () => void;
}

export function MessagesPanel({ onOpenChat }: MessagesPanelProps) {
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="w-[380px] bg-white rounded-lg shadow-xl border">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-1">
          <h3>Tin nhắn</h3>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white border-0">
              {unreadCount} mới
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Trò chuyện với giảng viên và bạn bè
        </p>
      </div>

      {/* Messages List */}
      <ScrollArea className="h-[400px]">
        <div className="p-2">
          {messages.length > 0 ? (
            messages.map((message) => (
              <button
                key={message.id}
                onClick={onOpenChat}
                className={`w-full p-4 rounded-lg mb-2 text-left transition-all hover:bg-gray-50 ${
                  !message.read ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div className="relative flex-shrink-0">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={message.avatar} alt={message.sender} />
                      <AvatarFallback>
                        {message.sender.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {message.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="truncate">{message.sender}</h4>
                      {!message.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {message.message}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{message.time}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-muted-foreground text-center">
                Chưa có tin nhắn nào
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t bg-gray-50">
        <Button variant="ghost" className="w-full">
          Xem tất cả tin nhắn
        </Button>
      </div>
    </div>
  );
}
