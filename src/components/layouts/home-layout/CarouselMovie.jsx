import React, { useEffect, useState } from "react";
import { Carousel, Modal } from "antd";
import { movieService } from "../../../service/userService";
import CarouselForm from "./CarouselForm";
import SelectMovieCopy from "./SelectMovie";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { turnOnLoading, turnOffLoading } from "@/store/redux/spinnerSlice";
const bannerList = [
  {
    maBanner: 1,
    maPhim: 1282,
    hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    trailer: "uqJ9u7GSaYM",
  },
  {
    maBanner: 2,
    maPhim: 1283,
    hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h.png",
    trailer: "kBY2k3G6LsM",
  },
  {
    maBanner: 3,
    maPhim: 1284,
    hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/cuoc-chien-sinh-tu.png",
    trailer: "Eu9G8nO5-Ug",
  },
];

export default function CarouselMovie() {
  const [movieArr, setMovieArr] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  const openModal = (trailerId) => {
    setTrailerUrl(`https://www.youtube.com/embed/${trailerId}?autoplay=1`); // Thêm autoplay vào URL
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerUrl(""); // Đặt lại URL để dừng video
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(turnOnLoading());
    movieService
      .layDanhSachBanner()
      .then((result) => {
        const updateCarousel = result.data.content.map((item) => ({
          ...item,
          trailer: item.trailer || "", // Đảm bảo mỗi phim có trailer (nếu có)
        }));
        setMovieArr(updateCarousel);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(turnOffLoading());
      });
  }, []);

  return (
    <div>
      <CarouselForm movieArr={bannerList} openModal={openModal} />

      <Modal
        title="Trailer"
        open={isModalOpen}
        footer={null}
        onCancel={closeModal}
        width={800}
        destroyOnHidden={true} // Hủy iframe khi đóng modal
      >
        {/* Video trailer */}
        {trailerUrl && (
          <iframe
            width="100%"
            height="400px"
            src={trailerUrl} // Nhúng video trailer vào iframe
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </Modal>
      <SelectMovieCopy />
    </div>
  );
}
