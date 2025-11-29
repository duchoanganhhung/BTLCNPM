import { Star } from "lucide-react";
import { Card } from "./ui/card";

const tutors = [
  {
    id: 1,
    name: "Lê Văn C",
    subject: "Cấu trúc dữ liệu",
    rating: 4.8,
    reviews: "Gửi yêu cầu",
  },
  {
    id: 2,
    name: "Trần Văn D",
    subject: "Giải tích 1",
    rating: 4.6,
    reviews: "Gửi yêu cầu",
  },
];

export function TutorSuggestions() {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h3 className="mb-4">Gợi ý gia sư phù hợp:</h3>

        <div className="space-y-3">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    - {tutor.name} | Môn: {tutor.subject} | Đánh giá:{" "}
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {tutor.rating}
                    </span>{" "}
                    | [{tutor.reviews}]
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
