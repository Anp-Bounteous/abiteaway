export default function PageSkeleton() {
  return (
    <div className="page-skeleton">
      <div className="skeleton skeleton-pill" />
      <div className="skeleton skeleton-hero" />
      <div className="skeleton-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="skeleton skeleton-card" key={index} />
        ))}
      </div>
    </div>
  );
}
