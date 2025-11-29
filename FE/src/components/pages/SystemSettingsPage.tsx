import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Save, Database, Shield, Bell, Calendar, RefreshCw, Download, Upload } from "lucide-react";
import { Slider } from "../ui/slider";
import { Separator } from "../ui/separator";

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Cấu hình hệ thống</h2>
          <p className="text-muted-foreground">Quản lý tham số và cấu hình hệ thống</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Lưu tất cả thay đổi
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="integration">Tích hợp</TabsTrigger>
          <TabsTrigger value="limits">Giới hạn & Quota</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          <TabsTrigger value="rbac">Phân quyền</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình chung</CardTitle>
              <CardDescription>Các thiết lập cơ bản của hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tên hệ thống</Label>
                  <Input defaultValue="HCMUT Peer Tutoring System" />
                </div>
                <div className="space-y-2">
                  <Label>Email liên hệ hệ thống</Label>
                  <Input type="email" defaultValue="support@hcmut.edu.vn" />
                </div>
                <div className="space-y-2">
                  <Label>Múi giờ</Label>
                  <Select defaultValue="gmt+7">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmt+7">GMT+7 (Ho Chi Minh)</SelectItem>
                      <SelectItem value="gmt+8">GMT+8 (Singapore)</SelectItem>
                      <SelectItem value="gmt+9">GMT+9 (Tokyo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ngôn ngữ mặc định</Label>
                  <Select defaultValue="vi">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bảo trì hệ thống</Label>
                    <p className="text-muted-foreground">Kích hoạt chế độ bảo trì</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cho phép đăng ký mới</Label>
                    <p className="text-muted-foreground">Người dùng có thể tự đăng ký</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Yêu cầu xác thực email</Label>
                    <p className="text-muted-foreground">Xác thực email khi đăng ký</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Ghi log chi tiết</Label>
                    <p className="text-muted-foreground">Lưu log đầy đủ các hoạt động</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông báo hệ thống</CardTitle>
              <CardDescription>Cấu hình thông báo tự động</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo email</Label>
                  <p className="text-muted-foreground">Gửi thông báo qua email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Nhắc nhở trước buổi học</Label>
                  <p className="text-muted-foreground">Nhắc trước 1 giờ</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo buổi học bị hủy</Label>
                  <p className="text-muted-foreground">Thông báo ngay khi có hủy</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Báo cáo hàng tuần</Label>
                  <p className="text-muted-foreground">Gửi báo cáo tổng hợp</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  HCMUT_SSO
                </div>
              </CardTitle>
              <CardDescription>Cấu hình đăng nhập qua SSO</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span>Trạng thái</span>
                <Badge>Đã kết nối</Badge>
              </div>
              <div className="space-y-2">
                <Label>SSO Endpoint</Label>
                <Input defaultValue="https://sso.hcmut.edu.vn/auth" />
              </div>
              <div className="space-y-2">
                <Label>Client ID</Label>
                <Input defaultValue="peer-tutoring-client" />
              </div>
              <div className="space-y-2">
                <Label>Client Secret</Label>
                <Input type="password" defaultValue="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Timeout (giây)</Label>
                <Input type="number" defaultValue="30" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Kiểm tra kết nối
                </Button>
                <Button>Lưu cấu hình</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  HCMUT_DATACORE
                </div>
              </CardTitle>
              <CardDescription>Đồng bộ dữ liệu người dùng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span>Trạng thái</span>
                <Badge>Đã kết nối</Badge>
              </div>
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input defaultValue="https://datacore.hcmut.edu.vn/api/v1" />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" defaultValue="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Đồng bộ tự động</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Mỗi giờ</SelectItem>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
                    <SelectItem value="manual">Thủ công</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Thời gian đồng bộ (giờ:phút)</Label>
                <Input type="time" defaultValue="02:00" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Đồng bộ ngay
                </Button>
                <Button>Lưu cấu hình</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  HCMUT_LIBRARY
                </div>
              </CardTitle>
              <CardDescription>Tích hợp thư viện số</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span>Trạng thái</span>
                <Badge variant="secondary">Cảnh báo</Badge>
              </div>
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input defaultValue="https://library.hcmut.edu.vn/api" />
              </div>
              <div className="space-y-2">
                <Label>API Token</Label>
                <Input type="password" defaultValue="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Tần suất đồng bộ</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
                    <SelectItem value="monthly">Hàng tháng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Kiểm tra kết nối
                </Button>
                <Button>Lưu cấu hình</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Giới hạn và Quota</CardTitle>
              <CardDescription>Thiết lập các giới hạn hoạt động</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Số buổi học tối đa / Tutor / Tuần</Label>
                    <span className="text-muted-foreground">15 buổi</span>
                  </div>
                  <Slider defaultValue={[15]} max={30} step={1} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Số buổi học tối đa / Student / Tuần</Label>
                    <span className="text-muted-foreground">10 buổi</span>
                  </div>
                  <Slider defaultValue={[10]} max={20} step={1} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Thời gian đặt trước tối thiểu (giờ)</Label>
                    <span className="text-muted-foreground">24 giờ</span>
                  </div>
                  <Slider defaultValue={[24]} max={72} step={6} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Thời gian hủy miễn phí (giờ)</Label>
                    <span className="text-muted-foreground">24 giờ</span>
                  </div>
                  <Slider defaultValue={[24]} max={72} step={6} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Kích thước file upload tối đa (MB)</Label>
                    <span className="text-muted-foreground">10 MB</span>
                  </div>
                  <Slider defaultValue={[10]} max={50} step={5} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Số file upload tối đa / Tutor / Tháng</Label>
                    <span className="text-muted-foreground">20 files</span>
                  </div>
                  <Slider defaultValue={[20]} max={100} step={10} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Session timeout (phút)</Label>
                    <span className="text-muted-foreground">120 phút</span>
                  </div>
                  <Slider defaultValue={[120]} max={480} step={30} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Rate limit - API calls / phút</Label>
                    <span className="text-muted-foreground">100 calls</span>
                  </div>
                  <Slider defaultValue={[100]} max={1000} step={50} />
                </div>
              </div>

              <Button className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Lưu cấu hình
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sao lưu & Khôi phục</CardTitle>
              <CardDescription>Quản lý backup dữ liệu hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span>Lần backup cuối:</span>
                  <span className="text-muted-foreground">28/10/2024 - 02:00:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Kích thước backup:</span>
                  <span className="text-muted-foreground">2.4 GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Số file backup:</span>
                  <span className="text-muted-foreground">30 files</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tần suất backup tự động</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Mỗi giờ</SelectItem>
                      <SelectItem value="daily">Hàng ngày</SelectItem>
                      <SelectItem value="weekly">Hàng tuần</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Thời gian backup (giờ:phút)</Label>
                  <Input type="time" defaultValue="02:00" />
                </div>

                <div className="space-y-2">
                  <Label>Lưu giữ backup</Label>
                  <Select defaultValue="30days">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">7 ngày</SelectItem>
                      <SelectItem value="30days">30 ngày</SelectItem>
                      <SelectItem value="90days">90 ngày</SelectItem>
                      <SelectItem value="forever">Vĩnh viễn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Thư mục lưu backup</Label>
                  <Input defaultValue="/var/backup/peer-tutoring" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup database</Label>
                    <p className="text-muted-foreground">Sao lưu toàn bộ CSDL</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup files</Label>
                    <p className="text-muted-foreground">Sao lưu tài liệu upload</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup cấu hình</Label>
                    <p className="text-muted-foreground">Sao lưu thiết lập hệ thống</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Nén backup</Label>
                    <p className="text-muted-foreground">Tự động nén file backup</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Backup ngay
                </Button>
                <Button variant="outline" className="flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  Restore
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lịch sử Backup</CardTitle>
              <CardDescription>Danh sách các bản backup gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "28/10/2024 02:00", size: "2.4 GB", status: "success" },
                  { date: "27/10/2024 02:00", size: "2.3 GB", status: "success" },
                  { date: "26/10/2024 02:00", size: "2.3 GB", status: "success" },
                  { date: "25/10/2024 02:00", size: "2.2 GB", status: "success" },
                  { date: "24/10/2024 02:00", size: "2.2 GB", status: "success" },
                ].map((backup, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Database className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p>{backup.date}</p>
                        <p className="text-muted-foreground">{backup.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Thành công</Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rbac" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phân quyền (RBAC)</CardTitle>
              <CardDescription>Quản lý vai trò và quyền truy cập</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  role: "Admin",
                  color: "destructive",
                  permissions: ["Toàn quyền hệ thống", "Quản lý người dùng", "Cấu hình hệ thống", "Xem báo cáo"]
                },
                {
                  role: "Coordinator",
                  color: "default",
                  permissions: ["Quản lý người dùng", "Duyệt tutor", "Xem báo cáo", "Quản lý lớp học"]
                },
                {
                  role: "Tutor",
                  color: "secondary",
                  permissions: ["Tạo lịch rảnh", "Quản lý buổi học", "Upload tài liệu", "Nhận đánh giá"]
                },
                {
                  role: "Student",
                  color: "outline",
                  permissions: ["Đặt lịch học", "Xem tài liệu", "Đánh giá tutor", "Xem lịch sử"]
                }
              ].map((roleData, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={roleData.color as any}>{roleData.role}</Badge>
                        <CardTitle className="text-base">Quyền hạn</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm">Chỉnh sửa</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {roleData.permissions.map((permission, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                          <input type="checkbox" defaultChecked className="w-4 h-4" />
                          <span>{permission}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
