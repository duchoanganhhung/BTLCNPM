import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, Upload, Download, FileText, Image, File, CheckCircle, XCircle, Eye, Trash2, AlertCircle } from "lucide-react";
import { Progress } from "../ui/progress";

// Mock data
const mockMaterials = [
  {
    id: "1",
    title: "Bài giảng Toán cao cấp - Chương 3",
    type: "pdf",
    size: "2.5 MB",
    uploader: "Nguyễn Văn A",
    uploadDate: "28/10/2024",
    status: "approved",
    downloads: 45,
    category: "Toán",
    course: "Toán cao cấp 1"
  },
  {
    id: "2",
    title: "Bài tập Vật lý - Động lực học",
    type: "pdf",
    size: "1.8 MB",
    uploader: "Trần Thị B",
    uploadDate: "27/10/2024",
    status: "pending",
    downloads: 0,
    category: "Vật lý",
    course: "Vật lý đại cương"
  },
  {
    id: "3",
    title: "Code mẫu C++ - Pointer",
    type: "zip",
    size: "0.5 MB",
    uploader: "Lê Minh C",
    uploadDate: "26/10/2024",
    status: "approved",
    downloads: 78,
    category: "Lập trình",
    course: "Lập trình C++"
  },
  {
    id: "4",
    title: "Slide IELTS Speaking",
    type: "pptx",
    size: "5.2 MB",
    uploader: "Phạm Thị D",
    uploadDate: "25/10/2024",
    status: "rejected",
    downloads: 0,
    category: "Ngoại ngữ",
    course: "Tiếng Anh"
  },
  {
    id: "5",
    title: "Đề cương ôn tập Hóa học",
    type: "docx",
    size: "0.8 MB",
    uploader: "Hoàng Văn E",
    uploadDate: "24/10/2024",
    status: "approved",
    downloads: 32,
    category: "Hóa học",
    course: "Hóa đại cương"
  },
];

const librarySync = [
  {
    id: "1",
    title: "Giáo trình Toán cao cấp (Nguyễn Đình Trí)",
    source: "HCMUT_LIBRARY",
    syncDate: "28/10/2024",
    status: "synced",
    type: "pdf"
  },
  {
    id: "2",
    title: "Advanced Engineering Mathematics",
    source: "HCMUT_LIBRARY",
    syncDate: "27/10/2024",
    status: "synced",
    type: "pdf"
  },
  {
    id: "3",
    title: "Physics for Scientists and Engineers",
    source: "HCMUT_LIBRARY",
    syncDate: "26/10/2024",
    status: "error",
    type: "pdf"
  },
];

