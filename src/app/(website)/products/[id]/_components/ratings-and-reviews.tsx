import Image from "next/image";
import { Star } from "lucide-react";

type ReviewItem = {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
};

const reviews: ReviewItem[] = [
  {
    id: 1,
    name: "Kristin Watson",
    date: "March 14, 2021",
    rating: 5,
    comment:
      "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.",
    avatar: "/assets/images/user.png",
  },
  {
    id: 2,
    name: "Kristin Watson",
    date: "March 14, 2021",
    rating: 5,
    comment:
      "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.",
    avatar: "/assets/images/user.png",
  },
  {
    id: 3,
    name: "Kristin Watson",
    date: "March 14, 2021",
    rating: 5,
    comment:
      "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.",
    avatar: "/assets/images/user.png",
  },
  {
    id: 4,
    name: "Kristin Watson",
    date: "March 14, 2021",
    rating: 5,
    comment:
      "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.",
    avatar: "/assets/images/user.png",
  },
];

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-slate-900">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? "fill-current" : ""}`}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
}

export default function RatingsReviewsSection() {
  return (
    <section className="w-full bg-[#edf4f6] py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Ratings and Reviews
          </h2>
          <p className="mt-3 text-sm text-slate-500 md:text-base">
            157 Reviews
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex gap-4 border-b border-slate-200 py-6 last:border-b-0"
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <ReviewStars rating={review.rating} />

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  {review.comment}
                </p>

                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  {review.name}
                </h3>

                <p className="mt-1 text-xs text-slate-400">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}