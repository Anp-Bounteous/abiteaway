import { useState, useEffect } from "react";

const carouselImages = [
  "/images/food1.jpg",
  "/images/food2.jpg",
  "/images/food3.jpg",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Auto-slide every 4 seconds
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % carouselImages.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg">
      <img
        src={carouselImages[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-64 sm:h-80 md:h-96 object-cover"
      />
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2"
      >
        {"<"}
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2"
      >
        {">"}
      </button>
    </div>
  );
}