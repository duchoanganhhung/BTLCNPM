import { useState } from "react";
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ClassStatisticsProps {
  classCode: string;
  className: string;
  onBack: () => void;
}

export function ClassStatistics({
  classCode,
  className,
  onBack,
}: ClassStatisticsProps) {
  // Grade Distribution Data
  const gradeDistribution = [
    { range: "9.0-10", count: 8, percentage: 16 },
    { range: "8.0-8.9", count: 15, percentage: 30 },
    { range: "7.0-7.9", count: 12, percentage: 24 },
    { range: "6.0-6.9", count: 10, percentage: 20 },
    { range: "< 6.0", count: 5, percentage: 10 },
  ];

  // Attendance by Week
  const attendanceData = [
    { week: "Tuần 1", attendance: 95 },
    { week: "Tuần 2", attendance: 92 },
    { week: "Tuần 3", attendance: 88 },
    { week: "Tuần 4", attendance: 90 },
    { week: "Tuần 5", attendance: 87 },
    { week: "Tuần 6", attendance: 85 },
    { week: "Tuần 7", attendance: 89 },
    { week: "Tuần 8", attendance: 91 },
  ];

  // Assignment Completion
  const assignmentData = [
    { name: "Bài tập 1", completed: 48, total: 50 },
    { name: "Bài tập 2", completed: 45, total: 50 },
    { name: "Bài tập 3", completed: 42, total: 50 },
    { name: "Bài tập 4", completed: 40, total: 50 },
  ];

  // Performance Distribution
  const performanceData = [
    { name: "Xuất sắc", value: 16, color: "#10b981" },
    { name: "Tốt", value: 30, color: "#3b82f6" },
    { name: "Trung bình", value: 34, color: "#f59e0b" },
    { name: "Cần cải thiện", value: 20, color: "#ef4444" },
  ];

  // Test Score Comparison
  const testScoreData = [
    { test: "Kiểm tra 1", average: 7.5, highest: 9.5, lowest: 5.0 },
    { test: "Kiểm tra 2", average: 7.8, highest: 9.8, lowest: 5.5 },
    { test: "Giữa kỳ", average: 8.0, highest: 10.0, lowest: 6.0 },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

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
          <div>
            <h1 className="mb-2">Thống kê lớp {classCode}</h1>
            <p className="text-muted-foreground">{className}</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Điểm trung bình
                  </p>
                  <h2 className="text-primary">7.8</h2>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-600">+0.3</span>
                <span className="text-muted-foreground">so với kỳ trước</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Tỷ lệ tham dự
                  </p>
                  <h2 className="text-primary">89%</h2>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <Progress value={89} className="h-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Hoàn thành bài tập
                  </p>
                  <h2 className="text-primary">87%</h2>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <Progress value={87} className="h-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Sinh viên cảnh báo
                  </p>
                  <h2 className="text-red-600">5</h2>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                10% tổng số sinh viên
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="grades" className="space-y-6">
          <TabsList className="bg-white shadow-md">
            <TabsTrigger value="grades">Phân bố điểm</TabsTrigger>
            <TabsTrigger value="attendance">Tham dự</TabsTrigger>
            <TabsTrigger value="assignments">Bài tập</TabsTrigger>
            <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
          </TabsList>

          {/* Grade Distribution */}
          <TabsContent value="grades" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <h3>Phân bố điểm số</h3>
                  <p className="text-sm text-muted-foreground">
                    Số lượng sinh viên theo khoảng điểm
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={gradeDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <h3>Chi tiết phân bố</h3>
                  <p className="text-sm text-muted-foreground">
                    Tỷ lệ phần trăm theo từng khoảng điểm
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gradeDistribution.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  COLORS[index % COLORS.length],
                              }}
                            />
                            <span className="text-sm">Điểm {item.range}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">
                              {item.count} SV
                            </span>
                            <span className="text-sm">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Test Score Comparison */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <h3>So sánh điểm kiểm tra</h3>
                <p className="text-sm text-muted-foreground">
                  Điểm trung bình, cao nhất và thấp nhất
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={testScoreData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="test" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="average"
                      fill="#3b82f6"
                      name="Trung bình"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="highest"
                      fill="#10b981"
                      name="Cao nhất"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="lowest"
                      fill="#ef4444"
                      name="Thấp nhất"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance */}
          <TabsContent value="attendance" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <h3>Xu hướng tham dự theo tuần</h3>
                <p className="text-sm text-muted-foreground">
                  Tỷ lệ tham dự qua các tuần học
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Tỷ lệ tham dự (%)"
                      dot={{ fill: "#3b82f6", r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-emerald-700">Tham dự tốt</p>
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <h2 className="text-emerald-900 mb-1">35 sinh viên</h2>
                <p className="text-xs text-emerald-700">≥ 90% buổi học</p>
              </Card>

              <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-orange-700">Tham dự khá</p>
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <h2 className="text-orange-900 mb-1">10 sinh viên</h2>
                <p className="text-xs text-orange-700">70-89% buổi học</p>
              </Card>

              <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-red-700">Cần cải thiện</p>
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-red-900 mb-1">5 sinh viên</h2>
                <p className="text-xs text-red-700">&lt; 70% buổi học</p>
              </Card>
            </div>
          </TabsContent>

          {/* Assignments */}
          <TabsContent value="assignments" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <h3>Tỷ lệ hoàn thành bài tập</h3>
                <p className="text-sm text-muted-foreground">
                  Số sinh viên hoàn thành theo từng bài tập
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {assignmentData.map((assignment, index) => {
                    const percentage = (assignment.completed / assignment.total) * 100;
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4>{assignment.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {assignment.completed}/{assignment.total} sinh viên
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={`${
                              percentage >= 90
                                ? "bg-emerald-500"
                                : percentage >= 80
                                ? "bg-blue-500"
                                : "bg-orange-500"
                            } text-white border-0`}
                          >
                            {percentage.toFixed(0)}%
                          </Badge>
                        </div>
                        <Progress value={percentage} className="h-3" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <h3>Phân loại hiệu suất</h3>
                  <p className="text-sm text-muted-foreground">
                    Tỷ lệ sinh viên theo mức độ học tập
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <h3>Chi tiết phân loại</h3>
                  <p className="text-sm text-muted-foreground">
                    Thông tin cụ thể từng nhóm sinh viên
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border-2"
                        style={{ borderColor: item.color }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <h4>{item.name}</h4>
                          </div>
                          <Badge
                            className="text-white border-0"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.value}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {Math.round((item.value * 50) / 100)} sinh viên
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
