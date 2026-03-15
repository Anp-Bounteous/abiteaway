import { useEffect, useState } from "react";

const slides = [
  {
    title: "Street food energy, premium delivery feel",
    text: "Discover bold burgers, rice bowls, wraps, and comfort meals with a richer visual brand.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Late-night cravings handled in minutes",
    text: "Curated favorites with vivid product photography and quick reorder journeys.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Designed for mobile, built to convert",
    text: "Fast search, cart controls, checkout, and profile management in one neat flow.",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="carousel-card">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <article className="carousel-slide" key={slide.title}>
            <div className="carousel-copy">
              <span className="eyebrow">Delivery that looks better</span>
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
            </div>
            <div className="carousel-visual">
              <img src={slide.image} alt={slide.title} loading="lazy" />
            </div>
          </article>
        ))}
      </div>

      <div className="carousel-dots">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.title}
            className={index === activeIndex ? "dot active" : "dot"}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
