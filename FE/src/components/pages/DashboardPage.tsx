import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Activity, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data
const statsData = [
  { label: "Tổng số Tutor", value: "156", change: "+12", trend: "up" },
  { label: "Tổng số Student", value: "2,341", change: "+89", trend: "up" },
  { label: "Tổng số lớp học", value: "78", change: "+5", trend: "up" },
  { label: "Buổi học hôm nay", value: "24", change: "-3", trend: "down" },
];

const sessionData = [
  { month: "T1", completed: 145, cancelled: 12, pending: 8 },
  { month: "T2", completed: 178, cancelled: 15, pending: 10 },
  { month: "T3", completed: 190, cancelled: 10, pending: 12 },
  { month: "T4", completed: 220, cancelled: 18, pending: 15 },
  { month: "T5", completed: 245, cancelled: 14, pending: 9 },
  { month: "T6", completed: 268, cancelled: 16, pending: 11 },
];

const topTutors = [
  { name: "Nguyễn Văn A", rating: 4.9, sessions: 156, subject: "Toán cao cấp" },
  { name: "Trần Thị B", rating: 4.8, sessions: 142, subject: "Vật lý đại cương" },
  { name: "Lê Minh C", rating: 4.8, sessions: 138, subject: "Lập trình C++" },
  { name: "Phạm Thị D", rating: 4.7, sessions: 125, subject: "Tiếng Anh" },
  { name: "Hoàng Văn E", rating: 4.7, sessions: 119, subject: "Hóa học" },
];

const topStudents = [
  { name: "Vũ Minh F", completedSessions: 45, rating: 5.0, major: "KHMT" },
  { name: "Đặng Thị G", completedSessions: 42, rating: 4.9, major: "KTĐT" },
  { name: "Bùi Văn H", completedSessions: 38, rating: 4.9, major: "KTCK" },
  { name: "Mai Thị I", completedSessions: 35, rating: 4.8, major: "KHMT" },
  { name: "Phan Văn J", completedSessions: 33, rating: 4.8, major: "Cơ khí" },
];

const systemStatus = [
  { name: "HCMUT_SSO", status: "online", uptime: "99.9%", lastCheck: "2 phút trước" },
  { name: "HCMUT_DATACORE", status: "online", uptime: "99.5%", lastCheck: "2 phút trước" },
  { name: "HCMUT_LIBRARY", status: "warning", uptime: "95.2%", lastCheck: "5 phút trước" },
];

const recentAlerts = [
  { type: "warning", title: "Kết nối chậm", message: "DataCore đang phản hồi chậm hơn bình thường", time: "10 phút trước" },
  { type: "error", title: "Lỗi đồng bộ", message: "Lỗi đồng bộ dữ liệu từ Library", time: "1 giờ trước" },
  { type: "info", title: "Bảo trì định kỳ", message: "Hệ thống sẽ bảo trì vào 2h sáng ngày mai", time: "3 giờ trước" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2>Dashboard Tổng Quan</h2>
        <p className="text-muted-foreground">Thống kê và giám sát hệ thống Peer Tutoring</p>
      </div>

      {/* System Alerts */}
      <div className="space-y-3">
        {recentAlerts.map((alert, index) => (
          <Alert 
            key={index} 
            className={
              alert.type === "error" ? "border-destructive bg-destructive/10" :
              alert.type === "warning" ? "border-yellow-500 bg-yellow-50" :
              "border-blue-500 bg-blue-50"
            }
          >
            {alert.type === "error" ? <XCircle className="h-4 w-4 text-destructive" /> :
             alert.type === "warning" ? <AlertTriangle className="h-4 w-4 text-yellow-600" /> :
             <Activity className="h-4 w-4 text-blue-600" />}
            <AlertTitle className={
              alert.type === "error" ? "text-destructive" :
              alert.type === "warning" ? "text-yellow-800" :
              "text-blue-800"
            }>{alert.title}</AlertTitle>
            <AlertDescription className={
              alert.type === "error" ? "text-destructive/80" :
              alert.type === "warning" ? "text-yellow-700" :
              "text-blue-700"
            }>
              {alert.message} • {alert.time}
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="flex items-baseline gap-2">
                <span>{stat.value}</span>
                <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Biểu đồ buổi học</CardTitle>
            <CardDescription>Theo dõi trạng thái buổi học 6 tháng gần nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#22c55e" name="Hoàn thành" />
                <Bar dataKey="cancelled" fill="#ef4444" name="Hủy" />
                <Bar dataKey="pending" fill="#f59e0b" name="Chờ xác nhận" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Xu hướng buổi học</CardTitle>
            <CardDescription>Biểu đồ tăng trưởng theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} name="Hoàn thành" />
                <Line type="monotone" dataKey="cancelled" stroke="#ef4444" strokeWidth={2} name="Hủy" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Tutors and Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Tutor xuất sắc</CardTitle>
            <CardDescription>Danh sách tutor có điểm đánh giá cao nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTutors.map((tutor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <p>{tutor.name}</p>
                      <p className="text-muted-foreground">{tutor.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span>{tutor.rating}</span>
                    </div>
                    <p className="text-muted-foreground">{tutor.sessions} buổi</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Student tích cực</CardTitle>
            <CardDescription>Sinh viên có số buổi học nhiều nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <p>{student.name}</p>
                      <p className="text-muted-foreground">{student.major}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span>{student.rating}</span>
                    </div>
                    <p className="text-muted-foreground">{student.completedSessions} buổi</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>Tình trạng hệ thống</CardTitle>
          <CardDescription>Kết nối và trạng thái các dịch vụ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    system.status === "online" ? "bg-green-500" :
                    system.status === "warning" ? "bg-yellow-500" :
                    "bg-red-500"
                  }`} />
                  <div>
                    <p>{system.name}</p>
                    <p className="text-muted-foreground">Kiểm tra: {system.lastCheck}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={system.status === "online" ? "default" : "secondary"}>
                    {system.status === "online" ? "Hoạt động" : "Cảnh báo"}
                  </Badge>
                  <span className="text-muted-foreground">Uptime: {system.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
