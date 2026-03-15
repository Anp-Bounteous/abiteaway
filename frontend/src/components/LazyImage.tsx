import { useState } from "react";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function LazyImage({ src, alt, className }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`image-shell ${className ?? ""}`.trim()}>
      {!loaded && <div className="image-skeleton skeleton" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`lazy-image ${loaded ? "is-loaded" : ""}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
