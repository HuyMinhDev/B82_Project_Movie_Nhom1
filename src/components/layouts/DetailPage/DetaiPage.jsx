import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../../service/userService";
import { Modal, Progress, Tabs } from "antd";
import { FaStar, FaRegStar, FaPlay } from "react-icons/fa";
import moment from "moment";
import { useDispatch } from "react-redux";
import { turnOnLoading, turnOffLoading } from "@/store/redux/spinnerSlice";
export default function DetailPage() {
  const [movieInfo, setMovieInfo] = useState({});
  const [heThongRap, setHeThongRap] = useState([]);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const openModal = (youtubeUrl) => {
    const videoId = getYouTubeVideoId(youtubeUrl);
    if (videoId) {
      setTrailerUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
      setIsModalOpen(true);
    } else {
      console.warn("URL trailer không hợp lệ:", youtubeUrl);
    }
  };
  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerUrl(""); // Đặt lại URL để dừng video
  };

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(turnOnLoading());
    movieService
      .layThongTinPhim(params.id)
      .then((res) => setMovieInfo(res.data.content))
      .catch(console.error)
      .finally(() => {
        dispatch(turnOffLoading());
      });
    dispatch(turnOnLoading());
    movieService
      .layHeThongRap()
      .then((res) => setHeThongRap(res.data.content))
      .catch(console.error)
      .finally(() => {
        dispatch(turnOffLoading());
      });
  }, [params.id]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       window.scrollTo(0, 0);
  //       dispatch(turnOnLoading());

  //       const [res1, res2] = await Promise.all([
  //         movieService.layThongTinPhim(params.id),
  //         movieService.layHeThongRap(),
  //       ]);
  //       console.log(">>>Checl detailphim: ", res1);
  //       setMovieInfo(res1.data.content);
  //       setHeThongRap(res2.data.content);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       dispatch(turnOffLoading());
  //     }
  //   };

  //   fetchData();
  // }, [params.id]);

  const handleLichChieuClick = (id) => {
    navigate(`/ticket-room/${id}`);
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating / 2);
    const stars = [];
    for (let i = 0; i < full; i++)
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    for (let i = full; i < 5; i++)
      stars.push(<FaRegStar key={i + 5} className="text-yellow-400" />);
    return stars;
  };

  const renderLichChieu = (ds) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {ds.slice(0, 6).map((lich) => (
        <button
          key={lich.maLichChieu}
          onClick={() => handleLichChieuClick(lich.maLichChieu)}
          className="bg-white text-black px-4 py-2 rounded hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          {moment(lich.ngayChieuGioChieu).format("DD/MM/YYYY ~ HH:mm")}
        </button>
      ))}
    </div>
  );

  const renderCumRap = (lstCumRap) =>
    lstCumRap.slice(0, 5).map((cumRap) => (
      <div key={cumRap.maCumRap} className="mb-6">
        <h3 className="text-red-600 font-semibold">{cumRap.tenCumRap}</h3>
        <p className="text-white text-sm">{cumRap.diaChi}</p>
        {cumRap.danhSachPhim
          .filter((phim) => phim.maPhim === movieInfo.maPhim)
          .map((phim) => renderLichChieu(phim.lstLichChieuTheoPhim))}
      </div>
    ));

  const getMovieShowtimes = () => {
    const filtered = heThongRap
      .map((heThong) => {
        const cumRapFiltered = heThong.lstCumRap.filter((cum) =>
          cum.danhSachPhim.some((p) => p.maPhim === movieInfo.maPhim)
        );
        if (cumRapFiltered.length === 0) return null;
        return {
          key: heThong.maHeThongRap,
          label: (
            <img
              src={heThong.logo}
              alt={heThong.tenHeThongRap}
              className="h-10"
            />
          ),
          children: renderCumRap(cumRapFiltered),
        };
      })
      .filter(Boolean);

    return filtered.length > 0
      ? filtered
      : [
          {
            key: "none",
            label: "Thông báo",
            children: (
              <p className="text-white text-center">
                Phim này hiện chưa có lịch chiếu
              </p>
            ),
          },
        ];
  };

  return (
    <div className="bg-black text-white min-h-screen pt-[70px]">
      {/* Banner section */}
      <div
        className="relative bg-cover bg-center h-[600px]"
        style={{ backgroundImage: `url(${movieInfo.hinhAnh})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
            <img
              src={movieInfo.hinhAnh}
              alt={movieInfo.tenPhim}
              className="w-64 rounded shadow-lg"
            />
            <div className="max-w-xl mt-6 md:mt-0 md:ml-10">
              <h1 className="text-4xl font-bold mb-4">{movieInfo.tenPhim}</h1>
              <p className="text-gray-300 mb-4">{movieInfo.moTa}</p>
              <p className="text-sm mb-4 text-gray-400">
                <span className="font-semibold text-white">Khởi chiếu:</span>{" "}
                {moment(movieInfo.ngayKhoiChieu).format("DD/MM/YYYY")}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => openModal(movieInfo.trailer)}
                  className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  <FaPlay />
                  <span>Xem Trailer</span>
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("showtime-tabs")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
                >
                  Mua Vé
                </button>
              </div>
            </div>
            <div className="text-center hidden md:block">
              <Progress
                type="circle"
                percent={movieInfo.danhGia * 10}
                strokeColor="#facc15"
                format={() => (
                  <span className="text-4xl text-white">
                    {movieInfo.danhGia}
                  </span>
                )}
              />
              <div className="mt-4 flex justify-center">
                {renderStars(movieInfo.danhGia)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs lịch chiếu */}
      <div id="showtime-tabs" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6">Lịch Chiếu</h2>
        <Tabs
          tabPosition="left"
          defaultActiveKey="1"
          items={getMovieShowtimes()}
          className="w-full border rounded-lg shadow-lg p-4 flex-grow"
        />
      </div>
      <Modal
        title="Trailer"
        visible={isModalOpen}
        footer={null}
        onCancel={closeModal}
        width={800}
        destroyOnClose={true} // Hủy iframe khi đóng modal
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
    </div>
  );
}
