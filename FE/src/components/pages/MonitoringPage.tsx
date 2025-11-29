import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Activity, AlertCircle, CheckCircle, XCircle, RefreshCw, Download, Search, Server, Database, Globe } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useState } from "react";

// Mock data
const systemHealth = [
  { name: "API Server", status: "online", uptime: "99.9%", responseTime: "45ms", lastCheck: "1 phút trước" },
  { name: "Database Primary", status: "online", uptime: "99.8%", responseTime: "12ms", lastCheck: "1 phút trước" },
  { name: "Database Replica", status: "online", uptime: "99.7%", responseTime: "18ms", lastCheck: "1 phút trước" },
  { name: "HCMUT_SSO", status: "online", uptime: "99.5%", responseTime: "250ms", lastCheck: "2 phút trước" },
  { name: "HCMUT_DATACORE", status: "online", uptime: "98.9%", responseTime: "320ms", lastCheck: "2 phút trước" },
  { name: "HCMUT_LIBRARY", status: "warning", uptime: "95.2%", responseTime: "850ms", lastCheck: "5 phút trước" },
  { name: "File Storage", status: "online", uptime: "99.9%", responseTime: "35ms", lastCheck: "1 phút trước" },
  { name: "Email Service", status: "online", uptime: "99.4%", responseTime: "180ms", lastCheck: "3 phút trước" },
];

const performanceData = [
  { time: "00:00", cpu: 45, memory: 62, disk: 38, network: 125 },
  { time: "04:00", cpu: 32, memory: 58, disk: 38, network: 98 },
  { time: "08:00", cpu: 68, memory: 71, disk: 42, network: 256 },
  { time: "12:00", cpu: 85, memory: 78, disk: 45, network: 342 },
  { time: "16:00", cpu: 92, memory: 82, disk: 48, network: 389 },
  { time: "20:00", cpu: 76, memory: 75, disk: 46, network: 298 },
];

const auditLogs = [
  { 
    id: "1", 
    timestamp: "28/10/2024 15:45:32", 
    user: "admin@hcmut.edu.vn", 
    action: "UPDATE_USER_ROLE", 
    target: "user_id: 1234", 
    ip: "192.168.1.100",
    status: "success"
  },
  { 
    id: "2", 
    timestamp: "28/10/2024 15:30:18", 
    user: "coordinator@hcmut.edu.vn", 
    action: "APPROVE_TUTOR", 
    target: "user_id: 5678", 
    ip: "192.168.1.105",
    status: "success"
  },
  { 
    id: "3", 
    timestamp: "28/10/2024 15:15:42", 
    user: "admin@hcmut.edu.vn", 
    action: "SYNC_DATACORE", 
    target: "50 users", 
    ip: "192.168.1.100",
    status: "success"
  },
  { 
    id: "4", 
    timestamp: "28/10/2024 14:58:11", 
    user: "system", 
    action: "AUTO_BACKUP", 
    target: "database", 
    ip: "127.0.0.1",
    status: "success"
  },
  { 
    id: "5", 
    timestamp: "28/10/2024 14:45:07", 
    user: "admin@hcmut.edu.vn", 
    action: "UPDATE_SYSTEM_CONFIG", 
    target: "backup_schedule", 
    ip: "192.168.1.100",
    status: "success"
  },
  { 
    id: "6", 
    timestamp: "28/10/2024 14:32:55", 
    user: "tutor@hcmut.edu.vn", 
    action: "UPLOAD_MATERIAL", 
    target: "material_id: 9876", 
    ip: "192.168.1.120",
    status: "success"
  },
  { 
    id: "7", 
    timestamp: "28/10/2024 14:18:23", 
    user: "student@hcmut.edu.vn", 
    action: "CREATE_APPOINTMENT", 
    target: "appointment_id: 4321", 
    ip: "192.168.1.150",
    status: "success"
  },
  { 
    id: "8", 
    timestamp: "28/10/2024 14:05:38", 
    user: "system", 
    action: "SYNC_LIBRARY", 
    target: "12 documents", 
    ip: "127.0.0.1",
    status: "failed"
  },
];

const systemErrors = [
  {
    id: "1",
    timestamp: "28/10/2024 14:05:38",
    level: "error",
    source: "HCMUT_LIBRARY",
    message: "Connection timeout after 30s",
    stack: "Error: ETIMEDOUT at Library.sync()",
    resolved: false
  },
  {
    id: "2",
    timestamp: "28/10/2024 10:22:15",
    level: "warning",
    source: "HCMUT_DATACORE",
    message: "Slow response time: 850ms",
    stack: "Performance warning",
    resolved: false
  },
  {
    id: "3",
    timestamp: "27/10/2024 23:45:12",
    level: "error",
    source: "Email Service",
    message: "Failed to send notification email",
    stack: "SMTP Error: 550",
    resolved: true
  },
  {
    id: "4",
    timestamp: "27/10/2024 18:30:44",
    level: "warning",
    source: "Database",
    message: "Query execution time exceeded 5s",
    stack: "SELECT * FROM appointments WHERE...",
    resolved: true
  },
];

const recentActivities = [
  { time: "15:45", event: "50 người dùng online đồng thời", type: "info" },
  { time: "15:30", event: "Backup tự động hoàn tất", type: "success" },
  { time: "15:15", event: "Đồng bộ DataCore thành công", type: "success" },
  { time: "14:05", event: "Lỗi kết nối Library", type: "error" },
  { time: "13:45", event: "CPU usage đạt 92%", type: "warning" },
  { time: "13:20", event: "Gửi 245 email thông báo", type: "info" },
];

