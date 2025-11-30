import { useState } from "react";
import { Star, Search, TrendingUp, BookOpen, Calendar, Clock, MapPin, User, Mail, Phone, GraduationCap, MessageSquare, ThumbsUp, Reply } from "lucide-react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";

interface Review {
  id: number;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
  course: string;
  response?: string;
  responseDate?: string;
  helpful?: number;
  studentReply?: string;
  studentReplyDate?: string;
}

interface CourseReview {
  id: number;
  courseId: number;
  instructorName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Tutor {
  id: number;
  name: string;
  subject: string;
  rating: number;
  reviews: number;
  price: string;
  experience: string;
  available: boolean;
  bio?: string;
  education?: string;
  email?: string;
  phone?: string;
  specialties?: string[];
  userReviews?: Review[];
}

const tutors: Tutor[] = [
  {
    id: 1,
    name: "Lê Văn C",
    subject: "Cấu trúc dữ liệu",
    rating: 4.8,
    reviews: 45,
    price: "150,000 VNĐ/giờ",
    experience: "3 năm",
    available: true,
    bio: "Giảng viên với hơn 3 năm kinh nghiệm giảng dạy cấu trúc dữ liệu và thuật toán. Đã hướng dẫn hơn 100 sinh viên đạt điểm A.",
    education: "Thạc sĩ Khoa học Máy tính - ĐH Bách Khoa",
    email: "levanc@example.com",
    phone: "0912345678",
    specialties: ["Cấu trúc dữ liệu", "Thuật toán", "Lập trình C/C++"],
    userReviews: [
      {
        id: 1,
        studentName: "Tôi",
        rating: 5,
        comment: "Thầy giảng rất hay, dễ hiểu. Em đã cải thiện rất nhiều sau khi học với thầy.",
        date: "2024-10-15",
        course: "Cấu trúc dữ liệu",
        response: "Cảm ơn em! Thầy rất vui khi em tiến bộ. Hãy tiếp tục cố gắng nhé!",
        responseDate: "2024-10-16",
        helpful: 12,
      },
      {
        id: 2,
        studentName: "Trần Thị B",
        rating: 4,
        comment: "Giảng viên nhiệt tình, tài liệu đầy đủ. Mong thầy có thêm nhiều bài tập thực hành.",
        date: "2024-10-10",
        course: "Thuật toán",
        helpful: 8,
      },
    ],
  },
  {
    id: 2,
    name: "Trần Văn D",
    subject: "Giải tích 1",
    rating: 4.6,
    reviews: 38,
    price: "120,000 VNĐ/giờ",
    experience: "2 năm",
    available: true,
    bio: "Chuyên gia toán học với phương pháp giảng dạy dễ hiểu, giúp sinh viên nắm vững kiến thức nền tảng.",
    education: "Thạc sĩ Toán học - ĐH Khoa học Tự nhiên",
    email: "tranvand@example.com",
    phone: "0923456789",
    specialties: ["Giải tích", "Đại số", "Toán cao cấp"],
    userReviews: [
      {
        id: 1,
        studentName: "Lê Văn C",
        rating: 5,
        comment: "Thầy giảng bài rất chi tiết, luôn đảm bảo sinh viên hiểu bài trước khi chuyển sang phần mới.",
        date: "2024-10-20",
        course: "Giải tích 1",
      },
    ],
  },
  {
    id: 3,
    name: "Nguyễn Thị E",
    subject: "Lập trình Python",
    rating: 4.9,
    reviews: 62,
    price: "180,000 VNĐ/giờ",
    experience: "5 năm",
    available: false,
    bio: "Chuyên gia Python với kinh nghiệm 5 năm trong ngành. Đã tham gia nhiều dự án thực tế về Machine Learning và Data Science.",
    education: "Tiến sĩ Khoa học Dữ liệu - ĐH Quốc gia",
    email: "nguyenthie@example.com",
    phone: "0934567890",
    specialties: ["Python", "Machine Learning", "Data Science"],
    userReviews: [
      {
        id: 1,
        studentName: "Phạm Văn D",
        rating: 5,
        comment: "Cô dạy rất tốt, ví dụ thực tế giúp em hiểu sâu hơn về Python và ML.",
        date: "2024-10-25",
        course: "Lập trình Python",
      },
      {
        id: 2,
        studentName: "Hoàng Thị E",
        rating: 5,
        comment: "Giảng viên xuất sắc! Cô luôn kiên nhẫn giải đáp mọi thắc mắc.",
        date: "2024-10-18",
        course: "Machine Learning",
      },
    ],
  },
  {
    id: 4,
    name: "Phạm Văn F",
    subject: "Xác suất thống kê",
    rating: 4.7,
    reviews: 29,
    price: "140,000 VNĐ/giờ",
    experience: "2 năm",
    available: true,
    bio: "Giảng viên trẻ năng động với phương pháp giảng dạy hiện đại, kết hợp lý thuyết và thực hành.",
    education: "Thạc sĩ Thống kê - ĐH Kinh tế",
    email: "phamvanf@example.com",
    phone: "0945678901",
    specialties: ["Xác suất thống kê", "Phân tích dữ liệu", "R/Python"],
    userReviews: [],
  },
];

const currentCourses = [
  {
    id: 1,
    name: "Cấu trúc dữ liệu",
    code: "CO2003",
    progress: 75,
    grade: 8.5,
    credits: 3,
    instructor: "PGS.TS. Nguyễn Văn A",
    hasReviewed: false,
  },
  {
    id: 2,
    name: "Giải tích 1",
    code: "MT1003",
    progress: 60,
    grade: 7.8,
    credits: 4,
    instructor: "TS. Trần Thị B",
    hasReviewed: true,
  },
  {
    id: 3,
    name: "Lập trình hướng đối tượng",
    code: "CO2007",
    progress: 85,
    grade: 9.0,
    credits: 3,
    instructor: "ThS. Lê Văn C",
    hasReviewed: false,
  },
  {
    id: 4,
    name: "Cơ sở dữ liệu",
    code: "CO2013",
    progress: 50,
    grade: 7.5,
    credits: 3,
    instructor: "PGS.TS. Phạm Thị D",
    hasReviewed: false,
  },
];

export function AcademicManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showCourseReviewDialog, setShowCourseReviewDialog] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentLocation, setAppointmentLocation] = useState("");
  const [appointmentNote, setAppointmentNote] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [tutorsData, setTutorsData] = useState(tutors);
  const [coursesData, setCoursesData] = useState(currentCourses);
  const [selectedCourse, setSelectedCourse] = useState<typeof currentCourses[0] | null>(null);
  const [replyingToReview, setReplyingToReview] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const filteredTutors = tutorsData.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const averageGPA = (
    currentCourses.reduce((acc, course) => acc + course.grade, 0) /
    currentCourses.length
  ).toFixed(2);

  const totalCredits = currentCourses.reduce(
    (acc, course) => acc + course.credits,
    0
  );

  const handleViewProfile = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setShowProfileDialog(true);
  };

  const handleBookAppointment = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setShowAppointmentDialog(true);
  };

  const handleOpenReviewDialog = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setShowReviewDialog(true);
    setReviewRating(0);
    setReviewComment("");
  };

  const handleOpenCourseReviewDialog = (course: typeof currentCourses[0]) => {
    setSelectedCourse(course);
    setShowCourseReviewDialog(true);
    setReviewRating(0);
    setReviewComment("");
  };

  const handleSubmitStudentReply = (reviewId: number) => {
    if (!replyText.trim()) {
      toast.error("Vui lòng nhập nội dung phản hồi");
      return;
    }

    const updatedTutors = tutorsData.map((tutor) => {
      if (tutor.id === selectedTutor?.id) {
        const updatedReviews = tutor.userReviews?.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                studentReply: replyText,
                studentReplyDate: new Date().toISOString().split('T')[0],
              }
            : review
        );
        return {
          ...tutor,
          userReviews: updatedReviews,
        };
      }
      return tutor;
    });

    setTutorsData(updatedTutors);
    setReplyingToReview(null);
    setReplyText("");
    toast.success("Đã gửi phản hồi thành công");
  };

  const handleSubmitCourseReview = () => {
    if (reviewRating === 0) {
      toast.error("Vui lòng chọn đánh giá sao");
      return;
    }

    if (!reviewComment.trim()) {
      toast.error("Vui lòng nhập nhận xét");
      return;
    }

    const updatedCourses = coursesData.map((course) => {
      if (course.id === selectedCourse?.id) {
        return {
          ...course,
          hasReviewed: true,
        };
      }
      return course;
    });

    setCoursesData(updatedCourses);
    toast.success(`Đã gửi đánh giá cho môn ${selectedCourse?.name}`);
    setShowCourseReviewDialog(false);
    setReviewRating(0);
    setReviewComment("");
    setSelectedCourse(null);
  };

  const handleSubmitReview = () => {
    if (reviewRating === 0) {
      toast.error("Vui lòng chọn đánh giá sao");
      return;
    }

    if (!reviewComment.trim()) {
      toast.error("Vui lòng nhập nhận xét");
      return;
    }

    // Update tutor with new review
    const newReview: Review = {
      id: (selectedTutor?.userReviews?.length || 0) + 1,
      studentName: "Tôi",
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split('T')[0],
      course: selectedTutor?.subject || "",
      helpful: 0,
    };

    const updatedTutors = tutorsData.map((tutor) => {
      if (tutor.id === selectedTutor?.id) {
        const currentReviews = tutor.userReviews || [];
        const newReviews = [newReview, ...currentReviews];
        const newRating = newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
        
        return {
          ...tutor,
          userReviews: newReviews,
          rating: parseFloat(newRating.toFixed(1)),
          reviews: tutor.reviews + 1,
        };
      }
      return tutor;
    });

    setTutorsData(updatedTutors);
    toast.success(`Đã gửi đánh giá cho ${selectedTutor?.name}`);
    setShowReviewDialog(false);
    setReviewRating(0);
    setReviewComment("");
    setSelectedTutor(null);
  };

  const handleSubmitAppointment = () => {
    if (!appointmentDate || !appointmentTime || !appointmentLocation) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    toast.success(`Đã đặt lịch hẹn với ${selectedTutor?.name} thành công!`);
    setShowAppointmentDialog(false);
    setAppointmentDate("");
    setAppointmentTime("");
    setAppointmentLocation("");
    setAppointmentNote("");
    setSelectedTutor(null);
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setReviewRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={interactive ? "cursor-pointer" : "cursor-default"}
          >
            <Star
              className={`h-4 w-4 ${
                star <= (interactive ? (hoverRating || reviewRating) : currentRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="mb-2">Quản lí học tập</h2>
          <p className="text-gray-600">
            Theo dõi tiến độ học tập và tìm kiếm hỗ trợ từ giảng viên
          </p>
        </div>

        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="progress">Tiến độ học tập</TabsTrigger>
            <TabsTrigger value="tutors">Tìm giảng viên</TabsTrigger>
          </TabsList>

          {/* Tiến độ học tập */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">GPA Trung bình</p>
                    <p className="text-2xl">{averageGPA}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Tổng tín chỉ</p>
                    <p className="text-2xl">{totalCredits}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Môn học</p>
                    <p className="text-2xl">{currentCourses.length}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="mb-4">Các môn học hiện tại</h3>
              <div className="space-y-3">
                {coursesData.map((course) => (
                  <Card key={course.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4>{course.name}</h4>
                            <Badge variant="secondary">{course.code}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {course.credits} tín chỉ • Giảng viên: {course.instructor}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Điểm số</p>
                          <p className="text-xl text-blue-600">
                            {course.grade}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm text-gray-600">
                            Tiến độ học tập
                          </p>
                          <p className="text-sm">{course.progress}%</p>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                      
                      {/* Review Button */}
                      {course.progress >= 50 && (
                        <div className="pt-2 border-t">
                          <Button
                            size="sm"
                            variant={course.hasReviewed ? "outline" : "default"}
                            onClick={() => handleOpenCourseReviewDialog(course)}
                            disabled={course.hasReviewed}
                            className="w-full sm:w-auto"
                          >
                            <Star className="h-4 w-4 mr-2" />
                            {course.hasReviewed ? "Đã đánh giá" : "Đánh giá môn học"}
                          </Button>
                          {course.hasReviewed && (
                            <p className="text-xs text-green-600 mt-2">
                              ✓ Bạn đã đánh giá môn học này
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tìm giảng viên */}
          <TabsContent value="tutors" className="space-y-6">
            <Card className="p-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm theo tên giảng viên hoặc môn học..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>Tìm kiếm</Button>
              </div>
            </Card>

            <div>
              <h3 className="mb-4">
                {searchQuery
                  ? `Kết quả tìm kiếm (${filteredTutors.length})`
                  : "Giảng viên phù hợp"}
              </h3>
              <div className="space-y-3">
                {filteredTutors.map((tutor) => (
                  <Card key={tutor.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
                              {tutor.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4>{tutor.name}</h4>
                                {tutor.available ? (
                                  <Badge className="bg-green-500">Có sẵn</Badge>
                                ) : (
                                  <Badge variant="secondary">Bận</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                Môn: {tutor.subject}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-3">
                            <div>
                              <p className="text-gray-600">Đánh giá</p>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>
                                  {tutor.rating} ({tutor.reviews})
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-600">Học phí</p>
                              <p>{tutor.price}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Kinh nghiệm</p>
                              <p>{tutor.experience}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewProfile(tutor)}
                            >
                              Xem hồ sơ
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenReviewDialog(tutor)}
                            >
                              <Star className="h-4 w-4 mr-1" />
                              Đánh giá
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleBookAppointment(tutor)}
                              disabled={!tutor.available}
                            >
                              Đặt lịch hẹn
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Reviews Section */}
                      {tutor.userReviews && tutor.userReviews.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <MessageSquare className="h-4 w-4 text-gray-600" />
                              <h4 className="text-sm">Đánh giá từ sinh viên ({tutor.userReviews.length})</h4>
                            </div>
                            <div className="space-y-2">
                              {tutor.userReviews.slice(0, 2).map((review) => (
                                <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <p className="text-sm font-medium">{review.studentName}</p>
                                      <p className="text-xs text-gray-500">
                                        {new Date(review.date).toLocaleDateString('vi-VN')}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      {renderStars(review.rating)}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                                  
                                  {/* Tutor Response */}
                                  {review.response && (
                                    <div className="mt-2 space-y-2">
                                      <div className="p-2 bg-blue-50 border-l-2 border-blue-500 rounded">
                                        <div className="flex items-start gap-2">
                                          <Reply className="h-3 w-3 text-blue-600 mt-1 flex-shrink-0" />
                                          <div className="flex-1">
                                            <p className="text-xs mb-1">
                                              <span className="font-medium text-blue-900">Phản hồi của giảng viên</span>
                                              <span className="text-gray-500 ml-2">
                                                {review.responseDate && new Date(review.responseDate).toLocaleDateString('vi-VN')}
                                              </span>
                                            </p>
                                            <p className="text-xs text-blue-800">{review.response}</p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Student Reply to Tutor Response */}
                                      {review.studentReply && (
                                        <div className="ml-4 p-2 bg-green-50 border-l-2 border-green-500 rounded">
                                          <div className="flex items-start gap-2">
                                            <Reply className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                                            <div className="flex-1">
                                              <p className="text-xs mb-1">
                                                <span className="font-medium text-green-900">Phản hồi của bạn</span>
                                                <span className="text-gray-500 ml-2">
                                                  {review.studentReplyDate && new Date(review.studentReplyDate).toLocaleDateString('vi-VN')}
                                                </span>
                                              </p>
                                              <p className="text-xs text-green-800">{review.studentReply}</p>
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {/* Reply Button for Student's Own Reviews */}
                                      {review.studentName === "Tôi" && !review.studentReply && (
                                        <div className="ml-4">
                                          {replyingToReview === review.id ? (
                                            <div className="space-y-2">
                                              <Textarea
                                                placeholder="Nhập phản hồi của bạn..."
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                className="min-h-[60px] text-sm"
                                              />
                                              <div className="flex gap-2">
                                                <Button
                                                  size="sm"
                                                  onClick={() => handleSubmitStudentReply(review.id)}
                                                >
                                                  Gửi
                                                </Button>
                                                <Button
                                                  size="sm"
                                                  variant="outline"
                                                  onClick={() => {
                                                    setReplyingToReview(null);
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
                                              variant="ghost"
                                              onClick={() => setReplyingToReview(review.id)}
                                              className="text-xs h-7"
                                            >
                                              <Reply className="h-3 w-3 mr-1" />
                                              Phản hồi lại
                                            </Button>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  
                                  {/* Helpful Counter */}
                                  <div className="mt-2 flex items-center gap-2">
                                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                                      <ThumbsUp className="h-3 w-3" />
                                      <span>{review.helpful || 0} hữu ích</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                              {tutor.userReviews.length > 2 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewProfile(tutor)}
                                  className="w-full"
                                >
                                  Xem tất cả {tutor.userReviews.length} đánh giá
                                </Button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Tutor Profile Dialog */}
        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Hồ sơ giảng viên</DialogTitle>
            </DialogHeader>
            {selectedTutor && (
              <ScrollArea className="max-h-[70vh] pr-4">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                      {selectedTutor.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3>{selectedTutor.name}</h3>
                        {selectedTutor.available ? (
                          <Badge className="bg-green-500">Có sẵn</Badge>
                        ) : (
                          <Badge variant="secondary">Bận</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg">{selectedTutor.rating}</span>
                        <span className="text-sm text-gray-600">({selectedTutor.reviews} đánh giá)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                        Môn giảng dạy
                      </h4>
                      <p className="text-gray-700">{selectedTutor.subject}</p>
                    </div>

                    <div>
                      <h4 className="mb-2 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        Giới thiệu
                      </h4>
                      <p className="text-gray-700">{selectedTutor.bio}</p>
                    </div>

                    <div>
                      <h4 className="mb-2 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                        Trình độ học vấn
                      </h4>
                      <p className="text-gray-700">{selectedTutor.education}</p>
                    </div>

                    <div>
                      <h4 className="mb-2">Chuyên môn</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTutor.specialties?.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="mb-2">Kinh nghiệm</h4>
                        <p className="text-gray-700">{selectedTutor.experience}</p>
                      </div>
                      <div>
                        <h4 className="mb-2">Học phí</h4>
                        <p className="text-gray-700">{selectedTutor.price}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="mb-2">Thông tin liên hệ</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-600" />
                        <span>{selectedTutor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-600" />
                        <span>{selectedTutor.phone}</span>
                      </div>
                    </div>

                    {/* All Reviews */}
                    {selectedTutor.userReviews && selectedTutor.userReviews.length > 0 && (
                      <div>
                        <Separator className="my-4" />
                        <h4 className="mb-3">Tất cả đánh giá ({selectedTutor.userReviews.length})</h4>
                        <div className="space-y-3">
                          {selectedTutor.userReviews.map((review) => (
                            <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-medium">{review.studentName}</p>
                                  <p className="text-sm text-gray-500">
                                    {new Date(review.date).toLocaleDateString('vi-VN')} • {review.course}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{review.comment}</p>

                              {/* Tutor Response in Dialog */}
                              {review.response && (
                                <div className="mt-3 space-y-2">
                                  <div className="p-3 bg-blue-50 border-l-2 border-blue-500 rounded">
                                    <div className="flex items-start gap-2">
                                      <Reply className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                                      <div className="flex-1">
                                        <p className="text-sm mb-1">
                                          <span className="font-medium text-blue-900">Phản hồi của giảng viên</span>
                                          <span className="text-gray-500 ml-2 text-xs">
                                            {review.responseDate && new Date(review.responseDate).toLocaleDateString('vi-VN')}
                                          </span>
                                        </p>
                                        <p className="text-sm text-blue-800">{review.response}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Student Reply in Dialog */}
                                  {review.studentReply && (
                                    <div className="ml-6 p-3 bg-green-50 border-l-2 border-green-500 rounded">
                                      <div className="flex items-start gap-2">
                                        <Reply className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                        <div className="flex-1">
                                          <p className="text-sm mb-1">
                                            <span className="font-medium text-green-900">Phản hồi của bạn</span>
                                            <span className="text-gray-500 ml-2 text-xs">
                                              {review.studentReplyDate && new Date(review.studentReplyDate).toLocaleDateString('vi-VN')}
                                            </span>
                                          </p>
                                          <p className="text-sm text-green-800">{review.studentReply}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Reply Form in Dialog */}
                                  {review.studentName === "Tôi" && !review.studentReply && (
                                    <div className="ml-6">
                                      {replyingToReview === review.id ? (
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
                                              onClick={() => handleSubmitStudentReply(review.id)}
                                            >
                                              Gửi phản hồi
                                            </Button>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={() => {
                                                setReplyingToReview(null);
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
                                          onClick={() => setReplyingToReview(review.id)}
                                        >
                                          <Reply className="h-4 w-4 mr-2" />
                                          Phản hồi lại
                                        </Button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Helpful Counter in Dialog */}
                              <div className="mt-3 flex items-center gap-2">
                                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>{review.helpful || 0} hữu ích</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProfileDialog(false)}>
                Đóng
              </Button>
              <Button onClick={() => {
                setShowProfileDialog(false);
                if (selectedTutor) {
                  handleBookAppointment(selectedTutor);
                }
              }}>
                Đặt lịch hẹn
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Review Dialog */}
        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Đánh giá giảng viên</DialogTitle>
              <DialogDescription>
                Chia sẻ trải nghiệm của bạn với {selectedTutor?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
                    {selectedTutor?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{selectedTutor?.name}</p>
                    <p className="text-sm text-gray-600">{selectedTutor?.subject}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Đánh giá *</Label>
                <div className="flex items-center gap-2">
                  {renderStars(reviewRating, true)}
                  <span className="text-sm text-muted-foreground ml-2">
                    {reviewRating > 0 ? `${reviewRating} sao` : "Chọn số sao"}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="comment" className="mb-2 block">Nhận xét *</Label>
                <Textarea
                  id="comment"
                  placeholder={`Chia sẻ trải nghiệm của bạn với ${selectedTutor?.name}...`}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-900">
                  Lưu ý: Đánh giá của bạn sẽ được hiển thị công khai và giúp cải thiện chất lượng giảng dạy.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowReviewDialog(false);
                  setReviewRating(0);
                  setReviewComment("");
                }}
              >
                Hủy
              </Button>
              <Button onClick={handleSubmitReview}>
                <ThumbsUp className="h-4 w-4 mr-2" />
                Gửi đánh giá
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Course Review Dialog */}
        <Dialog open={showCourseReviewDialog} onOpenChange={setShowCourseReviewDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Đánh giá môn học</DialogTitle>
              <DialogDescription>
                Chia sẻ trải nghiệm của bạn về môn học {selectedCourse?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{selectedCourse?.name}</p>
                    <p className="text-sm text-gray-600">{selectedCourse?.code}</p>
                    <p className="text-sm text-gray-600">Giảng viên: {selectedCourse?.instructor}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Đánh giá *</Label>
                <div className="flex items-center gap-2">
                  {renderStars(reviewRating, true)}
                  <span className="text-sm text-muted-foreground ml-2">
                    {reviewRating > 0 ? `${reviewRating} sao` : "Chọn số sao"}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="course-comment" className="mb-2 block">Nhận xét *</Label>
                <Textarea
                  id="course-comment"
                  placeholder="Chia sẻ trải nghiệm của bạn về môn học, phương pháp giảng dạy, nội dung bài học..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-900">
                  Lưu ý: Đánh giá của bạn sẽ được hiển thị công khai và giúp cải thiện chất lượng giảng dạy.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCourseReviewDialog(false);
                  setReviewRating(0);
                  setReviewComment("");
                }}
              >
                Hủy
              </Button>
              <Button onClick={handleSubmitCourseReview}>
                <ThumbsUp className="h-4 w-4 mr-2" />
                Gửi đánh giá
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Appointment Dialog */}
        <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Đặt lịch hẹn gặp mặt tư vấn</DialogTitle>
              <DialogDescription>
                Đặt lịch hẹn với {selectedTutor?.name} để được tư vấn trực tiếp
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
                    {selectedTutor?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{selectedTutor?.name}</p>
                    <p className="text-sm text-gray-600">{selectedTutor?.subject}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Học phí: {selectedTutor?.price}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Ngày hẹn *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="time">Giờ hẹn *</Label>
                  <Select value={appointmentTime} onValueChange={setAppointmentTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">08:00</SelectItem>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="13:00">13:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="17:00">17:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Địa điểm *</Label>
                  <Select value={appointmentLocation} onValueChange={setAppointmentLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn địa điểm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="D3-201">Phòng D3-201</SelectItem>
                      <SelectItem value="D9-301">Phòng D9-301</SelectItem>
                      <SelectItem value="C1-105">Phòng C1-105</SelectItem>
                      <SelectItem value="library">Thư viện tầng 3</SelectItem>
                      <SelectItem value="online">Họp trực tuyến (Zoom/Meet)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="note">Ghi chú</Label>
                  <Textarea
                    id="note"
                    placeholder="Nội dung cần tư vấn hoặc ghi chú thêm..."
                    value={appointmentNote}
                    onChange={(e) => setAppointmentNote(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-900">
                  Lưu ý: Giảng viên sẽ xác nhận lịch hẹn trong vòng 24 giờ. Bạn sẽ nhận được thông báo qua email và hệ thống.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAppointmentDialog(false);
                  setAppointmentDate("");
                  setAppointmentTime("");
                  setAppointmentLocation("");
                  setAppointmentNote("");
                }}
              >
                Hủy
              </Button>
              <Button onClick={handleSubmitAppointment}>
                Xác nhận đặt lịch
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