const categories = ["Tất cả", "Toán", "Vật lý", "Hóa học", "Lập trình", "Ngoại ngữ", "Cơ khí"];

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("Tất cả");

  const getStatusBadge = (status: string) => {
    const variants: any = {
      approved: "default",
      pending: "secondary",
      rejected: "destructive",
      synced: "default",
      error: "destructive"
    };
    return variants[status] || "outline";
  };

  const getStatusText = (status: string) => {
    const text: any = {
      approved: "Đã duyệt",
      pending: "Chờ duyệt",
      rejected: "Từ chối",
      synced: "Đã đồng bộ",
      error: "Lỗi"
    };
    return text[status] || status;
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="w-4 h-4 text-red-500" />;
    if (type.includes("image") || type.includes("jpg") || type.includes("png")) return <Image className="w-4 h-4 text-blue-500" />;
    return <File className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Quản lý học liệu & Tài liệu</h2>
          <p className="text-muted-foreground">Quản lý tài liệu học tập và đồng bộ thư viện</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload tài liệu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload tài liệu mới</DialogTitle>
              <DialogDescription>Tải lên tài liệu học tập cho hệ thống</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tiêu đề</Label>
                <Input placeholder="Nhập tiêu đề tài liệu" />
              </div>
              <div className="space-y-2">
                <Label>Danh mục</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "Tất cả").map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Khóa học</Label>
                <Input placeholder="Ví dụ: Toán cao cấp 1" />
              </div>
              <div className="space-y-2">
                <Label>File</Label>
                <Input type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Hủy</Button>
              <Button>Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="materials" className="space-y-6">
        <TabsList>
          <TabsTrigger value="materials">Tài liệu hệ thống</TabsTrigger>
          <TabsTrigger value="library">Đồng bộ Library</TabsTrigger>
          <TabsTrigger value="stats">Thống kê</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách tài liệu</CardTitle>
              <CardDescription>Quản lý tất cả tài liệu được upload</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm tài liệu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="approved">Đã duyệt</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên tài liệu</TableHead>
                      <TableHead>Danh mục</TableHead>
                      <TableHead>Người upload</TableHead>
                      <TableHead>Ngày upload</TableHead>
                      <TableHead>Kích thước</TableHead>
                      <TableHead>Lượt tải</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getFileIcon(material.type)}
                            <div>
                              <p>{material.title}</p>
                              <p className="text-muted-foreground">{material.course}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{material.category}</Badge>
                        </TableCell>
                        <TableCell>{material.uploader}</TableCell>
                        <TableCell>{material.uploadDate}</TableCell>
                        <TableCell>{material.size}</TableCell>
                        <TableCell>{material.downloads}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(material.status)}>
                            {getStatusText(material.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="w-4 h-4" />
                            </Button>
                            {material.status === "pending" && (
                              <>
                                <Button variant="ghost" size="icon" className="text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-destructive">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Đồng bộ HCMUT_LIBRARY</CardTitle>
                  <CardDescription>Kết nối và đồng bộ tài liệu từ thư viện trường</CardDescription>
                </div>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Đồng bộ ngay
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span>Trạng thái kết nối:</span>
                  <Badge variant="default">Đã kết nối</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Lần đồng bộ cuối:</span>
                  <span className="text-muted-foreground">28/10/2024 - 08:30:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Số tài liệu đã đồng bộ:</span>
                  <span className="text-muted-foreground">245 tài liệu</span>
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên tài liệu</TableHead>
                      <TableHead>Nguồn</TableHead>
                      <TableHead>Ngày đồng bộ</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {librarySync.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getFileIcon(item.type)}
                            {item.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.source}</Badge>
                        </TableCell>
                        <TableCell>{item.syncDate}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(item.status)}>
                            {getStatusText(item.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {item.status === "error" && (
                              <Button variant="ghost" size="icon">
                                <Upload className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {librarySync.some(item => item.status === "error") && (
                <div className="flex items-start gap-3 p-4 border border-destructive bg-destructive/10 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                  <div>
                    <p className="text-destructive">Có {librarySync.filter(i => i.status === "error").length} tài liệu lỗi đồng bộ</p>
                    <p className="text-destructive/80 mt-1">Vui lòng kiểm tra kết nối hoặc thử đồng bộ lại</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Tổng tài liệu</CardDescription>
                <CardTitle>245</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Chờ duyệt</CardDescription>
                <CardTitle>12</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Đã duyệt</CardDescription>
                <CardTitle>218</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Lượt tải tuần này</CardDescription>
                <CardTitle>1,234</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Thống kê theo danh mục</CardTitle>
              <CardDescription>Số lượng tài liệu và lượt tải theo từng danh mục</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.filter(c => c !== "Tất cả").map((category, index) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>{category}</span>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span>{Math.floor(Math.random() * 50) + 10} tài liệu</span>
                      <span>{Math.floor(Math.random() * 500) + 100} lượt tải</span>
                    </div>
                  </div>
                  <Progress value={Math.random() * 100} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Tutor đóng góp</CardTitle>
              <CardDescription>Danh sách tutor upload nhiều tài liệu nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Nguyễn Văn A", "Trần Thị B", "Lê Minh C", "Phạm Thị D", "Hoàng Văn E"].map((name, index) => (
                  <div key={name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span>{name}</span>
                    </div>
                    <div className="text-right text-muted-foreground">
                      <p>{Math.floor(Math.random() * 30) + 5} tài liệu</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
