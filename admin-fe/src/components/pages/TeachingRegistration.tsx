import { useState } from "react";
import { Search, Filter, Calendar, Clock, MapPin, Users, BookOpen, CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
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
  schedule: string;
  room: string;
  capacity: number;
  enrolled: number;
  status: "open" | "full" | "closed";
  semester: string;
  department: string;
  description: string;
  requirements: string;
  hoursPerWeek: number;
}

interface CourseFormData {
  code: string;
  name: string;
  credits: string;
  schedule: string;
  room: string;
  capacity: string;
  department: string;
  description: string;
  requirements: string;
  hoursPerWeek: string;
}

const initialCourses: Course[] = [
  {
    id: "1",
    code: "IT3100-01",
    name: "Cấu trúc dữ liệu",
    credits: 3,
    schedule: "Thứ 2, 9:00 - 11:00",
    room: "D3-201",
    capacity: 60,
    enrolled: 55,
    status: "open",
    semester: "HK1 2024-2025",
    department: "Công nghệ thông tin",
    description: "Giảng dạy các cấu trúc dữ liệu cơ bản và nâng cao.",
    requirements: "Sinh viên đã hoàn thành môn Nhập môn lập trình",
    hoursPerWeek: 3,
  },
  {
    id: "2",
    code: "IT2500-01",
    name: "Phát triển ứng dụng Web",
    credits: 3,
    schedule: "Thứ 4, 13:00 - 15:00",
    room: "D9-105",
    capacity: 50,
    enrolled: 32,
    status: "open",
    semester: "HK1 2024-2025",
    department: "Công nghệ thông tin",
    description: "Học xây dựng ứng dụng web hiện đại với React, Node.js.",
    requirements: "Biết HTML, CSS, JavaScript cơ bản",
    hoursPerWeek: 2,
  },
];

