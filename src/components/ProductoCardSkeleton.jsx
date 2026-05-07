export default function ProductoCardSkeleton() {
  return (
    <div className="card-product flex flex-col overflow-hidden">
      {/* Imagen */}
      <div className="skeleton-shimmer" style={{ aspectRatio: '1 / 1' }} />

      {/* Info */}
      <div className="flex flex-col p-3 gap-2.5">
        <div className="skeleton-shimmer h-3 w-16 rounded" />
        <div className="skeleton-shimmer h-4 w-full rounded" />
        <div className="skeleton-shimmer h-4 w-3/4 rounded" />
        <div className="skeleton-shimmer h-6 w-24 rounded mt-1" />
      </div>
    </div>
  )
}
