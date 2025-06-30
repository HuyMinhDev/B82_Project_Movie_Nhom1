import React from "react";

export default function AppPromoSection() {
  return (
    <section id="ungDung" className="bg-white">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Text content */}
        <div className="flex flex-col justify-center space-y-4 text-white">
          <p className="text-3xl font-medium">Ứng dụng tiện lợi dành cho</p>
          <p className="text-3xl font-medium">người yêu điện ảnh</p>
          <p className="text-base">
            Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và
            đổi quà hấp dẫn.
          </p>
          <a
            href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-red-600 text-white text-center font-medium py-3 px-6 rounded shadow hover:bg-red-900 transition"
          >
            App miễn phí – Tải về ngay!
          </a>
          <p className="text-base">
            TIX có hai phiên bản{" "}
            <a
              href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
              target="_blank"
              rel="noreferrer"
              className="text-red-500 underline"
            >
              iOS
            </a>{" "}
            &{" "}
            <a
              href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
              target="_blank"
              rel="noreferrer"
              className="text-red-500 underline"
            >
              Android
            </a>
          </p>
        </div>

        {/* Image content */}
        <div className="phone-item flex flex-col items-center space-y-4">
          {/* <img
            src="/images/AppPromoSection/banner-slider.jpg"
            alt="phone"
            className="w-[200px] md:w-[300px] object-contain"
          /> */}
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <img
              src="/images/AppPromoSection/banner-slider.jpg"
              alt="slider"
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
