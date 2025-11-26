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
import { Calendar } from "../ui/calendar";
import { Search, Plus, Calendar as CalendarIcon, Clock, User, BookOpen, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";

// Mock data
const mockAppointments = [
  { 
    id: "1", 
    tutor: "Nguyễn Văn A", 
    student: "Vũ Minh F", 
    subject: "Toán cao cấp", 
    date: "30/10/2024", 
    time: "14:00 - 16:00", 
    status: "confirmed",
    location: "Phòng A101",
    notes: "Ôn tập chương 3"
  },
  { 
    id: "2", 
    tutor: "Trần Thị B", 
    student: "Đặng Thị G", 
    subject: "Vật lý", 
    date: "30/10/2024", 
    time: "16:00 - 18:00", 
    status: "pending",
    location: "Phòng B205",
    notes: ""
  },
  { 
    id: "3", 
    tutor: "Lê Minh C", 
    student: "Bùi Văn H", 
    subject: "Lập trình C++", 
    date: "31/10/2024", 
    time: "09:00 - 11:00", 
    status: "confirmed",
    location: "Lab máy tính 1",
    notes: "Thực hành pointer"
  },
  { 
    id: "4", 
    tutor: "Nguyễn Văn A", 
    student: "Mai Thị I", 
    subject: "Giải tích", 
    date: "31/10/2024", 
    time: "14:00 - 16:00", 
    status: "cancelled",
    location: "Phòng A101",
    notes: "Sinh viên hủy"
  },
  { 
    id: "5", 
    tutor: "Phạm Thị D", 
    student: "Phan Văn J", 
    subject: "Tiếng Anh", 
    date: "01/11/2024", 
    time: "10:00 - 12:00", 
    status: "completed",
    location: "Online",
    notes: "IELTS Speaking"
  },
];

const mockClasses = [
  { 
    id: "1", 
    name: "Toán cao cấp - Nhóm 1", 
    tutor: "Nguyễn Văn A", 
    students: 5, 
    schedule: "Thứ 2, 4 (14:00-16:00)", 
    status: "active",
    startDate: "01/09/2024"
  },
  { 
    id: "2", 
    name: "Vật lý đại cương", 
    tutor: "Trần Thị B", 
    students: 3, 
    schedule: "Thứ 3, 5 (16:00-18:00)", 
    status: "active",
    startDate: "05/09/2024"
  },
  { 
    id: "3", 
    name: "C++ Programming", 
    tutor: "Lê Minh C", 
    students: 4, 
    schedule: "Thứ 4, 6 (09:00-11:00)", 
    status: "active",
    startDate: "10/09/2024"
  },
];

const tutorAvailability = [
  { tutor: "Nguyễn Văn A", day: "Thứ 2", slots: ["08:00-10:00", "14:00-16:00", "16:00-18:00"] },
  { tutor: "Nguyễn Văn A", day: "Thứ 3", slots: ["09:00-11:00", "14:00-16:00"] },
  { tutor: "Trần Thị B", day: "Thứ 2", slots: ["10:00-12:00", "16:00-18:00"] },
  { tutor: "Trần Thị B", day: "Thứ 4", slots: ["08:00-10:00", "16:00-18:00"] },
  { tutor: "Lê Minh C", day: "Thứ 3", slots: ["09:00-11:00", "14:00-16:00"] },
  { tutor: "Lê Minh C", day: "Thứ 5", slots: ["09:00-11:00", "10:00-12:00"] },
];

export default function ClassManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const getStatusBadge = (status: string) => {
    const variants: any = {
      confirmed: "default",
      pending: "secondary",
      cancelled: "destructive",
      completed: "outline"
    };
    return variants[status] || "outline";
  };

  const getStatusText = (status: string) => {
    const text: any = {
      confirmed: "Đã xác nhận",
      pending: "Chờ xác nhận",
      cancelled: "Đã hủy",
      completed: "Hoàn thành"
    };
    return text[status] || status;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Quản lý lớp học & Lịch học</h2>
          <p className="text-muted-foreground">Quản lý buổi học, lớp học và lịch rảnh của Tutor</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tạo buổi học mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo buổi học mới</DialogTitle>
              <DialogDescription>Đặt lịch buổi học cho Student và Tutor</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Chọn Tutor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tutor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutor1">Nguyễn Văn A</SelectItem>
                    <SelectItem value="tutor2">Trần Thị B</SelectItem>
                    <SelectItem value="tutor3">Lê Minh C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Chọn Student</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student1">Vũ Minh F</SelectItem>
                    <SelectItem value="student2">Đặng Thị G</SelectItem>
                    <SelectItem value="student3">Bùi Văn H</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Môn học</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn môn học" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Toán cao cấp</SelectItem>
                    <SelectItem value="physics">Vật lý</SelectItem>
                    <SelectItem value="programming">Lập trình C++</SelectItem>
                    <SelectItem value="english">Tiếng Anh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Ngày học</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Giờ bắt đầu</Label>
                <Input type="time" defaultValue="14:00" />
              </div>
              <div className="space-y-2">
                <Label>Giờ kết thúc</Label>
                <Input type="time" defaultValue="16:00" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Địa điểm</Label>
                <Input placeholder="Phòng A101 hoặc Online" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Ghi chú</Label>
                <Textarea placeholder="Nội dung, yêu cầu đặc biệt..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Hủy</Button>
              <Button>Tạo buổi học</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="appointments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="appointments">Danh sách buổi học</TabsTrigger>
          <TabsTrigger value="classes">Lớp học</TabsTrigger>
          <TabsTrigger value="availability">Lịch rảnh Tutor</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Danh sách buổi học</CardTitle>
                  <CardDescription>Quản lý tất cả các buổi học trong hệ thống</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo tên, môn học..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                    <SelectItem value="pending">Chờ xác nhận</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tutor</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Môn học</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Giờ</TableHead>
                      <TableHead>Địa điểm</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            {appointment.tutor}
                          </div>
                        </TableCell>
                        <TableCell>{appointment.student}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            {appointment.subject}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                            {appointment.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            {appointment.time}
                          </div>
                        </TableCell>
                        <TableCell>{appointment.location}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(appointment.status)}>
                            {getStatusText(appointment.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Chỉnh sửa buổi học</DialogTitle>
                                  <DialogDescription>Cập nhật thông tin buổi học</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>Trạng thái</Label>
                                    <Select defaultValue={appointment.status}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                                        <SelectItem value="pending">Chờ xác nhận</SelectItem>
                                        <SelectItem value="completed">Hoàn thành</SelectItem>
                                        <SelectItem value="cancelled">Đã hủy</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Ngày học</Label>
                                    <Input type="date" defaultValue="2024-10-30" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Giờ bắt đầu - Kết thúc</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                      <Input type="time" defaultValue="14:00" />
                                      <Input type="time" defaultValue="16:00" />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Địa điểm</Label>
                                    <Input defaultValue={appointment.location} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Ghi chú</Label>
                                    <Textarea defaultValue={appointment.notes} />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Hủy</Button>
                                  <Button>Lưu thay đổi</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            {appointment.status === "pending" && (
                              <>
                                <Button variant="ghost" size="icon" className="text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-destructive">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
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

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Danh sách lớp học</CardTitle>
                  <CardDescription>Quản lý các lớp học thường xuyên</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo lớp học mới
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên lớp</TableHead>
                      <TableHead>Tutor</TableHead>
                      <TableHead>Số sinh viên</TableHead>
                      <TableHead>Lịch học</TableHead>
                      <TableHead>Ngày bắt đầu</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClasses.map((classItem) => (
                      <TableRow key={classItem.id}>
                        <TableCell>{classItem.name}</TableCell>
                        <TableCell>{classItem.tutor}</TableCell>
                        <TableCell>{classItem.students} SV</TableCell>
                        <TableCell>{classItem.schedule}</TableCell>
                        <TableCell>{classItem.startDate}</TableCell>
                        <TableCell>
                          <Badge variant="default">
                            {classItem.status === "active" ? "Đang hoạt động" : "Kết thúc"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
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

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch rảnh của Tutor</CardTitle>
              <CardDescription>Xem và quản lý lịch trống của các Tutor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Chọn tutor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả Tutor</SelectItem>
                    <SelectItem value="tutor1">Nguyễn Văn A</SelectItem>
                    <SelectItem value="tutor2">Trần Thị B</SelectItem>
                    <SelectItem value="tutor3">Lê Minh C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tutorAvailability.map((item, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{item.tutor}</CardTitle>
                      <CardDescription>{item.day}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {item.slots.map((slot, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{slot}</span>
                            </div>
                            <Badge variant="outline">Trống</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
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
