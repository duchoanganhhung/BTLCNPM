import { useState } from "react";
import { Star, Send, MessageSquare, User, Calendar, ThumbsUp, Filter } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";

interface Person {
  id: number;
  name: string;
  subject?: string;
  course?: string;
  avatar?: string;
  lastInteraction: string;
}

interface FeedbackItem {
  id: number;
  fromId: number;
  fromName: string;
  toId: number;
  toName: string;
  rating: number;
  comment: string;
  date: string;
  subject?: string;
  course?: string;
}

interface FeedbackProps {
  mode: "student" | "tutor";
}

// Mock data for students (for tutor mode)
const studentsData: Person[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    course: "Cấu trúc dữ liệu",
    lastInteraction: "2024-11-01",
  },
  {
    id: 2,
    name: "Trần Thị B",
    course: "Giải tích 1",
    lastInteraction: "2024-10-28",
  },
  {
    id: 3,
    name: "Lê Văn C",
    course: "Cấu trúc dữ liệu",
    lastInteraction: "2024-10-25",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    course: "Lập trình hướng đối tượng",
    lastInteraction: "2024-10-20",
  },
];

// Mock data for tutors (for student mode)
const tutorsData: Person[] = [
  {
    id: 1,
    name: "Lê Văn C",
    subject: "Cấu trúc dữ liệu",
    lastInteraction: "2024-11-01",
  },
  {
    id: 2,
    name: "Trần Văn D",
    subject: "Giải tích 1",
    lastInteraction: "2024-10-28",
  },
  {
    id: 3,
    name: "Nguyễn Thị E",
    subject: "Lập trình Python",
    lastInteraction: "2024-10-25",
  },
];

// Mock data for sent feedback
const initialSentFeedback: FeedbackItem[] = [
  {
    id: 1,
    fromId: 0,
    fromName: "Tôi",
    toId: 1,
    toName: "Lê Văn C",
    rating: 5,
    comment: "Giảng viên nhiệt tình, giảng bài rất dễ hiểu. Em đã tiến bộ rất nhiều sau các buổi học.",
    date: "2024-10-25",
    subject: "Cấu trúc dữ liệu",
  },
];

// Mock data for received feedback
const initialReceivedFeedback: FeedbackItem[] = [
  {
    id: 1,
    fromId: 1,
    fromName: "Nguyễn Văn A",
    toId: 0,
    toName: "Tôi",
    rating: 4,
    comment: "Thầy giảng bài rất hay, nhưng em mong thầy có thể giảng chậm hơn một chút.",
    date: "2024-10-28",
    course: "Cấu trúc dữ liệu",
  },
  {
    id: 2,
    fromId: 2,
    fromName: "Trần Thị B",
    toId: 0,
    toName: "Tôi",
    rating: 5,
    comment: "Giảng viên rất nhiệt tình, luôn sẵn sàng giải đáp thắc mắc của sinh viên.",
    date: "2024-10-20",
    course: "Giải tích 1",
  },
];

