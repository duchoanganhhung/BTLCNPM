import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Edit,
  Camera,
  Save,
  X,
  GraduationCap,
  Hash,
  Building,
  Clock,
  CheckCircle2,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Nguyễn Văn A",
    studentId: "20210001",
    faculty: "Công nghệ Thông tin",
    major: "Khoa học Máy tính",
    email: "nguyen.vana@hcmut.edu.vn",
    phone: "0912 345 678",
    address: "Tp Hồ Chí Minh, Việt Nam",
    dateOfBirth: "01/01/2003",
    gpa: 3.45,
    credits: 85,
    totalCredits: 120,
    year: "Năm 3",
    avatar: "https://images.unsplash.com/photo-1600178572204-6ac8886aae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxMjk5ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  });

  const achievements = [
    {
      id: 1,
      title: "Học bổng Khuyến khích học tập",
      semester: "Học kỳ 20231",
      icon: Award,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      id: 2,
      title: "Sinh viên 5 tốt",
      semester: "Năm học 2023-2024",
      icon: Award,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      title: "Giải Nhì Olympic Tin học",
      semester: "2024",
      icon: Award,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  const currentCourses = [
    {
      id: 1,
      name: "Cấu trúc dữ liệu",
      code: "IT3100",
      credits: 3,
      instructor: "Lê Văn B",
      progress: 75,
      completedLessons: 9,
      totalLessons: 12,
      completedAssignments: 3,
      totalAssignments: 4,
      currentGrade: 8.5,
      daysRemaining: 15,
    },
    {
      id: 2,
      name: "Mạng máy tính",
      code: "IT3090",
      credits: 2,
      instructor: "Nguyễn Thị C",
      progress: 60,
      completedLessons: 12,
      totalLessons: 20,
      completedAssignments: 2,
      totalAssignments: 5,
      currentGrade: 8.0,
      daysRemaining: 28,
    },
    {
      id: 3,
      name: "Lập trình nâng cao",
      code: "IT3120",
      credits: 3,
      instructor: "Trần Văn D",
      progress: 45,
      completedLessons: 7,
      totalLessons: 15,
      completedAssignments: 1,
      totalAssignments: 3,
      currentGrade: 7.5,
      daysRemaining: 35,
    },
    {
      id: 4,
      name: "Cơ sở dữ liệu",
      code: "IT3080",
      credits: 3,
      instructor: "Phạm Thị E",
      progress: 80,
      completedLessons: 16,
      totalLessons: 20,
      completedAssignments: 4,
      totalAssignments: 5,
      currentGrade: 9.0,
      daysRemaining: 10,
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset data if needed
  };

  const progressPercentage = (profileData.credits / profileData.totalCredits) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Hồ sơ sinh viên</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin cá nhân và kết quả học tập
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-0 shadow-lg">
              {/* Avatar Section */}
              <div className="relative mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback className="text-3xl">
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Camera className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="text-center mt-4">
                  <h2 className="mb-1">{profileData.name}</h2>
                  <p className="text-muted-foreground mb-2">
                    MSSV: {profileData.studentId}
                  </p>
                  <Badge className="bg-blue-500 text-white border-0">
                    {profileData.year}
                  </Badge>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-700">GPA</span>
                    <span className="text-blue-900">{profileData.gpa}/4.0</span>
                  </div>
                  <Progress value={(profileData.gpa / 4) * 100} className="h-2" />
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-emerald-700">Tín chỉ đã học</span>
                    <span className="text-emerald-900">
                      {profileData.credits}/{profileData.totalCredits}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </div>

              {/* Edit Button */}
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Chỉnh sửa hồ sơ
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="flex-1 gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Lưu
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <X className="h-4 w-4" />
                    Hủy
                  </Button>
                </div>
              )}
            </Card>

            {/* Achievements */}
            <Card className="p-6 border-0 shadow-lg mt-6">
              <h3 className="mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Thành tích
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-lg ${achievement.bgColor} flex items-start gap-3`}
                    >
                      <div className={`mt-1 ${achievement.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {achievement.semester}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <Tabs defaultValue="personal" className="w-full">
                <div className="border-b">
                  <TabsList className="w-full justify-start rounded-none bg-transparent p-0 h-auto">
                    <TabsTrigger
                      value="personal"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                    >
                      Thông tin cá nhân
                    </TabsTrigger>
                    <TabsTrigger
                      value="academic"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                    >
                      Thông tin học tập
                    </TabsTrigger>
                    <TabsTrigger
                      value="courses"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                    >
                      Tiến độ học tập
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="personal" className="p-6 mt-0">
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          Họ và tên
                        </Label>
                        {isEditing ? (
                          <Input
                            value={profileData.name}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                name: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <p className="p-3 bg-muted/50 rounded-lg">
                            {profileData.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          Mã số sinh viên
                        </Label>
                        <p className="p-3 bg-muted/50 rounded-lg">
                          {profileData.studentId}
                        </p>
                      </div>
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          Email
                        </Label>
                        {isEditing ? (
                          <Input
                            type="email"
                            value={profileData.email}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                email: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <p className="p-3 bg-muted/50 rounded-lg">
                            {profileData.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          Số điện thoại
                        </Label>
                        {isEditing ? (
                          <Input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                phone: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <p className="p-3 bg-muted/50 rounded-lg">
                            {profileData.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Date of Birth and Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          Ngày sinh
                        </Label>
                        {isEditing ? (
                          <Input
                            type="text"
                            value={profileData.dateOfBirth}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                dateOfBirth: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <p className="p-3 bg-muted/50 rounded-lg">
                            {profileData.dateOfBirth}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          Địa chỉ
                        </Label>
                        {isEditing ? (
                          <Input
                            value={profileData.address}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                address: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <p className="p-3 bg-muted/50 rounded-lg">
                            {profileData.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="academic" className="p-6 mt-0">
                  <div className="space-y-6">
                    {/* Faculty and Major */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          Khoa
                        </Label>
                        <p className="p-3 bg-muted/50 rounded-lg">
                          {profileData.faculty}
                        </p>
                      </div>

                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          Ngành học
                        </Label>
                        <p className="p-3 bg-muted/50 rounded-lg">
                          {profileData.major}
                        </p>
                      </div>
                    </div>

                    {/* Academic Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-sm text-blue-700 mb-1">
                              Điểm trung bình tích lũy
                            </p>
                            <h2 className="text-blue-900">{profileData.gpa}</h2>
                          </div>
                          <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                            <Award className="h-6 w-6" />
                          </div>
                        </div>
                        <Progress value={(profileData.gpa / 4) * 100} className="h-2" />
                        <p className="text-xs text-blue-700 mt-2">
                          Thang điểm 4.0
                        </p>
                      </Card>

                      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-sm text-emerald-700 mb-1">
                              Tín chỉ hoàn thành
                            </p>
                            <h2 className="text-emerald-900">
                              {profileData.credits}/{profileData.totalCredits}
                            </h2>
                          </div>
                          <div className="w-12 h-12 bg-emerald-500 text-white rounded-lg flex items-center justify-center">
                            <BookOpen className="h-6 w-6" />
                          </div>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <p className="text-xs text-emerald-700 mt-2">
                          {progressPercentage.toFixed(1)}% hoàn thành chương trình
                        </p>
                      </Card>
                    </div>

                    {/* Additional Info */}
                    <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                      <h3 className="mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-purple-600" />
                        Xếp loại học lực
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-2xl text-purple-600">12</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Học kỳ A
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-2xl text-blue-600">8</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Học kỳ B+
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-2xl text-emerald-600">4</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Học kỳ B
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <p className="text-2xl text-orange-600">1</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Học kỳ C+
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="courses" className="p-6 mt-0">
                  <div className="space-y-6">
                    {currentCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="p-6 hover:shadow-lg transition-all duration-300 border-2"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3>{course.name}</h3>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {course.code}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {course.instructor}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {course.credits} tín chỉ
                              </span>
                            </div>
                          </div>
                          <div className="text-center px-4 py-2 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
                            <p className="text-xs text-emerald-700 mb-1">
                              Điểm hiện tại
                            </p>
                            <p className="text-xl text-emerald-900">
                              {course.currentGrade}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Tiến độ hoàn thành</span>
                            <span className="text-sm">{course.progress}%</span>
                          </div>
                          <Progress 
                            value={course.progress} 
                            className="h-3"
                          />
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-xs text-blue-700 mb-1">Bài giảng</p>
                              <p className="text-sm text-blue-900">
                                {course.completedLessons}/{course.totalLessons}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                            <div className="w-10 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-xs text-purple-700 mb-1">Bài tập</p>
                              <p className="text-sm text-purple-900">
                                {course.completedAssignments}/{course.totalAssignments}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                            <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-xs text-orange-700 mb-1">Còn lại</p>
                              <p className="text-sm text-orange-900">
                                {course.daysRemaining} ngày
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
