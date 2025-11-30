import { useState } from "react";
import {
  Users,
  Clock,
  MapPin,
  BookOpen,
  Calendar,
  MoreVertical,
  FileText,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Star,
  Reply,
  ThumbsUp,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Avatar } from "../ui/avatar";
import { toast } from "sonner";
import { ClassList } from "./ClassList";
import { ClassStatistics } from "./ClassStatistics";

interface ClassInfo {
  id: string;
  name: string;
  code: string;
  schedule: string;
  location: string;
  students: number;
  totalStudents: number;
  progress: number;
  nextSession: string;
  completedSessions: number;
  totalSessions: number;
  assignmentsGraded: number;
  totalAssignments: number;
  averageRating?: number;
  totalReviews?: number;
}

interface Review {
  id: string;
  classId: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
  response?: string;
  responseDate?: string;
  helpful: number;
}

const classes: ClassInfo[] = [
  {
    id: "1",
    name: "Cấu trúc dữ liệu",
    code: "IT3100-L02",
    schedule: "Thứ 3, 9:00 - 11:00",
    location: "GDH6",
    students: 45,
    totalStudents: 50,
    progress: 65,
    nextSession: "24/10/2025 - 09:00",
    completedSessions: 8,
    totalSessions: 12,
    assignmentsGraded: 3,
    totalAssignments: 4,
    averageRating: 4.5,
    totalReviews: 12,
  },
  {
    id: "2",
    name: "Cấu trúc dữ liệu",
    code: "IT3100-L03",
    schedule: "Thứ 5, 14:00 - 16:00",
    location: "H3-306",
    students: 48,
    totalStudents: 50,
    progress: 70,
    nextSession: "26/10/2025 - 14:00",
    completedSessions: 9,
    totalSessions: 12,
    assignmentsGraded: 4,
    totalAssignments: 4,
    averageRating: 4.8,
    totalReviews: 15,
  },
  {
    id: "3",
    name: "Giải thuật nâng cao",
    code: "IT4110-L01",
    schedule: "Thứ 6, 9:00 - 11:00",
    location: "GDH3",
    students: 35,
    totalStudents: 40,
    progress: 55,
    nextSession: "27/10/2025 - 09:00",
    completedSessions: 6,
    totalSessions: 11,
    assignmentsGraded: 2,
    totalAssignments: 3,
    averageRating: 4.2,
    totalReviews: 8,
  },
];

const mockReviews: Review[] = [
  {
    id: "1",
    classId: "1",
    studentName: "Nguyễn Văn An",
    studentAvatar: "A",
    rating: 5,
    comment: "Thầy giảng rất hay và dễ hiểu, luôn nhiệt tình giải đáp thắc mắc. Bài tập phù hợp với nội dung học.",
    date: "25/10/2025",
    helpful: 8,
  },
  {
    id: "2",
    classId: "1",
    studentName: "Trần Thị Bình",
    studentAvatar: "B",
    rating: 4,
    comment: "Môn học rất bổ ích, tuy nhiên có thể thêm nhiều bài tập thực hành hơn để sinh viên làm quen với các cấu trúc dữ liệu phức tạp.",
    date: "23/10/2025",
    response: "Cảm ơn em đã góp ý. Thầy sẽ bổ sung thêm bài tập thực hành trong các buổi học tiếp theo.",
    responseDate: "24/10/2025",
    helpful: 5,
  },
  {
    id: "3",
    classId: "1",
    studentName: "Lê Minh Cường",
    studentAvatar: "C",
    rating: 5,
    comment: "Thầy dạy rất tận tâm, slide bài giảng đầy đủ. Thầy cũng thường xuyên chia sẻ tài liệu tham khảo bổ ích.",
    date: "20/10/2025",
    response: "Cảm ơn em! Thầy rất vui khi các em học tập tích cực.",
    responseDate: "21/10/2025",
    helpful: 12,
  },
  {
    id: "4",
    classId: "2",
    studentName: "Phạm Thị Dung",
    studentAvatar: "D",
    rating: 5,
    comment: "Lớp học rất vui và hiệu quả. Thầy luôn tạo không khí thoải mái cho sinh viên phát biểu ý kiến.",
    date: "26/10/2025",
    helpful: 10,
  },
  {
    id: "5",
    classId: "2",
    studentName: "Hoàng Văn Em",
    studentAvatar: "E",
    rating: 4,
    comment: "Nội dung bài giảng rất chi tiết. Hy vọng thầy có thể bổ sung thêm các case study thực tế.",
    date: "24/10/2025",
    helpful: 6,
  },
  {
    id: "6",
    classId: "3",
    studentName: "Đỗ Thị Phương",
    studentAvatar: "P",
    rating: 4,
    comment: "Môn học khó nhưng thầy giảng rất tốt. Các ví dụ minh họa giúp em hiểu bài nhanh hơn.",
    date: "22/10/2025",
    response: "Cảm ơn em! Thầy sẽ cố gắng thêm nhiều ví dụ thực tế hơn nữa.",
    responseDate: "23/10/2025",
    helpful: 7,
  },
];

