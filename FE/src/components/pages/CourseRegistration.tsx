import { useState, useEffect, useCallback } from "react";
import { Search, Calendar, MapPin, User, BookOpen, Users, CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { toast } from "sonner";

const BASE_API_URL = "http://localhost:5000";

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

export function CourseRegistration() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [registered, setRegistered] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState("available");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch user info
  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/me`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error("Chưa đăng nhập");
      const data = await response.json();
      setUserId(data.user.id.toString());
      return data.user.id;
    } catch (err) {
      console.error("User fetch error:", err);
      return null;
    }
  }, []);

  // Fetch courses data
  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const [availableRes, registeredRes] = await Promise.all([
        fetch(`${BASE_API_URL}/courses`, { credentials: 'include' }),
        fetch(`${BASE_API_URL}/registered`, { credentials: 'include' })
      ]);

      if (!availableRes.ok || !registeredRes.ok) {
        throw new Error("Lỗi tải dữ liệu");
      }

      const availableData = await availableRes.json();
      const registeredData = await registeredRes.json();

      setAvailableCourses(availableData);
      setRegistered(registeredData);
    } catch (error) {
      toast.error("Không thể tải dữ liệu khóa học");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    const init = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        await fetchCourses();
      } else {
        setIsLoading(false);
        toast.error("Vui lòng đăng nhập để xem khóa học");
      }
    };
    init();
  }, [fetchCurrentUser, fetchCourses]);

  // Filter courses
  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment =
      selectedDepartment === "all" || course.department === selectedDepartment;

    const isRegistered = registered.some(c => c.id === course.id);

    return matchesSearch && matchesDepartment && !isRegistered;
  });

  // Register course
  const handleRegister = (course: Course) => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập");
      return;
    }
    if (course.status === "full") {
      toast.error("Lớp học đã đầy");
      return;
    }
    setSelectedCourse(course);
    setShowDialog(true);
  };

  const confirmRegister = async () => {
    if (!selectedCourse) return;

    setIsProcessing(true);
    try {
      const response = await fetch(`${BASE_API_URL}/api/register_class`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ class_id: selectedCourse.id })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Đăng ký thất bại");
      }

      await fetchCourses();
      toast.success(`Đã đăng ký thành công môn ${selectedCourse.name}`);
      setShowDialog(false);
      setSelectedCourse(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Unregister course
  const handleUnregister = async (courseId: string) => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(`${BASE_API_URL}/api/unregister_class`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ class_id: courseId })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Hủy đăng ký thất bại");
      }

      await fetchCourses();
      toast.success("Đã hủy đăng ký thành công");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const totalCredits = registered.reduce((sum, course) => sum + course.credits, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

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

          {/* Stats - 4 cards in one horizontal row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  {/* Card 1 - Môn đã đăng ký */}
  <Card className="p-4 border-0" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
    <div className="text-white">
      <p className="text-sm opacity-90 mb-2">Môn đã đăng ký</p>
      <p className="text-3xl font-semibold">{registered.length}</p>
      <div className="flex justify-end mt-2">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <BookOpen className="h-5 w-5" />
        </div>
      </div>
    </div>
  </Card>

  {/* Card 2 - Tổng tín chỉ */}
  <Card className="p-4 border-0" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
    <div className="text-white">
      <p className="text-sm opacity-90 mb-2">Tổng tín chỉ</p>
      <p className="text-3xl font-semibold">{totalCredits}</p>
      <div className="flex justify-end mt-2">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Calendar className="h-5 w-5" />
        </div>
      </div>
    </div>
  </Card>

  {/* Card 3 - Môn có thể đăng ký */}
  <Card className="p-4 border-0" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)' }}>
    <div className="text-white">
      <p className="text-sm opacity-90 mb-2">Môn có thể đăng ký</p>
      <p className="text-3xl font-semibold">{availableCourses.filter(c => c.status === "available").length}</p>
      <div className="flex justify-end mt-2">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <CheckCircle className="h-5 w-5" />
        </div>
      </div>
    </div>
  </Card>

  {/* Card 4 - Học kỳ */}
  <Card className="p-4 border-0" style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }}>
    <div className="text-white">
      <p className="text-sm opacity-90 mb-2">Học kỳ</p>
      <p className="text-xl font-semibold">HK1 2024-2025</p>
      <div className="flex justify-end mt-2">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Calendar className="h-5 w-5" />
        </div>
      </div>
    </div>
  </Card>
</div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm môn học, mã môn, giảng viên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                style={{ backgroundColor: 'white' }}
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger 
                className="w-full md:w-[250px] bg-white border-gray-300"
                style={{ backgroundColor: 'white' }}
              >
                <SelectValue placeholder="Chọn khoa" />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: 'white' }}>
                <SelectItem value="all">Tất cả các khoa</SelectItem>
                <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                <SelectItem value="Toán học">Toán học</SelectItem>
                <SelectItem value="Vật lý">Vật lý</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs with indicator */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList 
          className="mb-6 p-1 h-auto rounded-xl w-full relative border-2 shadow-sm"
          style={{ 
            backgroundColor: '#ffffff', 
            borderColor: '#d1d5db'
          }}
        >
          <div className="flex w-full">
            <TabsTrigger 
              value="available" 
              className="gap-2 rounded-lg px-6 py-3 flex-1 transition-all duration-200 border-b-2"
              style={{
                backgroundColor: activeTab === 'available' ? '#f3f4f6' : 'transparent',
                color: activeTab === 'available' ? '#1f2937' : '#6b7280',
                borderBottomColor: activeTab === 'available' ? '#6b7280' : 'transparent',
                fontWeight: activeTab === 'available' ? '600' : '400'
              }}
            >
              <BookOpen className="h-4 w-4" />
              Môn học có thể đăng ký
            </TabsTrigger>
            <TabsTrigger 
              value="registered" 
              className="gap-2 rounded-lg px-6 py-3 flex-1 transition-all duration-200 border-b-2"
              style={{
                backgroundColor: activeTab === 'registered' ? '#f3f4f6' : 'transparent',
                color: activeTab === 'registered' ? '#1f2937' : '#6b7280',
                borderBottomColor: activeTab === 'registered' ? '#6b7280' : 'transparent',
                fontWeight: activeTab === 'registered' ? '600' : '400'
              }}
            >
              <CheckCircle className="h-4 w-4" />
              Môn đã đăng ký ({registered.length})
            </TabsTrigger>
          </div>
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