export function Feedback({ mode }: FeedbackProps) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sentFeedback, setSentFeedback] = useState<FeedbackItem[]>(initialSentFeedback);
  const [receivedFeedback, setReceivedFeedback] = useState<FeedbackItem[]>(initialReceivedFeedback);
  const [filterRating, setFilterRating] = useState<string>("all");

  const peopleList = mode === "student" ? tutorsData : studentsData;
  const personLabel = mode === "student" ? "giảng viên" : "sinh viên";

  const handleOpenFeedbackDialog = (person: Person) => {
    setSelectedPerson(person);
    setShowFeedbackDialog(true);
    setRating(0);
    setComment("");
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast.error("Vui lòng chọn đánh giá sao");
      return;
    }

    if (!comment.trim()) {
      toast.error("Vui lòng nhập nhận xét");
      return;
    }

    const newFeedback: FeedbackItem = {
      id: sentFeedback.length + 1,
      fromId: 0,
      fromName: "Tôi",
      toId: selectedPerson!.id,
      toName: selectedPerson!.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      subject: selectedPerson!.subject,
      course: selectedPerson!.course,
    };

    setSentFeedback([newFeedback, ...sentFeedback]);
    toast.success(`Đã gửi đánh giá cho ${selectedPerson!.name}`);
    setShowFeedbackDialog(false);
    setSelectedPerson(null);
    setRating(0);
    setComment("");
  };

  const filteredReceivedFeedback = receivedFeedback.filter((feedback) => {
    if (filterRating === "all") return true;
    return feedback.rating === parseInt(filterRating);
  });

  const averageRating = receivedFeedback.length > 0
    ? (receivedFeedback.reduce((sum, f) => sum + f.rating, 0) / receivedFeedback.length).toFixed(1)
    : "0.0";

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={interactive ? "cursor-pointer" : "cursor-default"}
          >
            <Star
              className={`h-5 w-5 ${
                star <= (interactive ? (hoverRating || rating) : currentRating)
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Đánh giá & Phản hồi</h1>
          <p className="text-muted-foreground">
            Đánh giá và nhận phản hồi từ {personLabel}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Đánh giá trung bình</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-3xl">{averageRating}</p>
                  <Star className="h-6 w-6 fill-white" />
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Đánh giá đã gửi</p>
                <p className="text-3xl mt-1">{sentFeedback.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Send className="h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Đánh giá nhận được</p>
                <p className="text-3xl mt-1">{receivedFeedback.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="give" className="w-full">
          <TabsList className="mb-6 bg-white p-1 h-auto">
            <TabsTrigger value="give" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Send className="h-4 w-4" />
              Gửi đánh giá
            </TabsTrigger>
            <TabsTrigger value="sent" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ThumbsUp className="h-4 w-4" />
              Đã gửi ({sentFeedback.length})
            </TabsTrigger>
            <TabsTrigger value="received" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquare className="h-4 w-4" />
              Nhận được ({receivedFeedback.length})
            </TabsTrigger>
          </TabsList>

          {/* Give Feedback Tab */}
          <TabsContent value="give" className="mt-0">
            <div className="mb-4">
              <h3>Chọn {personLabel} để đánh giá</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {peopleList.map((person) => (
                <Card key={person.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h4>{person.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {mode === "student" ? person.subject : person.course}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tương tác gần nhất: {new Date(person.lastInteraction).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => handleOpenFeedbackDialog(person)}>
                      Đánh giá
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sent Feedback Tab */}
          <TabsContent value="sent" className="mt-0">
            <div className="space-y-4">
              {sentFeedback.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Send className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3>Chưa có đánh giá nào</h3>
                      <p className="text-muted-foreground mt-2">
                        Bạn chưa gửi đánh giá nào. Hãy chuyển sang tab "Gửi đánh giá" để bắt đầu.
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
                sentFeedback.map((feedback) => (
                  <Card key={feedback.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4>{feedback.toName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {feedback.subject || feedback.course}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {renderStars(feedback.rating)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(feedback.date).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm">{feedback.comment}</p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Received Feedback Tab */}
          <TabsContent value="received" className="mt-0">
            <div className="mb-4 flex justify-between items-center">
              <h3>Đánh giá từ {personLabel}</h3>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Lọc theo sao" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="5">5 sao</SelectItem>
                  <SelectItem value="4">4 sao</SelectItem>
                  <SelectItem value="3">3 sao</SelectItem>
                  <SelectItem value="2">2 sao</SelectItem>
                  <SelectItem value="1">1 sao</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              {filteredReceivedFeedback.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3>Chưa có đánh giá nào</h3>
                      <p className="text-muted-foreground mt-2">
                        {filterRating === "all" 
                          ? "Bạn chưa nhận được đánh giá nào."
                          : `Không có đánh giá ${filterRating} sao.`
                        }
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
                filteredReceivedFeedback.map((feedback) => (
                  <Card key={feedback.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4>{feedback.fromName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {feedback.subject || feedback.course}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {renderStars(feedback.rating)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(feedback.date).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm">{feedback.comment}</p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Feedback Dialog */}
        <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Đánh giá {selectedPerson?.name}</DialogTitle>
              <DialogDescription>
                Chia sẻ trải nghiệm của bạn với {personLabel}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedPerson?.name}</p>
                    <p className="text-sm text-gray-600">
                      {mode === "student" ? selectedPerson?.subject : selectedPerson?.course}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Đánh giá *</Label>
                <div className="flex items-center gap-2">
                  {renderStars(rating, true)}
                  <span className="text-sm text-muted-foreground ml-2">
                    {rating > 0 ? `${rating} sao` : "Chọn số sao"}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="comment" className="mb-2 block">Nhận xét *</Label>
                <Textarea
                  id="comment"
                  placeholder={`Chia sẻ trải nghiệm của bạn với ${selectedPerson?.name}...`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
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
                  setShowFeedbackDialog(false);
                  setRating(0);
                  setComment("");
                }}
              >
                Hủy
              </Button>
              <Button onClick={handleSubmitFeedback}>
                Gửi đánh giá
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
