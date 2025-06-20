import { loginAuthApi } from "@/apis/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROLE } from "@/constants/role";
import { PATH } from "@/routes/path";
import { setUser } from "@/store/slices/user";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
  });

  const { mutate: loginUser } = useMutation({
    mutationFn: loginAuthApi,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));
      toast.success("Đăng nhập thành công");
      if (data.maLoaiNguoiDung === ROLE.ADMIN) {
        navigate(PATH.DASHBOARD);
      }
      if (data.maLoaiNguoiDung === ROLE.USER) {
        navigate(PATH.HOME);
      }
    },
    onError: (error) => {
      console.log(">>>>Check lỗi khi đăng nhập: ", error);
      console.log(">>>>Check lỗi khi đăng nhập: ", error.response.data.content);
      let errorMessage = error.response.data.content;
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('/images/logo/bg-login.webp')` }}
    >
      <div className="bg-black/90 p-8 rounded-xl shadow-lg max-w-md h-full w-full">
        <div className="text-center mb-6">
          <img
            src="/images/logo/logo.webp"
            alt="Logo"
            className="mx-auto h-16 object-contain"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-1">
              Tài khoản
            </label>
            <Input
              {...register("taiKhoan")}
              placeholder="Vui lòng nhập tài khoản"
              className="w-full text-white border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">
              Mật khẩu
            </label>
            <Input
              {...register("matKhau")}
              type="password"
              placeholder="Vui lòng nhập mật khẩu"
              className="w-full text-white border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-white">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <Link to="/reset-password" className="text-red-500 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 text-white uppercase transition hover:bg-red-900"
          >
            Đăng nhập
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-white">
          Chưa có tài khoản?{" "}
          <Link to="/auth/register" className="text-red-500 hover:underline ">
            Đăng ký
          </Link>
        </p>

        <div className="flex items-center gap-2 mt-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">HOẶC</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="flex justify-center mt-4 gap-4">
          <a href="https://www.google.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                fill="#FBC02D"
              ></path>
              <path
                d="M3.15283 7.3455L6.43833 9.755C7.32733 7.554 9.48033 6 11.9998 6C13.5293 6 14.9208 6.577 15.9803 7.5195L18.8088 4.691C17.0228 3.0265 14.6338 2 11.9998 2C8.15883 2 4.82783 4.1685 3.15283 7.3455Z"
                fill="#E53935"
              ></path>
              <path
                d="M12.0002 22.0001C14.5832 22.0001 16.9302 21.0116 18.7047 19.4041L15.6097 16.7851C14.6057 17.5456 13.3577 18.0001 12.0002 18.0001C9.39916 18.0001 7.19066 16.3416 6.35866 14.0271L3.09766 16.5396C4.75266 19.7781 8.11366 22.0001 12.0002 22.0001Z"
                fill="#4CAF50"
              ></path>
              <path
                d="M21.8055 10.0415L21.7975 10H21H12V14H17.6515C17.2555 15.1185 16.536 16.083 15.608 16.7855C15.6085 16.785 15.609 16.785 15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                fill="#1565C0"
              ></path>
            </svg>
          </a>
          <a href="https://facebook.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M12.9998 2.16675C7.01659 2.16675 2.1665 7.01683 2.1665 13.0001C2.1665 18.9833 7.01659 23.8334 12.9998 23.8334C18.9831 23.8334 23.8332 18.9833 23.8332 13.0001C23.8332 7.01683 18.9831 2.16675 12.9998 2.16675Z"
                fill="url(#paint0_linear_770_72)"
              ></path>
              <path
                d="M14.4663 15.8713H17.27L17.7104 13.0232H14.4663V11.4665C14.4663 10.2835 14.8531 9.23425 15.9597 9.23425H17.738V6.74908C17.4255 6.70683 16.7646 6.61475 15.5161 6.61475C12.9085 6.61475 11.3799 7.99166 11.3799 11.129V13.0237H8.69922V15.8718H11.3794V23.7C11.9102 23.7791 12.4481 23.8332 13.0001 23.8332C13.4989 23.8332 13.9859 23.7877 14.4663 23.7227V15.8713Z"
                fill="white"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_770_72"
                  x1="5.41271"
                  y1="5.41296"
                  x2="21.9996"
                  y2="21.9999"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#2AA4F4"></stop>
                  <stop offset="1" stop-color="#007AD9"></stop>
                </linearGradient>
              </defs>
            </svg>
          </a>
          <a href="https://twitter.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 6.2145C20.3385 6.5075 19.627 6.703 18.8765 6.7955C19.6395 6.3425 20.2265 5.62 20.502 4.7665C19.788 5.185 18.997 5.4925 18.1555 5.6545C17.4835 4.942 16.525 4.5 15.463 4.5C13.423 4.5 11.7695 6.139 11.7695 8.16C11.7695 8.446 11.803 8.7245 11.866 8.995C8.79704 8.841 6.07504 7.382 4.25404 5.168C3.93404 5.709 3.75404 6.3425 3.75404 7.011C3.75404 8.2815 4.40454 9.4 5.39654 10.059C4.79104 10.0405 4.22104 9.872 3.72203 9.602C3.72203 9.613 3.72203 9.6295 3.72203 9.645C3.72203 11.4205 4.99554 12.899 6.68354 13.2355C6.37504 13.32 6.04904 13.367 5.71304 13.367C5.47454 13.367 5.24204 13.34 5.01704 13.2995C5.48704 14.7505 6.85054 15.811 8.46604 15.8425C7.20204 16.8225 5.61004 17.4095 3.87904 17.4095C3.58004 17.4095 3.28754 17.3925 2.99854 17.3575C4.63404 18.393 6.57604 19 8.66054 19C15.453 19 19.169 13.422 19.169 8.583C19.169 8.4245 19.164 8.2665 19.1565 8.1105C19.8815 7.5985 20.5065 6.9525 21 6.2145Z"
                fill="#1BB8FF"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
