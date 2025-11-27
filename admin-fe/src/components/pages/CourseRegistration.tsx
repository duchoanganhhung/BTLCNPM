import { useState } from "react";
import { Search, Filter, Calendar, Clock, MapPin, User, BookOpen, Users, CheckCircle, XCircle, AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  schedule: string;
  room: string;
  capacity: number;
  enrolled: number;
  status: "available" | "full" | "pending";
  semester: string;
  department: string;
  description: string;
  prerequisites?: string[];
}

const availableCourses: Course[] = [
  {
    id: "1",
    code: "IT4080",
    name: "Trí tuệ nhân tạo",
    credits: 3,
    instructor: "PGS.TS. Nguyễn Văn A",
    schedule: "Thứ 2, 9:00 - 11:00",
    room: "D3-201",
    capacity: 60,
    enrolled: 45,
    status: "available",
    semester: "HK1 2024-2025",
    department: "Công nghệ thông tin",
    description: "Giới thiệu về các khái niệm cơ bản trong trí tuệ nhân tạo, học máy, và xử lý ngôn ngữ tự nhiên.",
    prerequisites: ["IT3100", "IT3080"],
  },
  {
    id: "2",
    code: "IT4090",
    name: "An toàn thông tin",
    credits: 3,
    instructor: "TS. Trần Thị B",
    schedule: "Thứ 3, 13:00 - 15:00",
    room: "D9-301",
    capacity: 50,
    enrolled: 48,
    status: "available",
    semester: "HK1 2024-2025",
    department: "Công nghệ thông tin",
    description: "Các nguyên lý cơ bản về an toàn và bảo mật thông tin trong hệ thống máy tính.",
    prerequisites: ["IT3090"],
  },
  {
    id: "3",
    code: "IT4100",
    name: "Học sâu và ứng dụng",
    credits: 4,
    instructor: "PGS.TS. Lê Văn C",
    schedule: "Thứ 4, 15:00 - 17:00",
    room: "D3-105",
    capacity: 40,
    enrolled: 40,
    status: "full",
    semester: "HK1 2024-2025",
    department: "Công nghệ thông tin",
    description: "Các kỹ thuật học sâu hiện đại và ứng dụng trong thị giác máy tính, xử lý ngôn ngữ tự nhiên.",
    prerequisites: ["IT4080"],
  },
  {
    id: "4",
    code: "IT4110",
    name: "Phát triển ứng dụng Web",
    credits: 3,
    instructor: "ThS. Phạm Thị D",
    schedule: "Thứ 5, 9:00 - 11:00",
    room: "D8-201",
    capacity: 55,
    enrolled: 32,
    status: "available",
    semester: "HK1 2024-2025",
    department: "Công nghệ thông tin",
    description: "Phát triển các ứng dụng web hiện đại sử dụng React, Node.js và các công nghệ liên quan.",
    prerequisites: ["IT3120"],
  },
  {
    id: "5",
    code: "IT4120",
    name: "Điện toán đám mây",
    credits: 3,
    instructor: "TS. Hoàng Văn E",
    schedule: "Thứ 6, 13:00 - 15:00",
    room: "D3-201",
    capacity: 45,
    enrolled: 30,
    status: "available",
    semester: "HK1 2024-2025",
    department: "Công nghệ thông tin",
    description: "Các khái niệm và công nghệ điện toán đám mây, AWS, Azure, Google Cloud Platform.",
    prerequisites: ["IT3090"],
  },
  {
    id: "6",
    code: "IT4130",
    name: "Phân tích dữ liệu lớn",
    credits: 4,
    instructor: "PGS.TS. Đỗ Thị F",
    schedule: "Thứ 2, 15:00 - 17:00",
    room: "D9-105",
    capacity: 50,
    enrolled: 25,
    status: "available",
    semester: "HK1 2024-2025",
    department: "Công nghệ thông tin",
    description: "Kỹ thuật phân tích và xử lý dữ liệu lớn với Hadoop, Spark và các công cụ liên quan.",
    prerequisites: ["IT3080", "IT3100"],
  },
];

const registeredCourses: Course[] = [
  {
    id: "reg1",
    code: "IT3100",
    name: "Cấu trúc dữ liệu",
    credits: 3,
    instructor: "TS. Nguyễn Văn A",
    schedule: "Thứ 2, 9:00 - 11:00",
    room: "D3-201",
    capacity: 60,
    enrolled: 55,
    status: "available",
    semester: "HK1 2024-2025",
    department: "Công nghệ thông tin",
    description: "Các cấu trúc dữ liệu cơ bản và nâng cao.",
  },
  {
    id: "reg2",
    code: "MI1111",
    name: "Giải tích 1",
    credits: 4,
    instructor: "PGS. Lê Thị B",
    schedule: "Thứ 3, 13:00 - 15:00",
    room: "C1-105",
    capacity: 80,
    enrolled: 75,
    status: "available",
    semester: "HK1 2024-2025",
    department: "Toán học",
    description: "Giải tích một biến số.",
  },
];

