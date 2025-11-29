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
  Users,
  Star,
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

export function TutorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Lê Văn B",
    employeeId: "GV001234",
    department: "Khoa Công nghệ Thông tin",
    position: "Giảng viên",
    degree: "Tiến sĩ Khoa học Máy tính",
    email: "le.vanb@hcmut.edu.vn",
    phone: "0912 345 678",
    address: "Tp Hồ Chí Minh, Việt Nam",
    dateOfBirth: "15/05/1985",
    yearsOfExperience: 8,
    totalClasses: 3,
    totalStudents: 128,
    averageRating: 4.8,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  });

  const achievements = [
    {
      id: 1,
      title: "Giảng viên xuất sắc năm 2024",
      year: "2024",
      icon: Award,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      id: 2,
      title: "Giải thưởng Nghiên cứu khoa học",
      year: "2023",
      icon: Award,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      title: "Giảng viên được yêu thích nhất",
      year: "2023",
      icon: Award,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  const courses = [
    {
      id: 1,
      name: "Cấu trúc dữ liệu",
      code: "IT3100",
      classes: 2,
      students: 93,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Giải thuật nâng cao",
      code: "IT4110",
      classes: 1,
      students: 35,
      rating: 4.7,
    },
  ];

  const publications = [
    {
      id: 1,
      title: "Advanced Data Structures and Algorithms for Modern Computing",
      journal: "Journal of Computer Science",
      year: 2024,
      citations: 45,
    },
    {
      id: 2,
      title: "Optimization Techniques in Algorithm Design",
      journal: "ACM Computing Surveys",
      year: 2023,
      citations: 32,
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Hồ sơ giảng viên</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin cá nhân và hoạt động giảng dạy
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
                    {profileData.employeeId}
                  </p>
                  <Badge className="bg-blue-500 text-white border-0">
                    {profileData.position}
                  </Badge>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-700">Đánh giá trung bình</span>
                    <span className="text-blue-900">
                      {profileData.averageRating}/5.0
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= profileData.averageRating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-emerald-700">Tổng sinh viên</span>
                    <span className="text-emerald-900">
                      {profileData.totalStudents}
                    </span>
                  </div>
                  <div className="text-xs text-emerald-700">
                    {profileData.totalClasses} lớp học
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-purple-700">Kinh nghiệm</span>
                    <span className="text-purple-900">
                      {profileData.yearsOfExperience} năm
                    </span>
                  </div>
                  <div className="text-xs text-purple-700">
                    Giảng dạy đại học
                  </div>
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
                          {achievement.year}
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
                      value="teaching"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                    >
                      Giảng dạy
                    </TabsTrigger>
                    <TabsTrigger
                      value="research"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
                    >
                      Nghiên cứu
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="personal" className="p-6 mt-0">
                  <div className="space-y-6">
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
                          Mã giảng viên
                        </Label>
                        <p className="p-3 bg-muted/50 rounded-lg">
                          {profileData.employeeId}
                        </p>
                      </div>
                    </div>

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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          Khoa
                        </Label>
                        <p className="p-3 bg-muted/50 rounded-lg">
                          {profileData.department}
                        </p>
                      </div>

                      <div>
                        <Label className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          Học vị
                        </Label>
                        <p className="p-3 bg-muted/50 rounded-lg">
                          {profileData.degree}
                        </p>
                      </div>
                    </div>

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

                <TabsContent value="teaching" className="p-6 mt-0">
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <Card
                        key={course.id}
                        className="p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4>{course.name}</h4>
                              <Badge variant="outline">{course.code}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {course.classes} lớp
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {course.students} sinh viên
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            <span className="">{course.rating}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="research" className="p-6 mt-0">
                  <div className="space-y-4">
                    <div className="mb-6">
                      <h3 className="mb-4">Công trình nghiên cứu</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg text-center">
                          <p className="text-2xl text-blue-600">
                            {publications.length}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Bài báo
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-lg text-center">
                          <p className="text-2xl text-emerald-600">
                            {publications.reduce((sum, p) => sum + p.citations, 0)}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Trích dẫn
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg text-center">
                          <p className="text-2xl text-purple-600">2</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Dự án
                          </p>
                        </div>
                      </div>
                    </div>

                    {publications.map((pub) => (
                      <Card
                        key={pub.id}
                        className="p-4 hover:shadow-md transition-shadow"
                      >
                        <h4 className="mb-2">{pub.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{pub.journal}</span>
                          <span>•</span>
                          <span>{pub.year}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            {pub.citations} trích dẫn
                          </span>
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
