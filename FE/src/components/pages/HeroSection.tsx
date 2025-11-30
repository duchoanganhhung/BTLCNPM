import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Calendar, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Background Image */}
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1618255630366-f402c45736f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBjYW1wdXN8ZW58MXx8fHwxNzYxMTIxOTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Trường Đại Học Bách Khoa"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="absolute inset-0 container mx-auto px-4 flex items-center">
        <div className="bg-gray-800/90 text-white rounded-lg p-6 max-w-md backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl"></span>
            <h2 className="text-white">Xin chào, Nguyễn Văn A!</h2>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 mt-1 flex-shrink-0 text-white" />
            <div>
              <p className="text-white">
                <span className="text-white">Buổi học sắp tới: </span>
                <span className="text-white">24/10/2025 - 09:00</span>
              </p>
              <p className="text-white/90 mt-1 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Giảng viên: Lê Văn B</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