export function CourseRegistration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [registered, setRegistered] = useState<Course[]>(registeredCourses);
  const [activeTab, setActiveTab] = useState("available");

  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment =
      selectedDepartment === "all" || course.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const handleRegister = (course: Course) => {
    if (course.status === "full") {
      toast.error("Lớp học đã đầy");
      return;
    }

    // Check if already registered
    if (registered.find((c) => c.id === course.id)) {
      toast.error("Bạn đã đăng ký môn học này");
      return;
    }

    setSelectedCourse(course);
    setShowDialog(true);
  };

  const confirmRegister = () => {
    if (selectedCourse) {
      setRegistered([...registered, selectedCourse]);
      toast.success(`Đã đăng ký thành công môn ${selectedCourse.name}`);
      setShowDialog(false);
      setSelectedCourse(null);
    }
  };

  const handleUnregister = (courseId: string) => {
    const course = registered.find((c) => c.id === courseId);
    if (course) {
      setRegistered(registered.filter((c) => c.id !== courseId));
      toast.success(`Đã hủy đăng ký môn ${course.name}`);
    }
  };

  const totalCredits = registered.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2">Đăng ký học phần</h1>
              <p className="text-muted-foreground">
                Đăng ký các môn học cho học kỳ hiện tại
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Môn đã đăng ký</p>
                  <p className="text-3xl mt-1">{registered.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Tổng tín chỉ</p>
                  <p className="text-3xl mt-1">{totalCredits}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Môn có thể đăng ký</p>
                  <p className="text-3xl mt-1">{availableCourses.filter(c => c.status === "available").length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Học kỳ</p>
                  <p className="text-xl mt-1">HK1 2024-2025</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm môn học, mã môn, giảng viên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Chọn khoa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả các khoa</SelectItem>
                <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                <SelectItem value="Toán học">Toán học</SelectItem>
                <SelectItem value="Vật lý">Vật lý</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-white p-1 h-auto">
            <TabsTrigger value="available" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BookOpen className="h-4 w-4" />
              Môn học có thể đăng ký
            </TabsTrigger>
            <TabsTrigger value="registered" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CheckCircle className="h-4 w-4" />
              Môn đã đăng ký ({registered.length})
            </TabsTrigger>
          </TabsList>

          {/* Available Courses */}
          <TabsContent value="available" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <h3>{course.name}</h3>
                          <Badge variant="outline" className="mt-1">
                            {course.code}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {course.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {course.status === "available" && (
                          <Badge className="bg-green-500 text-white border-0">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Còn chỗ
                          </Badge>
                        )}
                        {course.status === "full" && (
                          <Badge className="bg-red-500 text-white border-0">
                            <XCircle className="h-3 w-3 mr-1" />
                            Hết chỗ
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Giảng viên</p>
                          <p className="line-clamp-1">{course.instructor}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Lịch học</p>
                          <p className="line-clamp-1">{course.schedule}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Phòng học</p>
                          <p>{course.room}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Tín chỉ</p>
                          <p>{course.credits} TC</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {course.enrolled}/{course.capacity} sinh viên
                          </span>
                        </div>
                        <div className="flex-1 max-w-[200px]">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                course.status === "full"
                                  ? "bg-red-500"
                                  : course.enrolled / course.capacity > 0.8
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${(course.enrolled / course.capacity) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleRegister(course)}
                        disabled={course.status === "full" || registered.find((c) => c.id === course.id) !== undefined}
                        className="gap-2"
                      >
                        {registered.find((c) => c.id === course.id) ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Đã đăng ký
                          </>
                        ) : (
                          <>
                            <BookOpen className="h-4 w-4" />
                            Đăng ký
                          </>
                        )}
                      </Button>
                    </div>

                    {course.prerequisites && course.prerequisites.length > 0 && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="text-amber-900">
                            Môn học tiên quyết: {course.prerequisites.join(", ")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}

              {filteredCourses.length === 0 && (
                <Card className="p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3>Không tìm thấy môn học</h3>
                      <p className="text-muted-foreground mt-2">
                        Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Registered Courses */}
          <TabsContent value="registered" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {registered.map((course) => (
                <Card key={course.id} className="overflow-hidden border-0 shadow-md">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <h3>{course.name}</h3>
                          <Badge variant="outline" className="mt-1">
                            {course.code}
                          </Badge>
                          <Badge className="bg-green-500 text-white border-0 mt-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Đã đăng ký
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Giảng viên</p>
                          <p className="line-clamp-1">{course.instructor}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Lịch học</p>
                          <p className="line-clamp-1">{course.schedule}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Phòng học</p>
                          <p>{course.room}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Tín chỉ</p>
                          <p>{course.credits} TC</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm" className="gap-2">
                        Xem chi tiết
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleUnregister(course.id)}
                      >
                        <XCircle className="h-4 w-4" />
                        Hủy đăng ký
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {registered.length === 0 && (
                <Card className="p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3>Chưa đăng ký môn học nào</h3>
                      <p className="text-muted-foreground mt-2">
                        Hãy chuyển sang tab "Môn học có thể đăng ký" để đăng ký môn học
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Registration Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xác nhận đăng ký</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn đăng ký môn học này?
              </DialogDescription>
            </DialogHeader>
            {selectedCourse && (
              <div className="py-4 space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="mb-2">{selectedCourse.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedCourse.code} • {selectedCourse.credits} tín chỉ
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCourse.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCourse.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCourse.room}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    Sau khi đăng ký, bạn có thể hủy đăng ký trong vòng 2 tuần đầu của học kỳ.
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Hủy
              </Button>
              <Button onClick={confirmRegister}>
                Xác nhận đăng ký
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
