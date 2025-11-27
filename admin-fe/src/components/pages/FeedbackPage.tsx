import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, Star, ThumbsUp, ThumbsDown, MessageSquare, Eye, Flag } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";

// Mock data
const feedbackData = [
  {
    id: "1",
    appointmentId: "APT-1234",
    tutor: "Nguyễn Văn A",
    student: "Vũ Minh F",
    subject: "Toán cao cấp",
    date: "28/10/2024",
    rating: 5,
    comment: "Giáo viên giảng rất hay và dễ hiểu. Em đã hiểu rõ hơn về chương 3.",
    tutorResponse: "Cảm ơn em! Chúc em học tốt!",
    helpful: 12,
    reported: false
  },
  {
    id: "2",
    appointmentId: "APT-1235",
    tutor: "Trần Thị B",
    student: "Đặng Thị G",
    subject: "Vật lý",
    date: "27/10/2024",
    rating: 4,
    comment: "Buổi học rất bổ ích, nhưng có một số chỗ cần giải thích thêm.",
    tutorResponse: null,
    helpful: 8,
    reported: false
  },
  {
    id: "3",
    appointmentId: "APT-1236",
    tutor: "Lê Minh C",
    student: "Bùi Văn H",
    subject: "Lập trình C++",
    date: "27/10/2024",
    rating: 5,
    comment: "Tutor rất nhiệt tình và code mẫu rất dễ hiểu. Recommend!",
    tutorResponse: "Thanks! Keep coding!",
    helpful: 15,
    reported: false
  },
  {
    id: "4",
    appointmentId: "APT-1237",
    tutor: "Phạm Thị D",
    student: "Mai Thị I",
    subject: "Tiếng Anh",
    date: "26/10/2024",
    rating: 3,
    comment: "Buổi học ok nhưng thời gian hơi ngắn. Mong có thêm thời gian.",
    tutorResponse: null,
    helpful: 5,
    reported: false
  },
  {
    id: "5",
    appointmentId: "APT-1238",
    tutor: "Hoàng Văn E",
    student: "Phan Văn J",
    subject: "Hóa học",
    date: "25/10/2024",
    rating: 2,
    comment: "Tutor đến muộn 15 phút và giải thích không rõ ràng.",
    tutorResponse: "Xin lỗi em vì sự chậm trễ. Lần sau sẽ cải thiện.",
    helpful: 3,
    reported: true
  },
];

const tutorFeedbackSummary = [
  { 
    name: "Nguyễn Văn A", 
    avgRating: 4.9, 
    totalReviews: 156, 
    positive: 152, 
    negative: 4,
    ratings: { "5": 145, "4": 7, "3": 2, "2": 1, "1": 1 }
  },
  { 
    name: "Trần Thị B", 
    avgRating: 4.7, 
    totalReviews: 142, 
    positive: 135, 
    negative: 7,
    ratings: { "5": 120, "4": 15, "3": 4, "2": 2, "1": 1 }
  },
  { 
    name: "Lê Minh C", 
    avgRating: 4.8, 
    totalReviews: 138, 
    positive: 132, 
    negative: 6,
    ratings: { "5": 125, "4": 7, "3": 3, "2": 2, "1": 1 }
  },
  { 
    name: "Phạm Thị D", 
    avgRating: 4.6, 
    totalReviews: 125, 
    positive: 118, 
    negative: 7,
    ratings: { "5": 100, "4": 18, "3": 4, "2": 2, "1": 1 }
  },
  { 
    name: "Hoàng Văn E", 
    avgRating: 4.3, 
    totalReviews: 98, 
    positive: 88, 
    negative: 10,
    ratings: { "5": 70, "4": 18, "3": 5, "2": 3, "1": 2 }
  },
];

const reportedIssues = [
  {
    id: "1",
    feedbackId: "APT-1238",
    tutor: "Hoàng Văn E",
    student: "Phan Văn J",
    reason: "Tutor đến muộn",
    description: "Tutor đến muộn 15 phút và giải thích không rõ ràng.",
    date: "25/10/2024",
    status: "investigating"
  },
  {
    id: "2",
    feedbackId: "APT-1189",
    tutor: "Nguyễn Văn K",
    student: "Trần Văn L",
    reason: "Nội dung không phù hợp",
    description: "Giảng nội dung không đúng với yêu cầu đã thỏa thuận.",
    date: "23/10/2024",
    status: "resolved"
  },
];

