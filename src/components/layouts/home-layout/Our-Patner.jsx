import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const images = [
  "/images/Our-Partner/p1.jpg",
  "images/Our-Partner/p2.jpg",
  "images/Our-Partner/p3.jpg",
  "images/Our-Partner/p4.jpg",
  "images/Our-Partner/p5.jpg",
  "images/Our-Partner/p6.jpg",
];

export default function PartnerCarousel() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 12,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 8,
        },
      },
    },
  });

  return (
    <section className="our-partner py-12 bg-black text-white" id="App">
      <div className="container mx-auto px-4">
        <h2 className="color-text text-2xl font-semibold text-center mb-8">
          Our Partner’s
        </h2>
        <div ref={sliderRef} className="keen-slider">
          {images.map((src, index) => (
            <div
              key={index}
              className="bg-item keen-slider__slide flex justify-center items-center bg-gray-100 rounded-lg p-4 shadow"
            >
              <img
                src={src}
                alt={`partner ${index + 1}`}
                className="h-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
