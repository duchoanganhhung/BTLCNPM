import { useState } from "react";
import {
  Search,
  FileText,
  Download,
  Eye,
  Filter,
  BookOpen,
  FileSpreadsheet,
  File,
  Star,
  Clock,
  User,
  Upload,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";

interface Document {
  id: string;
  title: string;
  subject: string;
  type: "lecture" | "textbook" | "exam" | "reference";
  uploadedBy: string;
  uploadDate: string;
  downloads: number;
  size: string;
  rating: number;
}

const documents: Document[] = [
  {
    id: "1",
    title: "Bài giảng Chương 1 - Giới thiệu Cấu trúc dữ liệu",
    subject: "Cấu trúc dữ liệu",
    type: "lecture",
    uploadedBy: "TS. Nguyễn Văn A",
    uploadDate: "20/10/2025",
    downloads: 245,
    size: "2.5 MB",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Đề thi giữa kỳ - Cấu trúc dữ liệu 2024",
    subject: "Cấu trúc dữ liệu",
    type: "exam",
    uploadedBy: "Trần Thị B",
    uploadDate: "15/10/2025",
    downloads: 389,
    size: "1.2 MB",
    rating: 4.9,
  },
  {
    id: "3",
    title: "Giáo trình Mạng máy tính - Toàn tập",
    subject: "Mạng máy tính",
    type: "textbook",
    uploadedBy: "PGS.TS Lê Văn C",
    uploadDate: "18/10/2025",
    downloads: 567,
    size: "15.8 MB",
    rating: 5.0,
  },
  {
    id: "4",
    title: "Bài tập lập trình C++ - Chương 3",
    subject: "Lập trình nâng cao",
    type: "reference",
    uploadedBy: "Nguyễn Thị D",
    uploadDate: "22/10/2025",
    downloads: 178,
    size: "3.1 MB",
    rating: 4.6,
  },
  {
    id: "5",
    title: "Slide bài giảng Cơ sở dữ liệu quan hệ",
    subject: "Cơ sở dữ liệu",
    type: "lecture",
    uploadedBy: "TS. Phạm Văn E",
    uploadDate: "19/10/2025",
    downloads: 312,
    size: "4.2 MB",
    rating: 4.7,
  },
  {
    id: "6",
    title: "Đề thi cuối kỳ Mạng máy tính 2023",
    subject: "Mạng máy tính",
    type: "exam",
    uploadedBy: "Admin",
    uploadDate: "10/10/2025",
    downloads: 423,
    size: "890 KB",
    rating: 4.8,
  },
  {
    id: "7",
    title: "Tài liệu tham khảo - Thuật toán sắp xếp",
    subject: "Cấu trúc dữ liệu",
    type: "reference",
    uploadedBy: "Hoàng Văn F",
    uploadDate: "25/10/2025",
    downloads: 198,
    size: "1.8 MB",
    rating: 4.5,
  },
  {
    id: "8",
    title: "Giáo trình lập trình hướng đối tượng",
    subject: "Lập trình nâng cao",
    type: "textbook",
    uploadedBy: "PGS. Trần G",
    uploadDate: "12/10/2025",
    downloads: 645,
    size: "12.3 MB",
    rating: 4.9,
  },
];

const subjects = [
  "Tất cả môn học",
  "Cấu trúc dữ liệu",
  "Mạng máy tính",
  "Lập trình nâng cao",
  "Cơ sở dữ liệu",
];

const documentTypes = [
  { value: "all", label: "Tất cả loại", icon: File },
  { value: "lecture", label: "Bài giảng", icon: FileText },
  { value: "textbook", label: "Giáo trình", icon: BookOpen },
  { value: "exam", label: "Đề thi", icon: FileSpreadsheet },
  { value: "reference", label: "Tài liệu tham khảo", icon: File },
];

export function Documents() {
  const [docsList, setDocsList] = useState<Document[]>(documents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Tất cả môn học");
  const [selectedType, setSelectedType] = useState("all");

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: "",
    subject: "",
    type: "reference",
    file: null as File | null,
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewDoc({ ...newDoc, file: e.target.files[0] });
    }
  };

  const handleSubmitUpload = () => {
    // Validate cơ bản
    if (!newDoc.title || !newDoc.subject || !newDoc.file) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
  const newDocument: Document = {
      id: Math.random().toString(36).substr(2, 9), // Tạo ID ngẫu nhiên
      title: newDoc.title,
      subject: newDoc.subject,
      type: newDoc.type as any,
      uploadedBy: "Bạn (User)", // Giả lập user hiện tại
      uploadDate: new Date().toLocaleDateString("vi-VN"),
      downloads: 0,
      size: (newDoc.file.size / 1024 / 1024).toFixed(1) + " MB", // Tính size file
      rating: 0,
    };

  setDocsList([newDocument, ...docsList]);
    
    // Reset form và đóng dialog
    setNewDoc({ title: "", subject: "", type: "reference", file: null });
    setIsUploadOpen(false);
  };

  const filteredDocuments = docsList.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "Tất cả môn học" || doc.subject === selectedSubject;
    const matchesType = selectedType === "all" || doc.type === selectedType;

    return matchesSearch && matchesSubject && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lecture":
        return <FileText className="h-5 w-5" />;
      case "textbook":
        return <BookOpen className="h-5 w-5" />;
      case "exam":
        return <FileSpreadsheet className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "lecture":
        return "Bài giảng";
      case "textbook":
        return "Giáo trình";
      case "exam":
        return "Đề thi";
      case "reference":
        return "Tài liệu";
      default:
        return "Tài liệu";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "textbook":
        return "bg-green-100 text-green-700 border-green-200";
      case "exam":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "reference":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="mb-2">Thư viện tài liệu</h1>
              <p className="text-muted-foreground">
                Tài liệu học tập và tham khảo cho sinh viên
              </p>
            </div>
            {/* Dialog Upload Form */}
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#3BA5DB] hover:bg-[#2E8AB8]">
                  <Upload className="h-4 w-4 mr-2" />
                  Tải lên tài liệu
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-white">
                <DialogHeader>
                  <DialogTitle>Tải lên tài liệu mới</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Nhập tiêu đề */}
                  <div className="grid gap-2">
                    <Label htmlFor="title">Tên tài liệu</Label>
                    <Input
                      id="title"
                      value={newDoc.title}
                      onChange={(e) =>
                        setNewDoc({ ...newDoc, title: e.target.value })
                      }
                      placeholder="Ví dụ: Bài giảng Cấu trúc dữ liệu..."
                    />
                  </div>

                  {/* Chọn môn học */}
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Môn học</Label>
                    <Select
                      value={newDoc.subject}
                      onValueChange={(val) =>
                        setNewDoc({ ...newDoc, subject: val })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn môn học" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects
                          .filter((s) => s !== "Tất cả môn học") // Bỏ option "Tất cả" khi upload
                          .map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Chọn loại tài liệu */}
                  <div className="grid gap-2">
                    <Label htmlFor="type">Loại tài liệu</Label>
                    <Select
                      value={newDoc.type}
                      onValueChange={(val) =>
                        setNewDoc({ ...newDoc, type: val })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes
                          .filter((t) => t.value !== "all")
                          .map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center">
                                <type.icon className="mr-2 h-4 w-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Input File */}
                  <div className="grid gap-2">
                    <Label htmlFor="file">File đính kèm</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleSubmitUpload} className="bg-[#3BA5DB]">
                    Lưu tài liệu
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm tài liệu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full md:w-[200px] bg-gray-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-white border">
            {documentTypes.map((type) => (
              <TabsTrigger
                key={type.value}
                value={type.value}
                onClick={() => setSelectedType(type.value)}
                className="data-[state=active]:bg-[#3BA5DB] data-[state=active]:text-white"
              >
                <type.icon className="h-4 w-4 mr-2" />
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedType} className="space-y-4">
            {/* Stats */}
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Tìm thấy <span className="font-medium text-foreground">{filteredDocuments.length}</span> tài liệu
              </p>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((doc) => (
                <Card
                  key={doc.id}
                  className="hover:shadow-lg transition-all duration-300 border-2 hover:border-[#3BA5DB] group"
                >
                  <CardContent className="p-6">
                    {/* Icon and Type */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3BA5DB] to-[#2E8AB8] flex items-center justify-center text-white">
                        {getTypeIcon(doc.type)}
                      </div>
                      <Badge
                        variant="outline"
                        className={getTypeBadgeColor(doc.type)}
                      >
                        {getTypeLabel(doc.type)}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 line-clamp-2 min-h-[3rem] group-hover:text-[#3BA5DB] transition-colors">
                      {doc.title}
                    </h3>

                    {/* Subject */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {doc.subject}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-2 mb-4 pb-4 border-b">
                      <div className="flex items-center text-xs text-muted-foreground gap-2">
                        <User className="h-3 w-3" />
                        <span>{doc.uploadedBy}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{doc.uploadDate}</span>
                        </div>
                        <span>{doc.size}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Star className="h-3 w-3 fill-yellow-600" />
                          <span>{doc.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Download className="h-3 w-3" />
                          <span>{doc.downloads}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-[#3BA5DB] hover:bg-[#2E8AB8]"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Tải xuống
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Xem
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mb-2">Không tìm thấy tài liệu</h3>
                <p className="text-muted-foreground">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