export default function MonitoringPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [logFilter, setLogFilter] = useState("all");

  const getStatusIcon = (status: string) => {
    if (status === "online") return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === "warning") return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getStatusBadge = (status: string) => {
    if (status === "online") return "default";
    if (status === "warning") return "secondary";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Giám sát & Nhật ký hệ thống</h2>
          <p className="text-muted-foreground">Theo dõi trạng thái và hoạt động hệ thống</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <Tabs defaultValue="health" className="space-y-6">
        <TabsList>
          <TabsTrigger value="health">Trạng thái hệ thống</TabsTrigger>
          <TabsTrigger value="performance">Hiệu năng</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="errors">Lỗi & Cảnh báo</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Server Uptime</CardDescription>
                <CardTitle>99.8%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">45 ngày liên tục</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Avg Response Time</CardDescription>
                <CardTitle>125ms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Trong giới hạn tốt</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Active Users</CardDescription>
                <CardTitle>342</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Online hiện tại</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Error Rate</CardDescription>
                <CardTitle>0.05%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">12 lỗi/24h</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Trạng thái dịch vụ</CardTitle>
              <CardDescription>Giám sát các dịch vụ và kết nối</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(service.status)}
                      <div>
                        <p>{service.name}</p>
                        <p className="text-muted-foreground">Kiểm tra: {service.lastCheck}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-muted-foreground">Uptime</p>
                        <p>{service.uptime}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Response</p>
                        <p>{service.responseTime}</p>
                      </div>
                      <Badge variant={getStatusBadge(service.status) as any}>
                        {service.status === "online" ? "Hoạt động" : "Cảnh báo"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
              <CardDescription>Các sự kiện hệ thống mới nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <Alert 
                    key={index}
                    className={
                      activity.type === "error" ? "border-destructive" :
                      activity.type === "warning" ? "border-yellow-500" :
                      activity.type === "success" ? "border-green-500" :
                      ""
                    }
                  >
                    {activity.type === "error" ? <XCircle className="h-4 w-4" /> :
                     activity.type === "warning" ? <AlertCircle className="h-4 w-4" /> :
                     activity.type === "success" ? <CheckCircle className="h-4 w-4" /> :
                     <Activity className="h-4 w-4" />}
                    <AlertDescription className="flex items-center justify-between">
                      <span>{activity.event}</span>
                      <span className="text-muted-foreground">{activity.time}</span>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CPU & Memory Usage</CardTitle>
                <CardDescription>Sử dụng tài nguyên máy chủ</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="cpu" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="CPU %" />
                    <Area type="monotone" dataKey="memory" stackId="2" stroke="#22c55e" fill="#22c55e" name="Memory %" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network & Disk I/O</CardTitle>
                <CardDescription>Lưu lượng mạng và disk</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="network" stroke="#f59e0b" strokeWidth={2} name="Network (MB/s)" />
                    <Line type="monotone" dataKey="disk" stroke="#8b5cf6" strokeWidth={2} name="Disk (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Database</CardTitle>
                <CardDescription>Trạng thái CSDL</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connections:</span>
                  <span>245/500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Query/sec:</span>
                  <span>1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Query Time:</span>
                  <span>12ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>4.2 GB</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Performance</CardTitle>
                <CardDescription>Hiệu năng API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Requests/min:</span>
                  <span>2,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Response:</span>
                  <span>125ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Success Rate:</span>
                  <span>99.95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Errors:</span>
                  <span className="text-destructive">12</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage</CardTitle>
                <CardDescription>Dung lượng lưu trữ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total:</span>
                  <span>500 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Used:</span>
                  <span>245 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available:</span>
                  <span>255 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Usage:</span>
                  <span>49%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>Lịch sử hoạt động và thao tác người dùng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={logFilter} onValueChange={setLogFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="user">User Actions</SelectItem>
                    <SelectItem value="system">System Events</SelectItem>
                    <SelectItem value="admin">Admin Actions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Hành động</TableHead>
                      <TableHead>Đối tượng</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.action}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{log.target}</TableCell>
                        <TableCell className="text-muted-foreground">{log.ip}</TableCell>
                        <TableCell>
                          <Badge variant={log.status === "success" ? "default" : "destructive"}>
                            {log.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lỗi & Cảnh báo hệ thống</CardTitle>
              <CardDescription>Danh sách các lỗi và cảnh báo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả mức độ</SelectItem>
                    <SelectItem value="error">Chỉ Error</SelectItem>
                    <SelectItem value="warning">Chỉ Warning</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="unresolved">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="unresolved">Chưa giải quyết</SelectItem>
                    <SelectItem value="resolved">Đã giải quyết</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {systemErrors.map((error) => (
                  <Card key={error.id} className={error.resolved ? "opacity-60" : ""}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {error.level === "error" ? (
                            <XCircle className="w-5 h-5 text-destructive mt-1" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-500 mt-1" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={error.level === "error" ? "destructive" : "secondary"}>
                                {error.level.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">{error.source}</Badge>
                              {error.resolved && <Badge variant="outline">Đã giải quyết</Badge>}
                            </div>
                            <CardTitle className="text-base mb-2">{error.message}</CardTitle>
                            <CardDescription className="font-mono text-xs">{error.stack}</CardDescription>
                            <p className="text-muted-foreground mt-2">{error.timestamp}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {error.resolved ? "Chi tiết" : "Xử lý"}
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
