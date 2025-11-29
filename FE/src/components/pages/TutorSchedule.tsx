import { useState } from "react";
import { Calendar, Clock, Plus, X, Check, BookOpen, Users } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "../ui/utils";

interface TimeSlot {
  id: string;
  day: string;
  time: string;
  available: boolean;
}

interface TeachingClass {
  id: string;
  courseCode: string;
  courseName: string;
  day: string;
  time: string;
  room: string;
  students: number;
  color: string;
}

const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const timeSlots = [
  "7:00 - 9:00",
  "9:00 - 11:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "18:00 - 20:00",
];

export function TutorSchedule() {
  const [availability, setAvailability] = useState<TimeSlot[]>([
    { id: "1", day: "Thứ 2", time: "9:00 - 11:00", available: true },
    { id: "2", day: "Thứ 2", time: "13:00 - 15:00", available: true },
    { id: "3", day: "Thứ 3", time: "9:00 - 11:00", available: true },
    { id: "4", day: "Thứ 4", time: "13:00 - 15:00", available: true },
    { id: "5", day: "Thứ 5", time: "14:00 - 16:00", available: true },
    { id: "6", day: "Thứ 6", time: "9:00 - 11:00", available: true },
  ]);

  const [teachingClasses] = useState<TeachingClass[]>([
    {
      id: "1",
      courseCode: "CS101",
      courseName: "Nhập môn lập trình",
      day: "Thứ 2",
      time: "7:00 - 9:00",
      room: "H1-201",
      students: 15,
      color: "bg-blue-100 border-blue-500 text-blue-700",
    },
    {
      id: "2",
      courseCode: "MATH201",
      courseName: "Giải tích 2",
      day: "Thứ 3",
      time: "13:00 - 15:00",
      room: "H2-305",
      students: 12,
      color: "bg-purple-100 border-purple-500 text-purple-700",
    },
    {
      id: "3",
      courseCode: "CS101",
      courseName: "Nhập môn lập trình",
      day: "Thứ 5",
      time: "9:00 - 11:00",
      room: "H1-201",
      students: 18,
      color: "bg-blue-100 border-blue-500 text-blue-700",
    },
    {
      id: "4",
      courseCode: "PHY101",
      courseName: "Vật lý đại cương",
      day: "Thứ 6",
      time: "15:00 - 17:00",
      room: "H3-102",
      students: 10,
      color: "bg-green-100 border-green-500 text-green-700",
    },
  ]);

  const toggleTimeSlot = (day: string, time: string) => {
    const existingSlot = availability.find(
      (slot) => slot.day === day && slot.time === time
    );

    if (existingSlot) {
      setAvailability(
        availability.filter((slot) => slot.id !== existingSlot.id)
      );
    } else {
      const newSlot: TimeSlot = {
        id: Date.now().toString(),
        day,
        time,
        available: true,
      };
      setAvailability([...availability, newSlot]);
    }
  };

  const isSlotAvailable = (day: string, time: string) => {
    return availability.some(
      (slot) => slot.day === day && slot.time === time
    );
  };

  const getClassInSlot = (day: string, time: string) => {
    return teachingClasses.find(
      (cls) => cls.day === day && cls.time === time
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Quản lý lịch giảng dạy</h1>
          <p className="text-muted-foreground">
            Quản lý lịch rảnh và xem lịch giảng dạy của bạn
          </p>
        </div>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="available" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Lịch rảnh
            </TabsTrigger>
            <TabsTrigger value="teaching" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Lịch dạy
            </TabsTrigger>
          </TabsList>

          {/* Lịch rảnh Tab */}
          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar Grid */}
              <div className="lg:col-span-2">
                <Card className="p-6 border-0 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Lịch rảnh trong tuần
                    </h3>
                    <Badge className="bg-blue-100 text-blue-700 border-0">
                      {availability.length} khung giờ
                    </Badge>
                  </div>

              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  {/* Header */}
                  <div className="grid grid-cols-8 gap-2 mb-4">
                    <div className="text-sm text-muted-foreground p-2">
                      Khung giờ
                    </div>
                    {daysOfWeek.map((day) => (
                      <div
                        key={day}
                        className="text-sm text-center p-2 bg-blue-50 rounded-lg"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    {timeSlots.map((time) => (
                      <div key={time} className="grid grid-cols-8 gap-2">
                        <div className="flex items-center text-sm p-2 bg-gray-50 rounded-lg">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-xs">{time}</span>
                        </div>
                        {daysOfWeek.map((day) => {
                          const isAvailable = isSlotAvailable(day, time);
                          return (
                            <button
                              key={`${day}-${time}`}
                              onClick={() => toggleTimeSlot(day, time)}
                              className={cn(
                                "p-2 rounded-lg border-2 transition-all duration-200 hover:scale-105",
                                isAvailable
                                  ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                                  : "bg-white border-gray-200 hover:border-gray-300"
                              )}
                            >
                              {isAvailable ? (
                                <Check className="h-5 w-5 mx-auto" />
                              ) : (
                                <Plus className="h-5 w-5 mx-auto text-gray-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-emerald-100 border-2 border-emerald-500 rounded" />
                      <span className="text-muted-foreground">Có thể dạy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded" />
                      <span className="text-muted-foreground">Không rảnh</span>
                    </div>
                  </div>
                  <Button className="bg-[#3BA5DB] hover:bg-[#2E8AB8]">
                    Lưu lịch rảnh
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="mb-4">Tổng quan lịch rảnh</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-700">Tổng khung giờ</span>
                  <span className="text-blue-900">{availability.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm text-emerald-700">Giờ/tuần</span>
                  <span className="text-emerald-900">{availability.length * 2}h</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm mb-3">Các khung giờ đã chọn</h4>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {availability.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div>
                        <p className="text-sm">{slot.day}</p>
                        <p className="text-xs text-muted-foreground">
                          {slot.time}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => toggleTimeSlot(slot.day, slot.time)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                  <h4 className="mb-3">Lưu ý</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Click vào ô để đăng ký lịch rảnh</li>
                    <li>• Click lại để hủy đăng ký</li>
                    <li>• Nhớ lưu lịch sau khi thay đổi</li>
                    <li>• Lịch sẽ được cập nhật cho sinh viên</li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Lịch dạy Tab */}
          <TabsContent value="teaching" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Teaching Schedule Grid */}
              <div className="lg:col-span-2">
                <Card className="p-6 border-0 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Lịch giảng dạy trong tuần
                    </h3>
                    <Badge className="bg-purple-100 text-purple-700 border-0">
                      {teachingClasses.length} lớp
                    </Badge>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="min-w-[600px]">
                      {/* Header */}
                      <div className="grid grid-cols-8 gap-2 mb-4">
                        <div className="text-sm text-muted-foreground p-2">
                          Khung giờ
                        </div>
                        {daysOfWeek.map((day) => (
                          <div
                            key={day}
                            className="text-sm text-center p-2 bg-purple-50 rounded-lg"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Time Slots */}
                      <div className="space-y-2">
                        {timeSlots.map((time) => (
                          <div key={time} className="grid grid-cols-8 gap-2">
                            <div className="flex items-center text-sm p-2 bg-gray-50 rounded-lg">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-xs">{time}</span>
                            </div>
                            {daysOfWeek.map((day) => {
                              const teachingClass = getClassInSlot(day, time);
                              return (
                                <div
                                  key={`${day}-${time}`}
                                  className={cn(
                                    "p-2 rounded-lg border-2 transition-all",
                                    teachingClass
                                      ? `${teachingClass.color} border-2 cursor-pointer hover:scale-105`
                                      : "bg-white border-gray-200"
                                  )}
                                >
                                  {teachingClass ? (
                                    <div className="text-center">
                                      <p className="text-xs">{teachingClass.courseCode}</p>
                                      <p className="text-xs mt-1">
                                        <Users className="h-3 w-3 inline mr-1" />
                                        {teachingClass.students}
                                      </p>
                                    </div>
                                  ) : null}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm flex-wrap">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded" />
                          <span className="text-muted-foreground">Lập trình</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-purple-100 border-2 border-purple-500 rounded" />
                          <span className="text-muted-foreground">Toán</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded" />
                          <span className="text-muted-foreground">Vật lý</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Teaching Summary */}
              <div className="space-y-6">
                <Card className="p-6 border-0 shadow-lg">
                  <h3 className="mb-4">Tổng quan giảng dạy</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm text-purple-700">Tổng lớp</span>
                      <span className="text-purple-900">{teachingClasses.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-blue-700">Giờ dạy/tuần</span>
                      <span className="text-blue-900">{teachingClasses.length * 2}h</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <span className="text-sm text-emerald-700">Tổng sinh viên</span>
                      <span className="text-emerald-900">
                        {teachingClasses.reduce((acc, cls) => acc + cls.students, 0)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm mb-3">Chi tiết các lớp</h4>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {teachingClasses.map((cls) => (
                        <div
                          key={cls.id}
                          className={cn(
                            "p-3 border-2 rounded-lg transition-colors",
                            cls.color
                          )}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-sm">{cls.courseCode}</p>
                              <p className="text-xs opacity-80">{cls.courseName}</p>
                            </div>
                            <Badge variant="outline" className="bg-white/50">
                              {cls.room}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs opacity-80">
                            <span>{cls.day}, {cls.time}</span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {cls.students} SV
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                  <h4 className="mb-3">Thông tin</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Lịch dạy được tự động cập nhật từ các khóa học đã đăng ký</li>
                    <li>• Click vào ô để xem chi tiết lớp</li>
                    <li>• Số sinh viên được cập nhật theo thời gian thực</li>
                    <li>• Quản lý khóa học tại trang "Đăng ký dạy"</li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
