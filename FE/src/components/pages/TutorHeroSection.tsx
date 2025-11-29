import { Calendar, BookOpen, MapPin, Hand, Book} from "lucide-react";
import { Card } from "../ui/card";

export function TutorHeroSection() {
  return (
    <div
      className="relative h-[500px] bg-cover bg-center"
      style={{
          backgroundImage:
          "url('https://images2.thanhnien.vn/Uploaded/dieutrangqc/2022_11_09/1-mot-goc-dh-bach-khoa-tphcm-1066.jpg')",
      }}
    >
      
      <div className="container mx-auto px-4 h-full">
        <div className="relative h-full flex items-center">
          <Card className="bg-gradient-to-br from-[#1e293b] to-[#334155] text-white p-8 shadow-2xl max-w-md border-0">
            <div className="flex items-center gap-2 mb-2">
              <Hand className="h-5 w-5" />
              <h2>Xin chào, Giảng viên Lê Văn B!</h2>
            </div>

            <div className="space-y-1">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 mt-0.5 opacity-80" />
                <div>
                  <p className="text-sm opacity-80 mb-1">Buổi học sắp tới: 24/10/2025 - 09:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Book className="h-5 w-5 mt-0.5 opacity-80" />
                <div>
                  <p className="text-sm opacity-80 mb-1">Môn học: Cấu trúc dữ liệu</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 mt-0.5 opacity-80" />
                <div>
                  <p className="text-sm opacity-80 mb-1">Giảng viên: Lê Văn B</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 opacity-80" />
                <div>
                  <p className="text-sm opacity-80 mb-1">Địa điểm: GDH6</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      
    </div>
  );
}