export default function FeedbackPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Quản lý phản hồi & Đánh giá</h2>
          <p className="text-muted-foreground">Xem và quản lý feedback của sinh viên và tutor</p>
        </div>
      </div>

      <Tabs defaultValue="feedback" className="space-y-6">
        <TabsList>
          <TabsTrigger value="feedback">Đánh giá buổi học</TabsTrigger>
          <TabsTrigger value="tutors">Tổng hợp Tutor</TabsTrigger>
          <TabsTrigger value="reported">Khiếu nại</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách đánh giá</CardTitle>
              <CardDescription>Feedback từ sinh viên sau buổi học</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo tên, môn học..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả đánh giá</SelectItem>
                    <SelectItem value="5">5 sao</SelectItem>
                    <SelectItem value="4">4 sao</SelectItem>
                    <SelectItem value="3">3 sao</SelectItem>
                    <SelectItem value="2">2 sao</SelectItem>
                    <SelectItem value="1">1 sao</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="latest">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Mới nhất</SelectItem>
                    <SelectItem value="oldest">Cũ nhất</SelectItem>
                    <SelectItem value="highest">Đánh giá cao nhất</SelectItem>
                    <SelectItem value="lowest">Đánh giá thấp nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {feedbackData.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {renderStars(feedback.rating)}
                            <Badge variant="outline">{feedback.appointmentId}</Badge>
                            {feedback.reported && (
                              <Badge variant="destructive" className="gap-1">
                                <Flag className="w-3 h-3" />
                                Đã báo cáo
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-base mb-1">
                            {feedback.subject} • {feedback.date}
                          </CardTitle>
                          <CardDescription>
                            Tutor: {feedback.tutor} • Student: {feedback.student}
                          </CardDescription>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Chi tiết đánh giá</DialogTitle>
                              <DialogDescription>
                                {feedback.appointmentId} - {feedback.date}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <p className="text-muted-foreground mb-1">Tutor:</p>
                                <p>{feedback.tutor}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1">Student:</p>
                                <p>{feedback.student}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1">Môn học:</p>
                                <p>{feedback.subject}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1">Đánh giá:</p>
                                {renderStars(feedback.rating)}
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1">Nhận xét:</p>
                                <p>{feedback.comment}</p>
                              </div>
                              {feedback.tutorResponse && (
                                <div>
                                  <p className="text-muted-foreground mb-1">Phản hồi từ Tutor:</p>
                                  <p className="p-3 bg-muted rounded-lg">{feedback.tutorResponse}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3">{feedback.comment}</p>
                      {feedback.tutorResponse && (
                        <div className="p-3 bg-muted rounded-lg mb-3">
                          <p className="text-muted-foreground mb-1">Phản hồi từ Tutor:</p>
                          <p>{feedback.tutorResponse}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{feedback.helpful} hữu ích</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-foreground">
                          <MessageSquare className="w-4 h-4" />
                          <span>Trả lời</span>
                        </button>
                        {!feedback.reported && (
                          <button className="flex items-center gap-1 hover:text-destructive">
                            <Flag className="w-4 h-4" />
                            <span>Báo cáo</span>
                          </button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Tổng đánh giá</CardDescription>
                <CardTitle>659</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Đánh giá TB</CardDescription>
                <CardTitle>4.7/5.0</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Tích cực</CardDescription>
                <CardTitle className="text-green-600">625</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Khiếu nại</CardDescription>
                <CardTitle className="text-destructive">34</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tổng hợp đánh giá Tutor</CardTitle>
              <CardDescription>Thống kê chi tiết từng tutor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {tutorFeedbackSummary.map((tutor, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>{tutor.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        {renderStars(Math.round(tutor.avgRating))}
                        <span className="text-muted-foreground">
                          {tutor.avgRating}/5.0 ({tutor.totalReviews} đánh giá)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600">
                        <ThumbsUp className="w-4 h-4 inline mr-1" />
                        {tutor.positive}
                      </p>
                      <p className="text-destructive">
                        <ThumbsDown className="w-4 h-4 inline mr-1" />
                        {tutor.negative}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(tutor.ratings).reverse().map(([star, count]) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="w-12 text-muted-foreground">{star} sao</span>
                        <Progress value={(Number(count) / tutor.totalReviews) * 100} className="flex-1" />
                        <span className="w-12 text-right text-muted-foreground">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reported" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Khiếu nại & Vấn đề</CardTitle>
              <CardDescription>Các feedback bị báo cáo hoặc cần xử lý</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportedIssues.map((issue) => (
                  <Card key={issue.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="destructive" className="gap-1">
                              <Flag className="w-3 h-3" />
                              {issue.reason}
                            </Badge>
                            <Badge variant="outline">{issue.feedbackId}</Badge>
                            <Badge variant={issue.status === "resolved" ? "default" : "secondary"}>
                              {issue.status === "resolved" ? "Đã xử lý" : "Đang xem xét"}
                            </Badge>
                          </div>
                          <CardTitle className="text-base mb-1">
                            Tutor: {issue.tutor} • Student: {issue.student}
                          </CardTitle>
                          <CardDescription>{issue.date}</CardDescription>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              {issue.status === "resolved" ? "Xem chi tiết" : "Xử lý"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Xử lý khiếu nại</DialogTitle>
                              <DialogDescription>{issue.feedbackId}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <p className="text-muted-foreground mb-1">Lý do báo cáo:</p>
                                <p>{issue.reason}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1">Mô tả chi tiết:</p>
                                <p>{issue.description}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1">Ghi chú xử lý:</p>
                                <Textarea placeholder="Nhập ghi chú về cách xử lý..." rows={4} />
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" className="flex-1">
                                  Liên hệ Tutor
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  Liên hệ Student
                                </Button>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" className="flex-1">
                                  Từ chối
                                </Button>
                                <Button className="flex-1">
                                  Xác nhận xử lý
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{issue.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
