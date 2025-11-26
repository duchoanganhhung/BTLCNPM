import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Shield, Lock, Key, User, Monitor, LogOut, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";

// Mock data
const activeSessions = [
  {
    id: "1",
    user: "admin@hcmut.edu.vn",
    role: "Admin",
    device: "Chrome on Windows",
    ip: "192.168.1.100",
    location: "Ho Chi Minh City, VN",
    loginTime: "28/10/2024 09:00",
    lastActive: "2 phút trước",
    status: "active"
  },
  {
    id: "2",
    user: "coordinator@hcmut.edu.vn",
    role: "Coordinator",
    device: "Firefox on MacOS",
    ip: "192.168.1.105",
    location: "Ho Chi Minh City, VN",
    loginTime: "28/10/2024 08:30",
    lastActive: "15 phút trước",
    status: "active"
  },
  {
    id: "3",
    user: "tutor@hcmut.edu.vn",
    role: "Tutor",
    device: "Safari on iOS",
    ip: "192.168.1.120",
    location: "Ho Chi Minh City, VN",
    loginTime: "28/10/2024 10:15",
    lastActive: "30 phút trước",
    status: "active"
  },
  {
    id: "4",
    user: "student@hcmut.edu.vn",
    role: "Student",
    device: "Chrome on Android",
    ip: "192.168.1.150",
    location: "Ho Chi Minh City, VN",
    loginTime: "28/10/2024 07:45",
    lastActive: "1 giờ trước",
    status: "idle"
  },
];

const loginHistory = [
  {
    id: "1",
    user: "admin@hcmut.edu.vn",
    time: "28/10/2024 09:00:15",
    ip: "192.168.1.100",
    device: "Chrome on Windows",
    location: "Ho Chi Minh City, VN",
    status: "success",
    method: "SSO"
  },
  {
    id: "2",
    user: "coordinator@hcmut.edu.vn",
    time: "28/10/2024 08:30:42",
    ip: "192.168.1.105",
    device: "Firefox on MacOS",
    location: "Ho Chi Minh City, VN",
    status: "success",
    method: "SSO"
  },
  {
    id: "3",
    user: "unknown@example.com",
    time: "28/10/2024 03:25:18",
    ip: "45.123.45.67",
    device: "Chrome on Windows",
    location: "Unknown Location",
    status: "failed",
    method: "Password"
  },
  {
    id: "4",
    user: "tutor@hcmut.edu.vn",
    time: "28/10/2024 10:15:33",
    ip: "192.168.1.120",
    device: "Safari on iOS",
    location: "Ho Chi Minh City, VN",
    status: "success",
    method: "SSO"
  },
  {
    id: "5",
    user: "test@test.com",
    time: "28/10/2024 02:45:55",
    ip: "123.45.67.89",
    device: "Unknown",
    location: "Unknown Location",
    status: "failed",
    method: "Password"
  },
];

const ssoTokens = [
  {
    id: "1",
    user: "admin@hcmut.edu.vn",
    tokenId: "tok_a1b2c3d4e5f6",
    issuedAt: "28/10/2024 09:00",
    expiresAt: "28/10/2024 21:00",
    status: "active",
    scopes: ["read", "write", "admin"]
  },
  {
    id: "2",
    user: "coordinator@hcmut.edu.vn",
    tokenId: "tok_g7h8i9j0k1l2",
    issuedAt: "28/10/2024 08:30",
    expiresAt: "28/10/2024 20:30",
    status: "active",
    scopes: ["read", "write"]
  },
  {
    id: "3",
    user: "tutor@hcmut.edu.vn",
    tokenId: "tok_m3n4o5p6q7r8",
    issuedAt: "28/10/2024 10:15",
    expiresAt: "28/10/2024 22:15",
    status: "active",
    scopes: ["read"]
  },
];

