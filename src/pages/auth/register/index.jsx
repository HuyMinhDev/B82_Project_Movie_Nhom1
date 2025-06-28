import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { PATH } from "@/routes/path";
import { useNavigate } from "react-router-dom";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// regexEmail
const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

const schema = yup.object().shape({
  taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
  matKhau: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .matches(
      passwordRegex,
      "Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số, ký tự đặc biệt"
    ),
  confirmmatKhau: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([yup.ref("matKhau")], "Mật khẩu không trùng khớp"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .matches(emailRegex, "Email không hợp lệ"),
  soDt: yup.string().required("Vui lòng nhập số điện thoại"),
  maNhom: yup.string().required("Vui lòng nhập mã nhóm"),
  hoTen: yup.string().required("Vui lòng nhập họ tên"),
});

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      confirmmatKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
        data,
        {
          headers: {
            TokenCybersoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MiIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MzU5NjgwMDAwMCIsIm5iZiI6MTczNDMwNzIwMCwiZXhwIjoxNzYzNzY5NjAwfQ.0FVjgESRWQdgV5umKdlAzdQ0ru01kk_ZfAzIVuecN28",
          },
        }
      );
      alert("Đăng ký thành công!");
      navigate(PATH.LOGIN);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        alert("Lỗi: " + error.response.data.message);
        console.log(error.response?.data);
      } else {
        alert("Lỗi không xác định!");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div
        style={{
          backgroundImage: `url("/image/bg-login.webp")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="w-2/4 h-screen flex flex-col justify-center items-center bg-white overflow-y-auto"
      >
        <h1 className="font-bold text-red-600 text-4xl mb-8">Create Account</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-900 opacity-8- w-2/5 rounded-2xl p-5"
        >
          {/* Tài khoản */}
          <div className="mb-4">
            <label htmlFor="taiKhoan" className="text-white text-sm">
              Tài khoản
            </label>
            <input
              {...register("taiKhoan")}
              className="w-full px-4 py-2 border-2 rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Vui lòng nhập tài khoản"
            />
            {errors.taiKhoan && (
              <p className="text-red-500 text-xs">{errors.taiKhoan.message}</p>
            )}
          </div>
          {/* email */}{" "}
          <div className="mb-4">
            <label htmlFor="email" className="text-white text-sm">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full px-4 py-2 border-2 rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Vui lòng nhập email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          {/* Mật khẩu */}
          <div className="mb-4">
            <label htmlFor="matKhau" className="text-white text-sm">
              Mật khẩu
            </label>
            <input
              {...register("matKhau")}
              type="password"
              className="w-full px-4 py-2 border-2 rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Vui lòng nhập mật khẩu"
            />
            {errors.matKhau && (
              <p className="text-red-500 text-xs">{errors.matKhau.message}</p>
            )}
          </div>
          {/* Nhập lại mật khẩu */}
          <div className="mb-4">
            <label htmlFor="confirmmatKhau" className="text-white text-sm">
              Nhập lại mật khẩu
            </label>
            <input
              {...register("confirmmatKhau")}
              type="password"
              className="w-full px-4 py-2 border-2 rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Vui lòng nhập lại mật khẩu"
            />
            {errors.confirmmatKhau && (
              <p className="text-red-500 text-xs">
                {errors.confirmmatKhau.message}
              </p>
            )}
          </div>
          {/* số điện thoại */}{" "}
          <div className="mb-4">
            <label htmlFor="soDt" className="text-white text-sm">
              Nhập số điện thoại
            </label>
            <input
              {...register("soDt")}
              type="number"
              className="w-full px-4 py-2 border-2 rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Vui lòng nhập số điện thoại"
            />
            {errors.soDt && (
              <p className="text-red-500 text-xs">{errors.soDt.message}</p>
            )}
          </div>
          {/* Họ tên */}
          <div className="mb-4">
            <label htmlFor="hoTen" className="text-white text-sm">
              Họ tên
            </label>
            <input
              {...register("hoTen")}
              className="w-full px-4 py-2 border-2 rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Vui lòng nhập họ tên"
            />
            {errors.hoTen && (
              <p className="text-red-500 text-xs">{errors.hoTen.message}</p>
            )}
          </div>
          {/* Mã nhóm */}
          <div className="mb-4">
            <label htmlFor="maNhom" className="text-white text-sm">
              Mã nhóm
            </label>
            <input
              {...register("maNhom")}
              className="w-full px-4 py-2 border-2 rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Nhập mã nhóm (VD: GP01)"
            />
            {errors.maNhom && (
              <p className="text-red-500 text-xs">{errors.maNhom.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition duration-200"
          >
            Đăng ký
          </button>
          <p className="mt-6 text-center text-sm text-white">
            Đã có tài khoản?{" "}
            <Link
              to={PATH.LOGIN}
              className="text-blue-400 font-semibold hover:underline"
            >
              ĐĂNG NHẬP
            </Link>
          </p>
        </form>
      </div>

      {/* Logo */}
      <div className="w-2/4 h-screen bg-black flex justify-center items-center">
        <img src="/image/logo.webp" alt="logo" />
      </div>
    </div>
  );
}
