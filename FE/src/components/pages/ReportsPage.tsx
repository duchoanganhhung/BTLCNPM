import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Download, FileText, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Label } from "../ui/label";

// Mock data
const sessionReportData = [
  { month: "T7", completed: 245, cancelled: 14, pending: 9, total: 268 },
  { month: "T8", completed: 268, cancelled: 16, pending: 11, total: 295 },
  { month: "T9", completed: 290, cancelled: 12, pending: 8, total: 310 },
  { month: "T10", completed: 315, cancelled: 18, pending: 12, total: 345 },
];

const tutorRatingData = [
  { name: "5 sao", value: 156, percent: 62 },
  { name: "4 sao", value: 68, percent: 27 },
  { name: "3 sao", value: 18, percent: 7 },
  { name: "2 sao", value: 8, percent: 3 },
  { name: "1 sao", value: 2, percent: 1 },
];

const departmentData = [
  { department: "Khoa học máy tính", tutors: 45, students: 678, sessions: 1234 },
  { department: "Kỹ thuật điện tử", tutors: 38, students: 542, sessions: 987 },
  { department: "Kỹ thuật cơ khí", tutors: 32, students: 489, sessions: 876 },
  { department: "Công nghệ thông tin", tutors: 28, students: 423, sessions: 765 },
  { department: "Kỹ thuật hóa học", tutors: 18, students: 312, sessions: 543 },
];

const subjectPerformance = [
  { subject: "Toán cao cấp", sessions: 234, avgRating: 4.7, completionRate: 92 },
  { subject: "Vật lý đại cương", sessions: 198, avgRating: 4.5, completionRate: 88 },
  { subject: "Lập trình C++", sessions: 176, avgRating: 4.8, completionRate: 95 },
  { subject: "Tiếng Anh", sessions: 145, avgRating: 4.6, completionRate: 90 },
  { subject: "Hóa học", sessions: 123, avgRating: 4.4, completionRate: 85 },
];

const studentProgress = [
  { name: "Vũ Minh F", sessions: 45, improvement: "+25%", gpa: 3.8 },
  { name: "Đặng Thị G", sessions: 42, improvement: "+18%", gpa: 3.6 },
  { name: "Bùi Văn H", sessions: 38, improvement: "+22%", gpa: 3.7 },
  { name: "Mai Thị I", sessions: 35, improvement: "+15%", gpa: 3.5 },
  { name: "Phan Văn J", sessions: 33, improvement: "+20%", gpa: 3.6 },
];