const securityEvents = [
  {
    id: "1",
    type: "failed_login",
    severity: "warning",
    message: "3 lần đăng nhập thất bại từ IP 45.123.45.67",
    time: "28/10/2024 03:25:18",
    action: "Đã chặn IP"
  },
  {
    id: "2",
    type: "suspicious_activity",
    severity: "error",
    message: "Phát hiện hoạt động bất thường từ user test@test.com",
    time: "28/10/2024 02:45:55",
    action: "Đã khóa tài khoản"
  },
  {
    id: "3",
    type: "token_expired",
    severity: "info",
    message: "Token của user old@hcmut.edu.vn đã hết hạn",
    time: "27/10/2024 22:00:00",
    action: "Tự động logout"
  },
  {
    id: "4",
    type: "password_reset",
    severity: "info",
    message: "User student@hcmut.edu.vn đã đặt lại mật khẩu",
    time: "27/10/2024 15:30:00",
    action: "Đã gửi email xác nhận"
  },
];

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Bảo mật & Phiên đăng nhập</h2>
          <p className="text-muted-foreground">Quản lý session, token và bảo mật hệ thống</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sessions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sessions">Phiên đăng nhập</TabsTrigger>
          <TabsTrigger value="tokens">SSO Tokens</TabsTrigger>
          <TabsTrigger value="security">Cấu hình bảo mật</TabsTrigger>
          <TabsTrigger value="events">Sự kiện bảo mật</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Sessions hiện tại</CardDescription>
                <CardTitle>342</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Active users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Admin/Coordinator</CardDescription>
                <CardTitle>8</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">2 admin, 6 coordinator</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Đăng nhập thành công</CardDescription>
                <CardTitle>1,245</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Hôm nay</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Đăng nhập thất bại</CardDescription>
                <CardTitle className="text-destructive">23</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Hôm nay</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Phiên đăng nhập hiện tại</CardTitle>
                  <CardDescription>Danh sách người dùng đang online</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout tất cả
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Thiết bị</TableHead>
                      <TableHead>IP / Vị trí</TableHead>
                      <TableHead>Đăng nhập lúc</TableHead>
                      <TableHead>Hoạt động</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            {session.user}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            session.role === "Admin" ? "destructive" :
                            session.role === "Coordinator" ? "default" :
                            "outline"
                          }>
                            {session.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-muted-foreground" />
                            {session.device}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p>{session.ip}</p>
                          <p className="text-muted-foreground">{session.location}</p>
                        </TableCell>
                        <TableCell>{session.loginTime}</TableCell>
                        <TableCell>{session.lastActive}</TableCell>
                        <TableCell>
                          <Badge variant={session.status === "active" ? "default" : "secondary"}>
                            {session.status === "active" ? "Active" : "Idle"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <LogOut className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lịch sử đăng nhập</CardTitle>
              <CardDescription>Các lần đăng nhập gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>IP / Vị trí</TableHead>
                      <TableHead>Thiết bị</TableHead>
                      <TableHead>Phương thức</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginHistory.map((login) => (
                      <TableRow key={login.id}>
                        <TableCell>{login.user}</TableCell>
                        <TableCell>{login.time}</TableCell>
                        <TableCell>
                          <p>{login.ip}</p>
                          <p className="text-muted-foreground">{login.location}</p>
                        </TableCell>
                        <TableCell>{login.device}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{login.method}</Badge>
                        </TableCell>
                        <TableCell>
                          {login.status === "success" ? (
                            <Badge variant="default" className="gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Thành công
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Thất bại
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý SSO Tokens</CardTitle>
              <CardDescription>Tokens xác thực từ HCMUT_SSO</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Token ID</TableHead>
                      <TableHead>Cấp lúc</TableHead>
                      <TableHead>Hết hạn lúc</TableHead>
                      <TableHead>Scopes</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ssoTokens.map((token) => (
                      <TableRow key={token.id}>
                        <TableCell>{token.user}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">{token.tokenId}</code>
                        </TableCell>
                        <TableCell>{token.issuedAt}</TableCell>
                        <TableCell>{token.expiresAt}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {token.scopes.map((scope) => (
                              <Badge key={scope} variant="outline">{scope}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{token.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Revoke
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cấu hình Token</CardTitle>
              <CardDescription>Thiết lập thời gian và chính sách token</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Token expiration time (giờ)</Label>
                  <span className="text-muted-foreground">12 giờ</span>
                </div>
                <Slider defaultValue={[12]} max={48} step={1} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Refresh token expiration (ngày)</Label>
                  <span className="text-muted-foreground">30 ngày</span>
                </div>
                <Slider defaultValue={[30]} max={90} step={1} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-refresh token</Label>
                  <p className="text-muted-foreground">Tự động gia hạn token khi còn 1h</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Revoke on password change</Label>
                  <p className="text-muted-foreground">Thu hồi token khi đổi mật khẩu</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Lưu cấu hình
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Xác thực & Mật khẩu</CardTitle>
              <CardDescription>Cấu hình chính sách xác thực</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Yêu cầu xác thực 2 yếu tố (2FA)</Label>
                  <p className="text-muted-foreground">Bắt buộc 2FA cho Admin và Coordinator</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>CAPTCHA khi đăng nhập</Label>
                  <p className="text-muted-foreground">Hiển thị CAPTCHA sau 3 lần thất bại</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Số lần đăng nhập thất bại tối đa</Label>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 lần</SelectItem>
                    <SelectItem value="5">5 lần</SelectItem>
                    <SelectItem value="10">10 lần</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Thời gian khóa tài khoản (phút)</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 phút</SelectItem>
                    <SelectItem value="30">30 phút</SelectItem>
                    <SelectItem value="60">60 phút</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Độ dài mật khẩu tối thiểu</Label>
                  <span className="text-muted-foreground">8 ký tự</span>
                </div>
                <Slider defaultValue={[8]} min={6} max={20} step={1} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Yêu cầu ký tự đặc biệt</Label>
                  <p className="text-muted-foreground">Mật khẩu phải có ít nhất 1 ký tự đặc biệt</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Yêu cầu chữ hoa và chữ số</Label>
                  <p className="text-muted-foreground">Mật khẩu phải có chữ hoa và chữ số</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                Lưu cấu hình
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>IP Whitelist & Blacklist</CardTitle>
              <CardDescription>Quản lý danh sách IP được phép truy cập</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Whitelist IPs (cho phép)</Label>
                <Input placeholder="192.168.1.0/24, 10.0.0.0/8" />
              </div>

              <div className="space-y-2">
                <Label>Blacklist IPs (chặn)</Label>
                <Input placeholder="45.123.45.67, 123.45.67.89" defaultValue="45.123.45.67, 123.45.67.89" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Chỉ cho phép IP trong whitelist</Label>
                  <p className="text-muted-foreground">Chặn tất cả IP không trong danh sách</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tự động chặn IP sau khi đăng nhập thất bại</Label>
                  <p className="text-muted-foreground">Thêm vào blacklist sau 5 lần thất bại</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Lưu cấu hình
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sự kiện bảo mật</CardTitle>
              <CardDescription>Nhật ký các sự kiện liên quan đến bảo mật</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {event.severity === "error" ? (
                          <AlertTriangle className="w-5 h-5 text-destructive mt-1" />
                        ) : event.severity === "warning" ? (
                          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={
                              event.severity === "error" ? "destructive" :
                              event.severity === "warning" ? "secondary" :
                              "outline"
                            }>
                              {event.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                          <CardTitle className="text-base mb-1">{event.message}</CardTitle>
                          <CardDescription>
                            {event.time} • {event.action}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tổng sự kiện</CardTitle>
                <CardDescription>24 giờ qua</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl">47</p>
                <p className="text-muted-foreground mt-2">8 error, 15 warning, 24 info</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>IP bị chặn</CardTitle>
                <CardDescription>Trong blacklist</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl">12</p>
                <p className="text-muted-foreground mt-2">8 tự động, 4 thủ công</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tài khoản khóa</CardTitle>
                <CardDescription>Do đăng nhập thất bại</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl">5</p>
                <p className="text-muted-foreground mt-2">Tất cả đã mở khóa</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
