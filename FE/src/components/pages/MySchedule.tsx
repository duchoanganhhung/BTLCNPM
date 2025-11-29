import { useState } from "react";
import { Calendar, List, Clock, MapPin, User, Search, ChevronLeft, ChevronRight, Download, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

const scheduleData = [
  {
    id: "1",
    course: "Cấu trúc dữ liệu",
    code: "IT3100",
    instructor: "TS. Nguyễn Văn A",
    time: "09:00 - 11:00",
    day: 2,
    dayName: "Thứ 2",
    room: "D3-201",
    color: "bg-blue-500",
    colorLight: "bg-blue-50",
    colorText: "text-blue-600",
    colorBorder: "border-blue-500",
    startHour: 9,
    duration: 2,
    credits: 3,
  },
  {
    id: "2",
    course: "Giải tích 1",
    code: "MI1111",
    instructor: "PGS. Lê Thị B",
    time: "13:00 - 15:00",
    day: 3,
    dayName: "Thứ 3",
    room: "C1-105",
    color: "bg-emerald-500",
    colorLight: "bg-emerald-50",
    colorText: "text-emerald-600",
    colorBorder: "border-emerald-500",
    startHour: 13,
    duration: 2,
    credits: 4,
  },
  {
    id: "3",
    course: "Lập trình hướng đối tượng",
    code: "IT3120",
    instructor: "TS. Trần Văn C",
    time: "15:00 - 17:00",
    day: 4,
    dayName: "Thứ 4",
    room: "D9-301",
    color: "bg-purple-500",
    colorLight: "bg-purple-50",
    colorText: "text-purple-600",
    colorBorder: "border-purple-500",
    startHour: 15,
    duration: 2,
    credits: 3,
  },
  {
    id: "4",
    course: "Cơ sở dữ liệu",
    code: "IT3080",
    instructor: "ThS. Phạm Thị D",
    time: "09:00 - 11:00",
    day: 5,
    dayName: "Thứ 5",
    room: "D3-105",
    color: "bg-orange-500",
    colorLight: "bg-orange-50",
    colorText: "text-orange-600",
    colorBorder: "border-orange-500",
    startHour: 9,
    duration: 2,
    credits: 3,
  },
  {
    id: "5",
    course: "Mạng máy tính",
    code: "IT3090",
    instructor: "TS. Hoàng Văn E",
    time: "13:00 - 15:00",
    day: 6,
    dayName: "Thứ 6",
    room: "D8-201",
    color: "bg-pink-500",
    colorLight: "bg-pink-50",
    colorText: "text-pink-600",
    colorBorder: "border-pink-500",
    startHour: 13,
    duration: 2,
    credits: 2,
  },
  {
    id: "6",
    course: "Cấu trúc dữ liệu",
    code: "IT3100",
    instructor: "TS. Nguyễn Văn A",
    time: "15:00 - 17:00",
    day: 2,
    dayName: "Thứ 2",
    room: "D3-201",
    color: "bg-blue-500",
    colorLight: "bg-blue-50",
    colorText: "text-blue-600",
    colorBorder: "border-blue-500",
    startHour: 15,
    duration: 2,
    credits: 3,
  },
  {
    id: "7",
    course: "Giải tích 1",
    code: "MI1111",
    instructor: "PGS. Lê Thị B",
    time: "09:00 - 11:00",
    day: 4,
    dayName: "Thứ 4",
    room: "C1-105",
    color: "bg-emerald-500",
    colorLight: "bg-emerald-50",
    colorText: "text-emerald-600",
    colorBorder: "border-emerald-500",
    startHour: 9,
    duration: 2,
    credits: 4,
  },
];

const timeSlots = [
  { time: "07:00", hour: 7 },
  { time: "08:00", hour: 8 },
  { time: "09:00", hour: 9 },
  { time: "10:00", hour: 10 },
  { time: "11:00", hour: 11 },
  { time: "12:00", hour: 12 },
  { time: "13:00", hour: 13 },
  { time: "14:00", hour: 14 },
  { time: "15:00", hour: 15 },
  { time: "16:00", hour: 16 },
  { time: "17:00", hour: 17 },
  { time: "18:00", hour: 18 },
];

const weekDays = [
  { id: 2, name: "Thứ 2", short: "T2" },
  { id: 3, name: "Thứ 3", short: "T3" },
  { id: 4, name: "Thứ 4", short: "T4" },
  { id: 5, name: "Thứ 5", short: "T5" },
  { id: 6, name: "Thứ 6", short: "T6" },
  { id: 7, name: "Thứ 7", short: "T7" },
  { id: 8, name: "Chủ nhật", short: "CN" },
];

export function MySchedule() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentWeek, setCurrentWeek] = useState("Tuần 1 - Học kỳ 1, 2024-2025");

  const filteredSchedule = scheduleData.filter((course) =>
    course.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCredits = scheduleData.reduce((sum, course) => {
    if (!scheduleData.find(c => c.code === course.code && c.id < course.id)) {
      return sum + course.credits;
    }
    return sum;
  }, 0);

  const uniqueCourses = scheduleData.filter((course, index, self) =>
    index === self.findIndex((c) => c.code === course.code)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2">Lịch học của tôi</h1>
              <p className="text-muted-foreground">
                Quản lý và theo dõi lịch học trong tuần
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Lọc
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Xuất PDF
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Tổng môn học</p>
                  <p className="text-3xl mt-1">{uniqueCourses.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6" />
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
                  <p className="text-sm opacity-90">Buổi học/tuần</p>
                  <p className="text-3xl mt-1">{scheduleData.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Ngày học</p>
                  <p className="text-3xl mt-1">5</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Week Navigation */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm môn học, mã môn, giảng viên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm min-w-[200px] text-center">{currentWeek}</span>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="mb-6 bg-white p-1 h-auto">
            <TabsTrigger value="calendar" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="h-4 w-4" />
              Xem theo lịch
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <List className="h-4 w-4" />
              Xem danh sách
            </TabsTrigger>
          </TabsList>

          {/* Calendar View */}
          <TabsContent value="calendar" className="mt-0">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="overflow-x-auto">
                <div className="min-w-[900px]">
                  <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-0">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 sticky top-0 z-10"></div>
                    {weekDays.map((day) => (
                      <div
                        key={day.id}
                        className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4 text-center sticky top-0 z-10"
                      >
                        <p className="hidden md:block">{day.name}</p>
                        <p className="md:hidden">{day.short}</p>
                      </div>
                    ))}

                    {/* Time slots */}
                    {timeSlots.map((slot) => {
                      const isBreakTime = slot.hour === 12;
                      return (
                        <>
                          <div
                            key={`time-${slot.time}`}
                            className={`p-4 border-r border-b text-sm ${
                              isBreakTime
                                ? "bg-amber-50 text-amber-700"
                                : "bg-gray-50 text-muted-foreground"
                            }`}
                          >
                            <div className="sticky left-0">
                              {slot.time}
                              {isBreakTime && (
                                <p className="text-xs mt-1">Nghỉ trưa</p>
                              )}
                            </div>
                          </div>
                          {weekDays.map((day) => {
                            const coursesInSlot = filteredSchedule.filter(
                              (course) =>
                                course.day === day.id &&
                                course.startHour === slot.hour
                            );

                            return (
                              <div
                                key={`slot-${day.id}-${slot.time}`}
                                className={`border-b border-l relative min-h-[80px] p-2 transition-colors hover:bg-gray-50 ${
                                  isBreakTime ? "bg-amber-50/30" : "bg-white"
                                }`}
                              >
                                {coursesInSlot.map((course) => (
                                  <button
                                    key={course.id}
                                    onClick={() => setSelectedCourse(course.id)}
                                    className={`${course.color} text-white rounded-lg p-3 text-left w-full text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02] relative overflow-hidden group`}
                                    style={{
                                      minHeight: `${course.duration * 70}px`,
                                    }}
                                  >
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                                    <p className="line-clamp-2 mb-1">
                                      {course.course}
                                    </p>
                                    <p className="text-xs opacity-90 mb-1">
                                      {course.code}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs opacity-90">
                                      <MapPin className="h-3 w-3" />
                                      <span>{course.room}</span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            );
                          })}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            {/* Course Details Modal */}
            {selectedCourse && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                <Card className="max-w-lg w-full p-6 animate-in zoom-in-95 duration-200">
                  {(() => {
                    const course = scheduleData.find((c) => c.id === selectedCourse);
                    if (!course) return null;
                    return (
                      <div>
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <h2 className="mb-2">{course.course}</h2>
                            <p className="text-muted-foreground">{course.code}</p>
                          </div>
                          <Badge className={`${course.color} text-white border-0`}>
                            {course.dayName}
                          </Badge>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                            <div className={`w-10 h-10 rounded-lg ${course.colorLight} ${course.colorText} flex items-center justify-center flex-shrink-0`}>
                              <Clock className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground mb-1">
                                Thời gian
                              </p>
                              <p>{course.time}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                            <div className={`w-10 h-10 rounded-lg ${course.colorLight} ${course.colorText} flex items-center justify-center flex-shrink-0`}>
                              <MapPin className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground mb-1">
                                Phòng học
                              </p>
                              <p>{course.room}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                            <div className={`w-10 h-10 rounded-lg ${course.colorLight} ${course.colorText} flex items-center justify-center flex-shrink-0`}>
                              <User className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground mb-1">
                                Giảng viên
                              </p>
                              <p>{course.instructor}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                            <div className={`w-10 h-10 rounded-lg ${course.colorLight} ${course.colorText} flex items-center justify-center flex-shrink-0`}>
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground mb-1">
                                Số tín chỉ
                              </p>
                              <p>{course.credits} tín chỉ</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setSelectedCourse(null)}
                          >
                            Đóng
                          </Button>
                          <Button className="flex-1">Xem chi tiết</Button>
                        </div>
                      </div>
                    );
                  })()}
                </Card>
              </div>
            )}
          </TabsContent>

          {/* List View */}
          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {weekDays.map((day) => {
                const daySchedule = filteredSchedule.filter((c) => c.day === day.id);
                if (daySchedule.length === 0) return null;

                return (
                  <Card key={day.id} className="overflow-hidden border-0 shadow-md">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white">{day.name}</h3>
                        <Badge variant="secondary" className="bg-white/20 text-white border-0">
                          {daySchedule.length} buổi học
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      {daySchedule
                        .sort((a, b) => a.startHour - b.startHour)
                        .map((course, index) => (
                          <div
                            key={course.id}
                            className="group relative"
                          >
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${course.color} rounded-full`} />
                            <div className="pl-6 pr-4 py-4 rounded-lg bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all border border-gray-100">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className="mb-1">{course.course}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {course.code} • {course.credits} tín chỉ
                                  </p>
                                </div>
                                <Badge className={`${course.color} text-white border-0`}>
                                  {course.time}
                                </Badge>
                              </div>

                              <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <div className={`w-8 h-8 rounded-lg ${course.colorLight} ${course.colorText} flex items-center justify-center`}>
                                    <User className="h-4 w-4" />
                                  </div>
                                  <span>{course.instructor}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <div className={`w-8 h-8 rounded-lg ${course.colorLight} ${course.colorText} flex items-center justify-center`}>
                                    <MapPin className="h-4 w-4" />
                                  </div>
                                  <span>{course.room}</span>
                                </div>
                              </div>

                              <div className="mt-4 pt-4 border-t flex gap-2">
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Calendar className="h-4 w-4" />
                                  Thêm vào lịch
                                </Button>
                                <Button variant="outline" size="sm">
                                  Xem chi tiết
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Card>
                );
              })}
            </div>

            {filteredSchedule.length === 0 && (
              <Card className="p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3>Không tìm thấy kết quả</h3>
                    <p className="text-muted-foreground mt-2">
                      Thử tìm kiếm với từ khóa khác
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