export function TutorClasses() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [currentView, setCurrentView] = useState<
    | { type: "list" }
    | { type: "classDetail"; classId: string; classCode: string; className: string }
    | { type: "statistics"; classId: string; classCode: string; className: string }
    | { type: "reviews"; classId: string; classCode: string; className: string }
  >({ type: "list" });
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // If viewing class list
  if (currentView.type === "classDetail") {
    return (
      <ClassList
        classCode={currentView.classCode}
        className={currentView.className}
        onBack={() => setCurrentView({ type: "list" })}
      />
    );
  }

  // If viewing statistics
  if (currentView.type === "statistics") {
    return (
      <ClassStatistics
        classCode={currentView.classCode}
        className={currentView.className}
        onBack={() => setCurrentView({ type: "list" })}
      />
    );
  }

  // If viewing reviews
  if (currentView.type === "reviews") {
    const classReviews = reviews.filter((r) => r.classId === currentView.classId);
    const classInfo = classes.find((c) => c.id === currentView.classId);

    const handleReply = (reviewId: string) => {
      if (!replyText.trim()) {
        toast.error("Vui lòng nhập nội dung phản hồi");
        return;
      }

      setReviews(
        reviews.map((r) =>
          r.id === reviewId
            ? {
                ...r,
                response: replyText,
                responseDate: new Date().toLocaleDateString("vi-VN"),
              }
            : r
        )
      );
      setReplyingTo(null);
      setReplyText("");
      toast.success("Đã gửi phản hồi thành công");
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setCurrentView({ type: "list" })}
              className="mb-4"
            >
              ← Quay lại danh sách lớp
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="mb-2">Đánh giá lớp học</h1>
                <p className="text-muted-foreground">
                  {currentView.className} - {currentView.classCode}
                </p>
              </div>
              {classInfo && (
                <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
                  <div className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl">{classInfo.averageRating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {classInfo.totalReviews} đánh giá
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {classReviews.length === 0 ? (
              <Card className="p-12 text-center border-0 shadow-md">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Star className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3>Chưa có đánh giá</h3>
                    <p className="text-muted-foreground mt-2">
                      Lớp học này chưa có đánh giá từ sinh viên
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              classReviews.map((review) => (
                <Card key={review.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    {/* Student Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                        {review.studentAvatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">{review.studentName}</p>
                            <p className="text-sm text-muted-foreground">
                              {review.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm mb-3">{review.comment}</p>

                        {/* Helpful Counter */}
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{review.helpful} hữu ích</span>
                          </button>
                        </div>

                        {/* Tutor Response */}
                        {review.response && (
                          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                            <div className="flex items-start gap-3">
                              <Reply className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm mb-1">
                                  <span className="font-medium text-blue-900">
                                    Phản hồi của bạn
                                  </span>
                                  <span className="text-muted-foreground ml-2 text-xs">
                                    {review.responseDate}
                                  </span>
                                </p>
                                <p className="text-sm text-blue-800">
                                  {review.response}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Reply Form */}
                        {!review.response && (
                          <div className="mt-3">
                            {replyingTo === review.id ? (
                              <div className="space-y-2">
                                <Textarea
                                  placeholder="Nhập phản hồi của bạn..."
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  className="min-h-[80px]"
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleReply(review.id)}
                                  >
                                    Gửi phản hồi
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setReplyingTo(null);
                                      setReplyText("");
                                    }}
                                  >
                                    Hủy
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setReplyingTo(review.id)}
                              >
                                <Reply className="h-4 w-4 mr-2" />
                                Phản hồi
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Lớp học của tôi</h1>
          <p className="text-muted-foreground">
            Quản lý và theo dõi các lớp học đang giảng dạy
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Tổng số lớp
                  </p>
                  <h2 className="text-primary">{classes.length}</h2>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Tổng sinh viên
                  </p>
                  <h2 className="text-primary">
                    {classes.reduce((sum, c) => sum + c.students, 0)}
                  </h2>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Bài tập chờ chấm
                  </p>
                  <h2 className="text-primary">12</h2>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Tin nhắn mới
                  </p>
                  <h2 className="text-primary">5</h2>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes List */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tất cả lớp</TabsTrigger>
            <TabsTrigger value="current">Đang diễn ra</TabsTrigger>
            <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {classes.map((classInfo) => (
                <Card
                  key={classInfo.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3>{classInfo.name}</h3>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {classInfo.code}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{classInfo.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{classInfo.location}</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              setCurrentView({
                                type: "classDetail",
                                classId: classInfo.id,
                                classCode: classInfo.code,
                                className: classInfo.name,
                              })
                            }
                          >
                            Xem danh sách lớp
                          </DropdownMenuItem>
                          <DropdownMenuItem>Quản lý bài tập</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              setCurrentView({
                                type: "statistics",
                                classId: classInfo.id,
                                classCode: classInfo.code,
                                className: classInfo.name,
                              })
                            }
                          >
                            Thống kê điểm
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              setCurrentView({
                                type: "reviews",
                                classId: classInfo.id,
                                classCode: classInfo.code,
                                className: classInfo.name,
                              })
                            }
                          >
                            Xem đánh giá
                          </DropdownMenuItem>
                          <DropdownMenuItem>Cài đặt lớp học</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Next Session */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">
                          Buổi học tiếp theo
                        </span>
                      </div>
                      <p className="text-blue-900">{classInfo.nextSession}</p>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Tiến độ học kỳ</span>
                        <span className="text-sm">{classInfo.progress}%</span>
                      </div>
                      <Progress value={classInfo.progress} className="h-2" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-3">
                      <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Users className="h-4 w-4 text-emerald-600" />
                        </div>
                        <p className="text-xs text-emerald-700 mb-1">Sinh viên</p>
                        <p className="text-sm text-emerald-900">
                          {classInfo.students}/{classInfo.totalStudents}
                        </p>
                      </div>

                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <CheckCircle2 className="h-4 w-4 text-purple-600" />
                        </div>
                        <p className="text-xs text-purple-700 mb-1">Buổi học</p>
                        <p className="text-sm text-purple-900">
                          {classInfo.completedSessions}/{classInfo.totalSessions}
                        </p>
                      </div>

                      <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <FileText className="h-4 w-4 text-orange-600" />
                        </div>
                        <p className="text-xs text-orange-700 mb-1">Đã chấm</p>
                        <p className="text-sm text-orange-900">
                          {classInfo.assignmentsGraded}/{classInfo.totalAssignments}
                        </p>
                      </div>

                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-600 fill-yellow-600" />
                        </div>
                        <p className="text-xs text-yellow-700 mb-1">Đánh giá</p>
                        <p className="text-sm text-yellow-900">
                          {classInfo.averageRating} ({classInfo.totalReviews})
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <Button
                        className="bg-[#3BA5DB] hover:bg-[#2E8AB8]"
                        onClick={() =>
                          setCurrentView({
                            type: "classDetail",
                            classId: classInfo.id,
                            classCode: classInfo.code,
                            className: classInfo.name,
                          })
                        }
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Danh sách
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentView({
                            type: "statistics",
                            classId: classInfo.id,
                            classCode: classInfo.code,
                            className: classInfo.name,
                          })
                        }
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Thống kê
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentView({
                            type: "reviews",
                            classId: classInfo.id,
                            classCode: classInfo.code,
                            className: classInfo.name,
                          })
                        }
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Đánh giá
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
