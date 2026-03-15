export default function LoadingSpinner({ label = "Loading" }: { label?: string }) {
  return (
    <span className="spinner-wrap" aria-live="polite">
      <span className="spinner" />
      <span>{label}</span>
    </span>
  );
}
