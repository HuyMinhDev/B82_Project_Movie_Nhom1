import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../service/userService";
import { useSelector } from "react-redux";
import { Button, Modal } from "antd";
import verifiedIcon from "/images/icon/verified-icon.gif";
import crossIcon from "/images/icon/cross.png";
import { useDispatch } from "react-redux";
import { turnOnLoading, turnOffLoading } from "@/store/redux/spinnerSlice";

export default function TicketRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.user?.loginData);

  const [phongVe, setPhongVe] = useState({});
  const [thongTinPhim, setThongTinPhim] = useState({});
  const [danhSachGhe, setDanhSachGhe] = useState([]);
  const [gheDuocChon, setGheDuocChon] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchDanhSachPhongVe();
  }, []);

  const fetchDanhSachPhongVe = () => {
    dispatch(turnOnLoading());
    movieService
      .layDanhSachPhongVe(id)
      .then((res) => {
        const content = res.data.content;
        setPhongVe(content);
        setThongTinPhim(content.thongTinPhim);
        setDanhSachGhe(content.danhSachGhe);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(turnOffLoading());
      });
  };

  const handleGheDuocChon = (ghe) => {
    const clone = [...gheDuocChon];
    const index = clone.findIndex((item) => item.maGhe === ghe.maGhe);
    if (index !== -1) {
      clone.splice(index, 1);
    } else {
      clone.push(ghe);
    }
    setGheDuocChon(clone);
  };

  const renderDanhSachGhe = (dsGhe) => {
    return dsGhe.map((ghe) => {
      const isChon = gheDuocChon.some((item) => item.maGhe === ghe.maGhe);
      const baseClass =
        "w-10 h-10 rounded-md flex items-center justify-center m-1 border text-sm font-semibold transition-all duration-200";

      if (ghe.daDat) {
        return (
          <button
            key={ghe.maGhe}
            disabled
            className={`${baseClass} bg-gray-500 text-white cursor-not-allowed`}
            title="Đã đặt"
          >
            X
          </button>
        );
      }

      if (ghe.loaiGhe === "Vip") {
        return (
          <button
            key={ghe.maGhe}
            onClick={() => handleGheDuocChon(ghe)}
            title={`${ghe.tenGhe} - ${ghe.giaVe.toLocaleString()} VND`}
            className={`${baseClass} ${
              isChon
                ? "bg-yellow-700 border-green-500 text-white"
                : "bg-yellow-500 border-yellow-700 text-black"
            } hover:scale-105`}
          >
            {ghe.tenGhe}
          </button>
        );
      }

      return (
        <button
          key={ghe.maGhe}
          onClick={() => handleGheDuocChon(ghe)}
          title={`${ghe.tenGhe} - ${ghe.giaVe.toLocaleString()} VND`}
          className={`${baseClass} ${
            isChon
              ? "bg-green-400 border-white text-white"
              : "bg-gray-200 border-gray-400 text-black"
          } hover:scale-105`}
        >
          {ghe.tenGhe}
        </button>
      );
    });
  };

  const handleDatVe = () => {
    if (!loginData) return setModal2Open(true);
    movieService
      .datVe(id, gheDuocChon)
      .then(() => {
        setModalOpen(true);
        setGheDuocChon([]);
        fetchDanhSachPhongVe();
      })
      .catch((err) => console.log(err));
  };

  const InfoItem = ({ label, value, highlight = false }) => (
    <div className="flex justify-between items-center">
      <span className="font-medium">{label}:</span>
      <span className={`${highlight ? "text-red-600 font-semibold" : ""}`}>
        {value}
      </span>
    </div>
  );

  const Legend = ({ color, label }) => (
    <div className="flex flex-col items-center space-y-1">
      <div className={`w-6 h-6 rounded ${color}`}></div>
      <span className="text-sm">{label}</span>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-black via-zinc-900 to-black min-h-screen text-white pt-[70px]">
      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        {/* Ghế */}
        <div className="lg:w-2/3">
          <h2 className="text-xl mb-6 text-center font-semibold tracking-wide uppercase">
            Sơ đồ ghế
          </h2>
          <div className="bg-gray-300 text-black text-center py-2 rounded uppercase font-bold mb-6 shadow-inner">
            Màn hình
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-4 gap-2 justify-center">
            {renderDanhSachGhe(danhSachGhe)}
          </div>

          {/* Chú thích */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <Legend color="bg-gray-500" label="Đã đặt" />
            <Legend color="bg-gray-200" label="Ghế thường" />
            <Legend color="bg-yellow-500" label="Ghế VIP" />
            <Legend color="bg-green-400" label="Đang chọn" />
          </div>
        </div>

        {/* Thông tin phim */}
        <div className="lg:w-1/3 bg-white text-black rounded-xl p-6 shadow-lg space-y-4">
          <h3 className="text-xl font-bold text-center text-red-600">
            Thông tin đặt vé
          </h3>
          <InfoItem label="Phim" value={thongTinPhim.tenPhim} />
          <InfoItem label="Rạp" value={thongTinPhim.tenRap} />
          <InfoItem label="Cụm rạp" value={thongTinPhim.tenCumRap} />
          <InfoItem label="Địa chỉ" value={thongTinPhim.diaChi} />
          <InfoItem label="Ngày chiếu" value={thongTinPhim.ngayChieu} />
          <InfoItem label="Giờ chiếu" value={thongTinPhim.gioChieu} />
          <InfoItem
            label="Ghế đã chọn"
            value={gheDuocChon.map((g) => g.tenGhe).join(", ")}
          />
          <InfoItem
            label="Tổng tiền"
            value={
              gheDuocChon
                .reduce((tong, ghe) => tong + ghe.giaVe, 0)
                .toLocaleString() + " VND"
            }
            highlight
          />
          <button
            onClick={handleDatVe}
            className="w-full py-3 bg-red-600 text-white font-semibold text-lg rounded hover:bg-red-700 transition"
          >
            Xác nhận đặt vé
          </button>
        </div>
      </div>

      {/* Modal thành công */}
      <Modal
        centered
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <div className="text-center space-y-4">
          <img
            className="mx-auto h-20"
            src={verifiedIcon}
            alt="Đặt vé thành công"
          />
          <p className="text-2xl font-semibold">Đặt vé thành công!</p>
          <Button
            className="bg-red-600 hover:bg-red-700 w-full"
            type="primary"
            onClick={() => navigate("/")}
          >
            Trở về trang chủ
          </Button>
        </div>
      </Modal>

      {/* Modal chưa đăng nhập */}
      <Modal
        centered
        open={modal2Open}
        footer={null}
        onCancel={() => setModal2Open(false)}
      >
        <div className="text-center space-y-4">
          <img
            className="mx-auto h-10"
            src={crossIcon}
            alt="Vui lòng đăng nhập"
          />
          <p className="text-2xl">Vui lòng đăng nhập để đặt vé</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => (window.location.href = "/auth/login")}
              className="py-1 px-4 bg-blue-600 rounded text-white"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => navigate("/auth/register")}
              className="py-1 px-4 bg-green-600 rounded text-white"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
