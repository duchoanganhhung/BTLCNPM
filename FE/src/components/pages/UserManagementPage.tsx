import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, UserPlus, Download, Upload, RefreshCw, Edit, Ban, Check, X } from "lucide-react";
import { Switch } from "../ui/switch";

// Mock data
const mockUsers = [
  { id: "1", name: "Nguyễn Văn A", email: "vana@hcmut.edu.vn", role: "tutor", status: "active", phone: "0901234567", joinDate: "15/01/2024" },
  { id: "2", name: "Trần Thị B", email: "thib@hcmut.edu.vn", role: "student", status: "active", phone: "0902345678", joinDate: "20/01/2024" },
  { id: "3", name: "Lê Minh C", email: "minhc@hcmut.edu.vn", role: "tutor", status: "active", phone: "0903456789", joinDate: "10/02/2024" },
  { id: "4", name: "Phạm Thị D", email: "thid@hcmut.edu.vn", role: "coordinator", status: "active", phone: "0904567890", joinDate: "05/03/2024" },
  { id: "5", name: "Hoàng Văn E", email: "vane@hcmut.edu.vn", role: "student", status: "inactive", phone: "0905678901", joinDate: "12/03/2024" },
  { id: "6", name: "Vũ Minh F", email: "minhf@hcmut.edu.vn", role: "tutor", status: "active", phone: "0906789012", joinDate: "18/03/2024" },
  { id: "7", name: "Đặng Thị G", email: "thig@hcmut.edu.vn", role: "student", status: "active", phone: "0907890123", joinDate: "22/03/2024" },
  { id: "8", name: "Bùi Văn H", email: "vanh@hcmut.edu.vn", role: "admin", status: "active", phone: "0908901234", joinDate: "01/01/2024" },
];

const auditLogs = [
  { id: "1", action: "Kích hoạt tài khoản", user: "Admin", target: "Nguyễn Văn A", time: "10:30 - 28/10/2024" },
  { id: "2", action: "Cập nhật role", user: "Admin", target: "Trần Thị B", time: "09:15 - 28/10/2024" },
  { id: "3", action: "Đồng bộ DataCore", user: "System", target: "50 users", time: "08:00 - 28/10/2024" },
  { id: "4", action: "Vô hiệu hóa tài khoản", user: "Coordinator", target: "Hoàng Văn E", time: "15:45 - 27/10/2024" },
];

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = mockUsers.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === "all" || user.role === roleFilter;
    const matchStatus = statusFilter === "all" || user.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const getRoleBadge = (role: string) => {
    const variants: any = {
      admin: "destructive",
      coordinator: "default",
      tutor: "secondary",
      student: "outline"
    };
    return variants[role] || "outline";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Quản lý người dùng</h2>
          <p className="text-muted-foreground">Quản lý tài khoản Tutor, Student, Coordinator và Admin</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Thêm người dùng
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm người dùng mới</DialogTitle>
                <DialogDescription>Nhập thông tin người dùng mới vào hệ thống</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Họ và tên</Label>
                  <Input placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="vana@hcmut.edu.vn" />
                </div>
                <div className="space-y-2">
                  <Label>Số điện thoại</Label>
                  <Input placeholder="0901234567" />
                </div>
                <div className="space-y-2">
                  <Label>Vai trò</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="tutor">Tutor</SelectItem>
                      <SelectItem value="coordinator">Coordinator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Hủy</Button>
                <Button>Thêm người dùng</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Danh sách người dùng</TabsTrigger>
          <TabsTrigger value="sync">Đồng bộ DataCore</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Danh sách người dùng</CardTitle>
                  <CardDescription>Tổng số {filteredUsers.length} người dùng</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo tên hoặc email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Lọc theo vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả vai trò</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="tutor">Tutor</SelectItem>
                    <SelectItem value="coordinator">Coordinator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Vô hiệu hóa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Họ và tên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Số điện thoại</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày tham gia</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadge(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status === "active" ? "Hoạt động" : "Vô hiệu"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
                                  <DialogDescription>Cập nhật thông tin người dùng</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>Họ và tên</Label>
                                    <Input defaultValue={user.name} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Email phụ</Label>
                                    <Input type="email" placeholder="email.phu@gmail.com" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Số điện thoại</Label>
                                    <Input defaultValue={user.phone} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Vai trò</Label>
                                    <Select defaultValue={user.role}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="tutor">Tutor</SelectItem>
                                        <SelectItem value="coordinator">Coordinator</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch defaultChecked={user.status === "active"} />
                                    <Label>Kích hoạt tài khoản</Label>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Hủy</Button>
                                  <Button>Lưu thay đổi</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className={user.status === "active" ? "text-destructive" : "text-green-600"}
                            >
                              {user.status === "active" ? <Ban className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Đồng bộ HCMUT_DATACORE</CardTitle>
              <CardDescription>Đồng bộ dữ liệu người dùng từ hệ thống DataCore</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p>Lần đồng bộ cuối</p>
                  <p className="text-muted-foreground">28/10/2024 - 08:00:00</p>
                </div>
                <Button>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Đồng bộ ngay
                </Button>
              </div>
              <div className="space-y-2">
                <p>Tùy chọn đồng bộ:</p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Đồng bộ người dùng mới</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Cập nhật thông tin người dùng hiện có</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Vô hiệu hóa người dùng không tồn tại trong DataCore</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Đồng bộ tự động hàng ngày lúc 2:00 AM</Label>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p>Kết quả đồng bộ lần trước:</p>
                <div className="mt-2 space-y-1 text-muted-foreground">
                  <p>• Thêm mới: 5 người dùng</p>
                  <p>• Cập nhật: 12 người dùng</p>
                  <p>• Không thay đổi: 139 người dùng</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>Lịch sử thao tác với người dùng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thao tác</TableHead>
                      <TableHead>Người thực hiện</TableHead>
                      <TableHead>Đối tượng</TableHead>
                      <TableHead>Thời gian</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.user}</Badge>
                        </TableCell>
                        <TableCell>{log.target}</TableCell>
                        <TableCell>{log.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
