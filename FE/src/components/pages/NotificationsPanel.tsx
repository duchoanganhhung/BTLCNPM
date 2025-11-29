import { Bell, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
  icon: "bell" | "check" | "alert";
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Gia sư đã chấp nhận yêu cầu",
    message: "Gia sư Lê Văn B đã chấp nhận yêu cầu học môn Cấu trúc dữ liệu của bạn. Buổi học đầu tiên sẽ diễn ra vào 24/10 lúc 09:00",
    time: "2 giờ trước",
    read: false,
    type: "success",
    icon: "check",
  },
  {
    id: "2",
    title: "Lịch học thay đổi",
    message: "Lịch học môn Mạng máy tính buổi thứ 6 đã chuyển sang phòng D9-301.",
    time: "5 giờ trước",
    read: false,
    type: "warning",
    icon: "alert",
  },
];

export function NotificationsPanel() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (icon: string) => {
    const iconClass = "h-5 w-5";
    switch (icon) {
      case "check":
        return <CheckCircle2 className={`${iconClass} text-emerald-500`} />;
      case "alert":
        return <AlertCircle className={`${iconClass} text-orange-500`} />;
      default:
        return <Bell className={`${iconClass} text-blue-500`} />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-50 hover:bg-emerald-100";
      case "warning":
        return "bg-orange-50 hover:bg-orange-100";
      default:
        return "bg-blue-50 hover:bg-blue-100";
    }
  };

  return (
    <div className="w-[380px] bg-white rounded-lg shadow-xl border">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-1">
          <h3>Thông báo</h3>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white border-0">
              {unreadCount} mới
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Cập nhật mới nhất về học tập và hoạt động
        </p>
      </div>

      {/* Notifications List */}
      <ScrollArea className="h-[400px]">
        <div className="p-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg mb-2 transition-colors ${
                  notification.read ? "bg-white hover:bg-gray-50" : getBackgroundColor(notification.type)
                } ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="truncate">{notification.title}</h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-muted-foreground text-center">
                Không có thông báo mới
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t bg-gray-50">
        <Button variant="ghost" className="w-full">
          Xem tất cả thông báo
        </Button>
      </div>
    </div>
  );
}
