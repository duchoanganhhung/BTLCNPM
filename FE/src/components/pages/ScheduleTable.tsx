import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Clock, MapPin, User, Hash } from "lucide-react";

const scheduleData = [
  {
    id: "1",
    course: "Cấu trúc dữ liệu",
    code: "IT3100",
    instructor: "TS. Nguyễn Văn A",
    time: "09:00 - 11:00",
    day: "Thứ 2",
    room: "D3-201",
    status: "Đang mở",
  },
  {
    id: "2",
    course: "Giải tích 1",
    code: "MI1111",
    instructor: "PGS. Lê Thị B",
    time: "13:00 - 15:00",
    day: "Thứ 3",
    room: "C1-105",
    status: "Đang mở",
  },
  {
    id: "3",
    course: "Lập trình hướng đối tượng",
    code: "IT3120",
    instructor: "TS. Trần Văn C",
    time: "15:00 - 17:00",
    day: "Thứ 4",
    room: "D9-301",
    status: "Đang mở",
  },
  {
    id: "4",
    course: "Cơ sở dữ liệu",
    code: "IT3080",
    instructor: "ThS. Phạm Thị D",
    time: "09:00 - 11:00",
    day: "Thứ 5",
    room: "D3-105",
    status: "Sắp tới",
  },
  {
    id: "5",
    course: "Mạng máy tính",
    code: "IT3080",
    instructor: "TS. Hoàng Văn E",
    time: "13:00 - 15:00",
    day: "Thứ 6",
    room: "D8-201",
    status: "Sắp tới",
  },
];

export function ScheduleTable() {
  return (
    <div className="container mx-auto px-4 py-8">

      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Gợi ý các môn học đăng ký</h2>
      <p className="text-muted-foreground mb-8">
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {scheduleData.map((item) => (
          <Card
            key={item.id}
            className="rounded-2xl shadow-md border-0 overflow-hidden hover:shadow-xl transition-all bg-gradient-to-br from-blue-50 via-white to-blue-100"
          >
            {/* Header */}
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Hash className="w-5 h-5 text-blue-600" /> {item.code}
              </CardTitle>
              <p className="text-lg font-semibold text-blue-700">{item.course}</p>
            </CardHeader>

            {/* Body */}
            <CardContent className="space-y-3 text-sm">

              {/* Giảng viên */}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="font-medium">{item.instructor}</span>
              </div>

              {/* Thời gian */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span>{item.time}</span>
              </div>

              {/* Thứ */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span>{item.day}</span>
              </div>

              {/* Phòng */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span>{item.room}</span>
              </div>

              {/* Trạng thái */}
              <div className="pt-2">
                <Badge
                  className="px-3 py-1 text-sm"
                  variant={item.status === "Đang mở" ? "default" : "secondary"}
                >
                  {item.status}
                </Badge>
              </div>
              {/* Nút đăng ký */}
              <div className="pt-4">
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all font-semibold"
                  onClick={() => alert(`Đăng ký môn: ${item.course}`)}
                >
                  Đăng ký môn học
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
