import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  ChevronLeft,
  MoreVertical,
  UserCheck,
  UserX,
  Trophy,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  phone: string;
  avatar: string;
  currentGrade: number;
  attendance: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  status: "excellent" | "good" | "average" | "warning";
}

const students: Student[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    studentId: "20210001",
    email: "nguyen.vana@hcmut.edu.vn",
    phone: "0912345678",
    avatar: "https://images.unsplash.com/photo-1600178572204-6ac8886aae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxNTY0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentGrade: 9.2,
    attendance: 95,
    assignmentsCompleted: 4,
    totalAssignments: 4,
    status: "excellent",
  },
  {
    id: "2",
    name: "Trần Thị B",
    studentId: "20210002",
    email: "tran.thib@hcmut.edu.vn",
    phone: "0912345679",
    avatar: "https://images.unsplash.com/photo-1530878131793-cc5cbcba9a47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMGFzaWFufGVufDF8fHx8MTc2MTU3NDU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentGrade: 8.5,
    attendance: 90,
    assignmentsCompleted: 4,
    totalAssignments: 4,
    status: "good",
  },
  {
    id: "3",
    name: "Lê Văn C",
    studentId: "20210003",
    email: "le.vanc@hcmut.edu.vn",
    phone: "0912345680",
    avatar: "https://images.unsplash.com/photo-1631731194068-82d8e4c5f194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMG1hbGV8ZW58MXx8fHwxNzYxNTc0NTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentGrade: 7.8,
    attendance: 85,
    assignmentsCompleted: 3,
    totalAssignments: 4,
    status: "average",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    studentId: "20210004",
    email: "pham.thid@hcmut.edu.vn",
    phone: "0912345681",
    avatar: "https://images.unsplash.com/photo-1600178572204-6ac8886aae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxNTY0OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentGrade: 8.8,
    attendance: 92,
    assignmentsCompleted: 4,
    totalAssignments: 4,
    status: "good",
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    studentId: "20210005",
    email: "hoang.vane@hcmut.edu.vn",
    phone: "0912345682",
    avatar: "https://images.unsplash.com/photo-1631731194068-82d8e4c5f194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMG1hbGV8ZW58MXx8fHwxNzYxNTc0NTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentGrade: 6.5,
    attendance: 70,
    assignmentsCompleted: 2,
    totalAssignments: 4,
    status: "warning",
  },
  {
    id: "6",
    name: "Đặng Thị F",
    studentId: "20210006",
    email: "dang.thif@hcmut.edu.vn",
    phone: "0912345683",
    avatar: "https://images.unsplash.com/photo-1530878131793-cc5cbcba9a47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMGFzaWFufGVufDF8fHx8MTc2MTU3NDU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    currentGrade: 9.0,
    attendance: 98,
    assignmentsCompleted: 4,
    totalAssignments: 4,
    status: "excellent",
  },
];

interface ClassListProps {
  classCode: string;
  className: string;
  onBack: () => void;
}

export function ClassList({ classCode, className, onBack }: ClassListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.includes(searchQuery);
    const matchesFilter =
      filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: Student["status"]) => {
    switch (status) {
      case "excellent":
        return (
          <Badge className="bg-emerald-500 text-white border-0">
            Xuất sắc
          </Badge>
        );
      case "good":
        return (
          <Badge className="bg-blue-500 text-white border-0">Tốt</Badge>
        );
      case "average":
        return (
          <Badge className="bg-orange-500 text-white border-0">
            Trung bình
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-red-500 text-white border-0">Cảnh báo</Badge>
        );
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "text-emerald-600";
    if (grade >= 8) return "text-blue-600";
    if (grade >= 7) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 gap-2 hover:bg-white/50"
          >
            <ChevronLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2">Danh sách lớp {classCode}</h1>
              <p className="text-muted-foreground">{className}</p>
            </div>
            <Button className="bg-[#3BA5DB] hover:bg-[#2E8AB8] gap-2">
              <Download className="h-4 w-4" />
              Xuất danh sách
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Tổng sinh viên
                </p>
                <h2 className="text-primary">{students.length}</h2>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Xuất sắc</p>
                <h2 className="text-emerald-600">
                  {students.filter((s) => s.status === "excellent").length}
                </h2>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Điểm trung bình
                </p>
                <h2 className="text-primary">
                  {(
                    students.reduce((sum, s) => sum + s.currentGrade, 0) /
                    students.length
                  ).toFixed(1)}
                </h2>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Cảnh báo</p>
                <h2 className="text-red-600">
                  {students.filter((s) => s.status === "warning").length}
                </h2>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 border-0 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc MSSV..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="excellent">Xuất sắc</SelectItem>
                <SelectItem value="good">Tốt</SelectItem>
                <SelectItem value="average">Trung bình</SelectItem>
                <SelectItem value="warning">Cảnh báo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Students Table */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[50px]">STT</TableHead>
                  <TableHead>Sinh viên</TableHead>
                  <TableHead>MSSV</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead className="text-center">Điểm</TableHead>
                  <TableHead className="text-center">Tham dự</TableHead>
                  <TableHead className="text-center">Bài tập</TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="">{student.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.studentId}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span className="text-xs">{student.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span className="text-xs">{student.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`${getGradeColor(student.currentGrade)}`}>
                        {student.currentGrade.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm">{student.attendance}%</span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              student.attendance >= 90
                                ? "bg-emerald-500"
                                : student.attendance >= 80
                                ? "bg-blue-500"
                                : student.attendance >= 70
                                ? "bg-orange-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm">
                        {student.assignmentsCompleted}/{student.totalAssignments}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(student.status)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                          <DropdownMenuItem>Gửi tin nhắn</DropdownMenuItem>
                          <DropdownMenuItem>Xem lịch sử</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Cảnh báo
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
