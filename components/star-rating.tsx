interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
}

export function StarRating({ rating, maxRating = 5, size = "sm" }: StarRatingProps) {
  const sizeMap = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: maxRating }).map((_, i) => (
        <span key={i} className={`${sizeMap[size]} flex items-center justify-center`}>
          {i < Math.floor(rating) ? (
            <span className="text-accent">★</span>
          ) : i < rating ? (
            <span className="text-accent">★</span>
          ) : (
            <span className="text-muted">★</span>
          )}
        </span>
      ))}
    </div>
  )
}