const scholarshipData = [
  { criteria: "Số buổi tham gia", weight: "30%", description: "Tối thiểu 20 buổi/học kỳ" },
  { criteria: "Điểm đánh giá trung bình", weight: "25%", description: "≥ 4.5/5.0" },
  { criteria: "Tiến độ học tập", weight: "20%", description: "GPA cải thiện ≥ 0.3" },
  { criteria: "Tỷ lệ hoàn thành", weight: "15%", description: "≥ 90%" },
  { criteria: "Đóng góp cộng đồng", weight: "10%", description: "Chia sẻ tài liệu, review" },
];

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("6months");
  const [department, setDepartment] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Báo cáo & Phân tích dữ liệu</h2>
          <p className="text-muted-foreground">Thống kê chi tiết và báo cáo hệ thống</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Xuất PDF
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Xuất CSV
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">1 tháng gần nhất</SelectItem>
            <SelectItem value="3months">3 tháng gần nhất</SelectItem>
            <SelectItem value="6months">6 tháng gần nhất</SelectItem>
            <SelectItem value="1year">1 năm gần nhất</SelectItem>
          </SelectContent>
        </Select>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-[250px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả khoa</SelectItem>
            <SelectItem value="cs">Khoa học máy tính</SelectItem>
            <SelectItem value="ee">Kỹ thuật điện tử</SelectItem>
            <SelectItem value="me">Kỹ thuật cơ khí</SelectItem>
            <SelectItem value="it">Công nghệ thông tin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="tutors">Tutor</TabsTrigger>
          <TabsTrigger value="students">Student</TabsTrigger>
          <TabsTrigger value="scholarship">Học bổng</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Tổng buổi học</CardDescription>
                <CardTitle className="flex items-baseline gap-2">
                  <span>1,218</span>
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    +12%
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Tỷ lệ hoàn thành</CardDescription>
                <CardTitle className="flex items-baseline gap-2">
                  <span>91.2%</span>
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    +3.5%
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Điểm TB đánh giá</CardDescription>
                <CardTitle className="flex items-baseline gap-2">
                  <span>4.6/5.0</span>
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    +0.2
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Tỷ lệ hủy</CardDescription>
                <CardTitle className="flex items-baseline gap-2">
                  <span>5.3%</span>
                  <span className="flex items-center gap-1 text-sm text-red-600">
                    <TrendingDown className="w-4 h-4" />
                    -1.2%
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Thống kê buổi học theo tháng</CardTitle>
                <CardDescription>Phân tích trạng thái buổi học</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sessionReportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#22c55e" name="Hoàn thành" />
                    <Bar dataKey="cancelled" fill="#ef4444" name="Hủy" />
                    <Bar dataKey="pending" fill="#f59e0b" name="Chờ xác nhận" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Xu hướng tăng trưởng</CardTitle>
                <CardDescription>Số buổi học qua các tháng</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sessionReportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} name="Tổng buổi học" />
                    <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} name="Hoàn thành" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Thống kê theo khoa</CardTitle>
                <CardDescription>Hoạt động của các khoa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>{dept.department}</span>
                        <div className="flex gap-4 text-muted-foreground">
                          <span>{dept.tutors} tutors</span>
                          <span>{dept.students} students</span>
                          <span>{dept.sessions} buổi</span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${(dept.sessions / 1500) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất theo môn học</CardTitle>
                <CardDescription>Top 5 môn học phổ biến</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectPerformance.map((subject, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p>{subject.subject}</p>
                        <Badge>{subject.sessions} buổi</Badge>
                      </div>
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>⭐ {subject.avgRating}</span>
                        <span>✓ {subject.completionRate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tutors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân bố đánh giá Tutor</CardTitle>
                <CardDescription>Tỷ lệ đánh giá của các tutor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={tutorRatingData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${percent}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {tutorRatingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {tutorRatingData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-muted-foreground">{item.value} tutor</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Tutor xuất sắc</CardTitle>
                <CardDescription>Dựa trên điểm đánh giá và số buổi học</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Nguyễn Văn A", "Trần Thị B", "Lê Minh C", "Phạm Thị D", "Hoàng Văn E"].map((name, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <p>{name}</p>
                          <p className="text-muted-foreground">{Math.floor(Math.random() * 100) + 50} buổi học</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span>⭐</span>
                          <span>{(4.5 + Math.random() * 0.4).toFixed(1)}</span>
                        </div>
                        <p className="text-muted-foreground">{Math.floor(Math.random() * 50) + 80} reviews</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Thống kê hoạt động Tutor</CardTitle>
              <CardDescription>Chi tiết về số buổi học và hiệu suất</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { range: "0-10 buổi", tutors: 12 },
                  { range: "11-30 buổi", tutors: 28 },
                  { range: "31-50 buổi", tutors: 45 },
                  { range: "51-100 buổi", tutors: 52 },
                  { range: ">100 buổi", tutors: 19 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tutors" fill="#3b82f6" name="Số lượng tutor" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Student tích cực</CardTitle>
              <CardDescription>Sinh viên có tiến bộ nổi bật</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentProgress.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <p>{student.name}</p>
                        <p className="text-muted-foreground">{student.sessions} buổi học</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-muted-foreground">Tiến bộ</p>
                        <p className="text-green-600">{student.improvement}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">GPA</p>
                        <p>{student.gpa}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân bố mức độ tham gia</CardTitle>
                <CardDescription>Số buổi học của sinh viên</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { range: "1-5 buổi", students: 234 },
                    { range: "6-10 buổi", students: 456 },
                    { range: "11-20 buổi", students: 678 },
                    { range: "21-40 buổi", students: 345 },
                    { range: ">40 buổi", students: 128 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#22c55e" name="Số sinh viên" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cải thiện học tập</CardTitle>
                <CardDescription>Mức độ cải thiện GPA sau khi tham gia</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Tăng >0.5", value: 345 },
                        { name: "Tăng 0.3-0.5", value: 456 },
                        { name: "Tăng 0.1-0.3", value: 567 },
                        { name: "Không đổi", value: 234 },
                        { name: "Giảm", value: 89 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[0, 1, 2, 3, 4].map((index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scholarship" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tiêu chí học bổng & Điểm rèn luyện</CardTitle>
              <CardDescription>Các tiêu chí đánh giá và trọng số</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scholarshipData.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p>{item.criteria}</p>
                      <Badge>{item.weight}</Badge>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danh sách đủ điều kiện học bổng</CardTitle>
              <CardDescription>Sinh viên đạt tiêu chuẩn trong kỳ này</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentProgress.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p>{student.name}</p>
                      <p className="text-muted-foreground">
                        {student.sessions} buổi • GPA {student.gpa} • Cải thiện {student.improvement}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Điểm tổng</p>
                      <p className="text-green-600">{(85 + Math.random() * 15).toFixed(1)}/100</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Học bổng Loại A</CardTitle>
                <CardDescription>≥ 90 điểm</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl">12</p>
                <p className="text-muted-foreground mt-2">sinh viên đủ điều kiện</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Học bổng Loại B</CardTitle>
                <CardDescription>80-89 điểm</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl">28</p>
                <p className="text-muted-foreground mt-2">sinh viên đủ điều kiện</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Học bổng Loại C</CardTitle>
                <CardDescription>70-79 điểm</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl">45</p>
                <p className="text-muted-foreground mt-2">sinh viên đủ điều kiện</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
