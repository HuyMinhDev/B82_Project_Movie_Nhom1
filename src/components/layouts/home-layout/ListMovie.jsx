import React, { useEffect, useState } from "react";
import { movieService } from "../../../service/userService";
import { Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { Clock, Star, Eye } from "lucide-react";
import { useDispatch } from "react-redux";
import { turnOnLoading, turnOffLoading } from "@/store/redux/spinnerSlice";
export default function ListMovie() {
  const [movieArr, setMovieArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(turnOnLoading());
    movieService
      .layDanhSachPhim()
      .then((result) => {
        setMovieArr(result.data.content);
      })
      .catch((err) => {
        console.log("Lỗi khi lấy dữ liệu: ", err);
      })
      .finally(() => {
        dispatch(turnOffLoading());
      });
  }, []);

  // Tính phim hiện tại theo page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMovies = movieArr.slice(indexOfFirst, indexOfLast);

  // Render danh sách phim
  const renderMovie = () => {
    return currentMovies.map((phim) => (
      <div
        key={phim.maPhim}
        className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        onClick={() => navigate(`detail/${phim.maPhim}`)}
      >
        <div className="bg-[#1c1c1c] h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-red-600 transform transition-all duration-500 cursor-pointer flex flex-col">
          <img
            className="h-72 w-full object-cover object-center"
            alt={phim.tenPhim}
            src={phim.hinhAnh}
          />
          <div className="p-4 text-white  flex flex-col flex-grow justify-between">
            <div className="flex justify-between items-start mb-2">
              <h3 className=" text-base font-semibold h-[3rem] overflow-hidden text-ellipsis leading-tight">
                {phim.tenPhim}
              </h3>
              <Tooltip title="Đánh giá trung bình">
                <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              </Tooltip>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {phim.thoiLuong || "120p"}
              </span>
              <span className="flex items-center gap-1 ">
                <Eye className="w-4 h-4" /> {phim.luotXem || "1000+"}
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  // Render phân trang
  const totalPages = Math.ceil(movieArr.length / itemsPerPage);
  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-md cursor-pointer ${
              currentPage === i + 1
                ? "bg-red-600 text-white border-red-600"
                : "bg-transparent text-white border-1 border-red-600 hover:bg-red-600 transition"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-black min-h-screen">
      <div className="container mx-auto pt-20 px-4">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Danh sách phim nổi bật
        </h2>
        <div className="flex flex-wrap -mx-2">{renderMovie()}</div>
        {renderPagination()}
      </div>
    </div>
  );
}
