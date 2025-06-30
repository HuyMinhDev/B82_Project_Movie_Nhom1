// CarouselForm.js
import React from "react";
import { Carousel } from "antd";

const CarouselForm = ({ movieArr, openModal }) => {
  return (
    <Carousel arrows autoplay draggable className="relative">
      {movieArr.map((phim) => (
        <div
          key={phim.maBanner}
          className="h-screen w-full overflow-hidden"
          onClick={() => openModal(phim.trailer)}
        >
          <img
            className="w-full h-full object-cover object-center cursor-pointer"
            src={phim.hinhAnh}
            alt={`Phim ${phim.maPhim}`}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselForm;
