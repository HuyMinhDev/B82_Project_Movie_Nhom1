import fetcher from "./fetcher";
export const loginAuthApi = async (data) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", data);
    console.log("Check user login nè: ", response);
    return response.data.content;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
