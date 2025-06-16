import fetcher from "../apis/fetcher.js";
export const userService = {
  // Đăng nhập
  loginAction: (user) => fetcher.post("/api/QuanLyNguoiDung/DangNhap", user),

  // Đăng ký
  registerAction: (regData) =>
    fetcher.post("/api/QuanLyNguoiDung/DangKy", regData),

  // Lấy thông tin tài khoản (token đã tự động gắn từ interceptor)
  getInfoAccAction: () => fetcher.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan"),

  // Cập nhật thông tin tài khoản (token tự động)
  updateAccInfoAction: (payload) =>
    fetcher.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload),
};
export let movieService = {
  layDanhSachBanner: () => fetcher.get("/QuanLyPhim/LayDanhSachBanner"),
  layDanhSachPhim: () => fetcher.get("/QuanLyPhim/LayDanhSachPhim"),
  layThongTinPhim: (idPhim) =>
    fetcher.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${idPhim}`),
  layHeThongRap: () => fetcher.get("/QuanLyRap/LayThongTinLichChieuHeThongRap"),
  layThongTinLichChieu: (maPhim) =>
    fetcher.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`),
  layDanhSachPhongVe: (maLichChieu) =>
    fetcher.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`),
  datVe: (maLichChieu, dsGheDuocChon) =>
    fetcher.post(`/QuanLyDatVe/DatVe`, {
      maLichChieu,
      danhSachVe: dsGheDuocChon.map((ghe) => ({
        maGhe: ghe.maGhe,
        giaVe: ghe.giaVe,
      })),
    }),
};
