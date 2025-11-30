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
import { Send, Plus, Eye, Edit, Trash2, Bell, Users, AlertCircle, Info, CheckCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

// Mock data
const mockNotifications = [
  {
    id: "1",
    title: "Bảo trì hệ thống",
    message: "Hệ thống sẽ bảo trì vào 2h sáng ngày 01/11/2024",
    type: "system",
    target: "all",
    sentDate: "28/10/2024 10:30",
    status: "sent",
    recipients: 2497
  },
  {
    id: "2",
    title: "Thông báo về buổi học",
    message: "Buổi học Toán cao cấp sẽ được dời sang 15:00",
    type: "appointment",
    target: "students",
    sentDate: "28/10/2024 09:15",
    status: "sent",
    recipients: 1
  },
  {
    id: "3",
    title: "Chào mừng tutor mới",
    message: "Chúc mừng bạn đã trở thành tutor của hệ thống",
    type: "welcome",
    target: "tutors",
    sentDate: "27/10/2024 14:20",
    status: "sent",
    recipients: 1
  },
  {
    id: "4",
    title: "Cập nhật tính năng mới",
    message: "Hệ thống vừa cập nhật tính năng đánh giá sau buổi học",
    type: "announcement",
    target: "all",
    sentDate: "26/10/2024 16:45",
    status: "scheduled",
    recipients: 2497
  },
];

const mockFAQs = [
  {
    id: "1",
    question: "Làm sao để đặt lịch với tutor?",
    answer: "Bạn có thể đặt lịch thông qua trang tìm kiếm tutor, chọn tutor phù hợp và chọn slot thời gian trống.",
    category: "student",
    views: 234,
    helpful: 189
  },
  {
    id: "2",
    question: "Tutor được thanh toán như thế nào?",
    answer: "Tutor sẽ nhận điểm tích lũy sau mỗi buổi học hoàn thành. Điểm có thể quy đổi thành học bổng.",
    category: "tutor",
    views: 156,
    helpful: 142
  },
  {
    id: "3",
    question: "Tôi có thể hủy buổi học không?",
    answer: "Có, bạn có thể hủy buổi học trước 24 giờ. Hủy muộn hơn có thể ảnh hưởng đến điểm uy tín.",
    category: "student",
    views: 198,
    helpful: 165
  },
  {
    id: "4",
    question: "Làm sao để trở thành tutor?",
    answer: "Bạn cần đăng ký và được coordinator phê duyệt. Cần có GPA >= 3.0 và hoàn thành khóa đào tạo.",
    category: "tutor",
    views: 421,
    helpful: 378
  },
];

const autoNotifications = [
  {
    event: "Đặt lịch thành công",
    template: "Buổi học {subject} với {tutor} đã được xác nhận vào {time}",
    enabled: true,
    triggerCount: 245
  },
  {
    event: "Nhắc nhở trước buổi học",
    template: "Nhắc nhở: Buổi học {subject} sẽ bắt đầu sau 1 giờ",
    enabled: true,
    triggerCount: 198
  },
  {
    event: "Buổi học bị hủy",
    template: "Buổi học {subject} vào {time} đã bị hủy",
    enabled: true,
    triggerCount: 23
  },
  {
    event: "Yêu cầu đánh giá",
    template: "Hãy đánh giá buổi học với {tutor} vừa kết thúc",
    enabled: true,
    triggerCount: 178
  },
];

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const getTypeIcon = (type: string) => {
    const icons: any = {
      system: <AlertCircle className="w-4 h-4 text-orange-500" />,
      appointment: <Bell className="w-4 h-4 text-blue-500" />,
      welcome: <CheckCircle className="w-4 h-4 text-green-500" />,
      announcement: <Info className="w-4 h-4 text-purple-500" />
    };
    return icons[type] || <Bell className="w-4 h-4" />;
  };

  const getTypeBadge = (type: string) => {
    const colors: any = {
      system: "destructive",
      appointment: "default",
      welcome: "default",
      announcement: "secondary"
    };
    return colors[type] || "outline";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Quản lý thông báo & Tin tức</h2>
          <p className="text-muted-foreground">Gửi thông báo và quản lý FAQ hệ thống</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tạo thông báo mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo thông báo mới</DialogTitle>
              <DialogDescription>Gửi thông báo đến người dùng trong hệ thống</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tiêu đề</Label>
                <Input placeholder="Nhập tiêu đề thông báo" />
              </div>
              <div className="space-y-2">
                <Label>Nội dung</Label>
                <Textarea placeholder="Nội dung chi tiết thông báo..." rows={5} />
              </div>
              <div className="space-y-2">
                <Label>Loại thông báo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">Hệ thống</SelectItem>
                    <SelectItem value="announcement">Thông báo chung</SelectItem>
                    <SelectItem value="appointment">Buổi học</SelectItem>
                    <SelectItem value="welcome">Chào mừng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Đối tượng nhận</Label>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">Tất cả người dùng</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="students" id="students" />
                    <Label htmlFor="students">Chỉ Students</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tutors" id="tutors" />
                    <Label htmlFor="tutors">Chỉ Tutors</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="coordinators" id="coordinators" />
                    <Label htmlFor="coordinators">Chỉ Coordinators</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="schedule" />
                <Label htmlFor="schedule">Lên lịch gửi sau</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Hủy</Button>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Gửi ngay
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications">Thông báo đã gửi</TabsTrigger>
          <TabsTrigger value="auto">Thông báo tự động</TabsTrigger>
          <TabsTrigger value="faq">FAQ & Trợ giúp</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử thông báo</CardTitle>
              <CardDescription>Danh sách thông báo đã gửi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Tìm kiếm thông báo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    <SelectItem value="system">Hệ thống</SelectItem>
                    <SelectItem value="announcement">Thông báo</SelectItem>
                    <SelectItem value="appointment">Buổi học</SelectItem>
                    <SelectItem value="welcome">Chào mừng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tiêu đề</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Đối tượng</TableHead>
                      <TableHead>Người nhận</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockNotifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(notification.type)}
                            <div>
                              <p>{notification.title}</p>
                              <p className="text-muted-foreground">{notification.message.slice(0, 50)}...</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getTypeBadge(notification.type)}>
                            {notification.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{notification.target}</Badge>
                        </TableCell>
                        <TableCell>{notification.recipients} người</TableCell>
                        <TableCell>{notification.sentDate}</TableCell>
                        <TableCell>
                          <Badge variant={notification.status === "sent" ? "default" : "secondary"}>
                            {notification.status === "sent" ? "Đã gửi" : "Đã lên lịch"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
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

        <TabsContent value="auto" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông báo tự động</CardTitle>
              <CardDescription>Cấu hình thông báo tự động khi có sự kiện</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {autoNotifications.map((auto, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Switch defaultChecked={auto.enabled} />
                        <div>
                          <CardTitle className="text-base">{auto.event}</CardTitle>
                          <CardDescription className="mt-1">{auto.template}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-muted-foreground">Đã gửi</p>
                          <p>{auto.triggerCount} lần</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>FAQ & Câu hỏi thường gặp</CardTitle>
                  <CardDescription>Quản lý câu hỏi và trợ giúp người dùng</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm FAQ
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Thêm câu hỏi mới</DialogTitle>
                      <DialogDescription>Tạo câu hỏi thường gặp mới</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Câu hỏi</Label>
                        <Input placeholder="Nhập câu hỏi" />
                      </div>
                      <div className="space-y-2">
                        <Label>Câu trả lời</Label>
                        <Textarea placeholder="Nhập câu trả lời..." rows={4} />
                      </div>
                      <div className="space-y-2">
                        <Label>Danh mục</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="tutor">Tutor</SelectItem>
                            <SelectItem value="general">Chung</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Hủy</Button>
                      <Button>Thêm FAQ</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Tìm kiếm FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="tutor">Tutor</SelectItem>
                    <SelectItem value="general">Chung</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {mockFAQs.map((faq) => (
                  <Card key={faq.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-base">{faq.question}</CardTitle>
                            <Badge variant="outline">{faq.category}</Badge>
                          </div>
                          <CardDescription>{faq.answer}</CardDescription>
                          <div className="flex items-center gap-4 mt-3 text-muted-foreground">
                            <span>👁 {faq.views} lượt xem</span>
                            <span>👍 {faq.helpful} hữu ích</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