export function TeachingRegistration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [showDialog, setShowDialog] = useState(false);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [activeTab, setActiveTab] = useState("courses");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  
  const [formData, setFormData] = useState<CourseFormData>({
    code: "",
    name: "",
    credits: "3",
    schedule: "",
    room: "",
    capacity: "50",
    department: "Công nghệ thông tin",
    description: "",
    requirements: "",
    hoursPerWeek: "2",
  });

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment =
      selectedDepartment === "all" || course.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const handleCreateCourse = () => {
    if (!formData.code || !formData.name || !formData.schedule || !formData.room || !formData.description) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      code: formData.code,
      name: formData.name,
      credits: parseInt(formData.credits),
      schedule: formData.schedule,
      room: formData.room,
      capacity: parseInt(formData.capacity),
      enrolled: 0,
      status: "open",
      semester: "HK1 2024-2025",
      department: formData.department,
      description: formData.description,
      requirements: formData.requirements,
      hoursPerWeek: parseInt(formData.hoursPerWeek),
    };

    setCourses([...courses, newCourse]);
    toast.success(`Đã đăng khóa học ${formData.name} thành công`);
    setShowDialog(false);
    resetForm();
  };

  const handleUpdateCourse = () => {
    if (!editingCourse) return;

    if (!formData.code || !formData.name || !formData.schedule || !formData.room || !formData.description) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    const updatedCourse: Course = {
      ...editingCourse,
      code: formData.code,
      name: formData.name,
      credits: parseInt(formData.credits),
      schedule: formData.schedule,
      room: formData.room,
      capacity: parseInt(formData.capacity),
      department: formData.department,
      description: formData.description,
      requirements: formData.requirements,
      hoursPerWeek: parseInt(formData.hoursPerWeek),
    };

    setCourses(courses.map(c => c.id === editingCourse.id ? updatedCourse : c));
    toast.success(`Đã cập nhật khóa học ${formData.name}`);
    setShowDialog(false);
    setEditingCourse(null);
    resetForm();
  };

  const handleDeleteCourse = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setCourses(courses.filter((c) => c.id !== courseId));
      toast.success(`Đã xóa khóa học ${course.name}`);
    }
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      code: course.code,
      name: course.name,
      credits: course.credits.toString(),
      schedule: course.schedule,
      room: course.room,
      capacity: course.capacity.toString(),
      department: course.department,
      description: course.description,
      requirements: course.requirements,
      hoursPerWeek: course.hoursPerWeek.toString(),
    });
    setShowDialog(true);
  };

  const openCreateDialog = () => {
    setEditingCourse(null);
    resetForm();
    setShowDialog(true);
  };

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      credits: "3",
      schedule: "",
      room: "",
      capacity: "50",
      department: "Công nghệ thông tin",
      description: "",
      requirements: "",
      hoursPerWeek: "2",
    });
  };

  const totalCourses = courses.length;
  const totalStudents = courses.reduce((sum, course) => sum + course.enrolled, 0);
  const totalHours = courses.reduce((sum, course) => sum + course.hoursPerWeek, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2">Quản lý khóa học</h1>
              <p className="text-muted-foreground">
                Đăng và quản lý các khóa học bạn muốn giảng dạy
              </p>
            </div>
            <Button onClick={openCreateDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Đăng khóa học mới
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Khóa học đã đăng</p>
                  <p className="text-3xl mt-1">{totalCourses}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Tổng sinh viên</p>
                  <p className="text-3xl mt-1">{totalStudents}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Khóa đang mở</p>
                  <p className="text-3xl mt-1">{courses.filter(c => c.status === "open").length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Giờ dạy/tuần</p>
                  <p className="text-3xl mt-1">{totalHours}h</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm lớp học, mã lớp, mô tả..."
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
            <TabsTrigger value="courses" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BookOpen className="h-4 w-4" />
              Khóa học của tôi ({totalCourses})
            </TabsTrigger>
          </TabsList>

          {/* My Courses */}
          <TabsContent value="courses" className="mt-0">
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
                          <Badge className="bg-green-500 text-white border-0 mt-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Đang mở
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Lịch dạy</p>
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

                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Giờ dạy/tuần</p>
                          <p>{course.hoursPerWeek}h</p>
                        </div>
                      </div>
                    </div>

                    {course.requirements && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm">
                            <p className="text-blue-900 mb-1">Yêu cầu:</p>
                            <p className="text-blue-800">{course.requirements}</p>
                          </div>
                        </div>
                      </div>
                    )}

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
                              className="h-full rounded-full bg-green-500"
                              style={{
                                width: `${(course.enrolled / course.capacity) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => openEditDialog(course)}
                        >
                          <Edit className="h-4 w-4" />
                          Sửa
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {filteredCourses.length === 0 && (
                <Card className="p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3>Chưa có khóa học nào</h3>
                      <p className="text-muted-foreground mt-2">
                        Nhấn "Đăng khóa học mới" để bắt đầu chia sẻ kiến thức
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create/Edit Course Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Chỉnh sửa khóa học" : "Đăng khóa học mới"}</DialogTitle>
              <DialogDescription>
                {editingCourse ? "Cập nhật thông tin khóa học của bạn" : "Điền thông tin về khóa học bạn muốn giảng dạy"}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Mã môn học <span className="text-red-500">*</span></Label>
                  <Input
                    id="code"
                    placeholder="VD: IT3100-01"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Khoa</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                    <SelectTrigger id="department">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                      <SelectItem value="Toán học">Toán học</SelectItem>
                      <SelectItem value="Vật lý">Vật lý</SelectItem>
                      <SelectItem value="Hóa học">Hóa học</SelectItem>
                      <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Tên khóa học <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  placeholder="VD: Cấu trúc dữ liệu"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả <span className="text-red-500">*</span></Label>
                <Textarea
                  id="description"
                  placeholder="Mô tả ngắn gọn về nội dung khóa học..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="credits">Tín chỉ</Label>
                  <Select value={formData.credits} onValueChange={(value) => setFormData({ ...formData, credits: value })}>
                    <SelectTrigger id="credits">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 TC</SelectItem>
                      <SelectItem value="2">2 TC</SelectItem>
                      <SelectItem value="3">3 TC</SelectItem>
                      <SelectItem value="4">4 TC</SelectItem>
                      <SelectItem value="5">5 TC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Sức chứa</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="50"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hoursPerWeek">Giờ/tuần</Label>
                  <Select value={formData.hoursPerWeek} onValueChange={(value) => setFormData({ ...formData, hoursPerWeek: value })}>
                    <SelectTrigger id="hoursPerWeek">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 giờ</SelectItem>
                      <SelectItem value="3">3 giờ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule">Lịch học <span className="text-red-500">*</span></Label>
                  <Input
                    id="schedule"
                    placeholder="VD: Thứ 2, 9:00 - 11:00"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Phòng học <span className="text-red-500">*</span></Label>
                  <Input
                    id="room"
                    placeholder="VD: D3-201"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Yêu cầu đối với sinh viên</Label>
                <Textarea
                  id="requirements"
                  placeholder="VD: Sinh viên đã hoàn thành môn Nhập môn lập trình..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setShowDialog(false);
                setEditingCourse(null);
                resetForm();
              }}>
                Hủy
              </Button>
              <Button onClick={editingCourse ? handleUpdateCourse : handleCreateCourse}>
                {editingCourse ? "Cập nhật" : "Đăng khóa học"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
