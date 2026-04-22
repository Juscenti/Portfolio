"use client";

import { useState, useRef } from "react";

interface ImageCarouselProps {
  images: string[]; // Array of image paths from /public
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) {
    return (
      <div className="photo-frame">
        <div className="photo-placeholder">
          <span className="photo-label">
            // No images provided<br />
            Add images to the carousel
          </span>
        </div>
      </div>
    );
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? goToNext() : goToPrev();
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="photo-frame carousel-container"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-wrapper">
        {/* Left tap zone */}
        <div className="carousel-tap-zone carousel-tap-left" onClick={goToPrev} />

        {/* Image display */}
        <div className="carousel-image-display">
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="carousel-image"
          />
        </div>

        {/* Right tap zone */}
        <div className="carousel-tap-zone carousel-tap-right" onClick={goToNext} />
      </div>

      {/* Image counter and indicators */}
      <div className="carousel-controls">
        <div className="carousel-counter">
          {currentIndex + 1} / {images.length}
        </div>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <div
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
