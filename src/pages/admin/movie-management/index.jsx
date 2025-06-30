import {
  addMovieApi,
  listMovieApi,
  updateMovieApi,
  deleteMovieApi,
} from "@/apis/movie";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "react-toastify";

export default function MovieManagement() {
  const [isOpen, setIsOpen] = React.useState(false);
  const imageRef = React.useRef(null);

  const { mutate: handleAddMovie, isPending: isAdding } = useMutation({
    mutationFn: (formData) => addMovieApi(formData),
    onSuccess: (response) => {
      toast.success("Thêm Phim Thành Công!");
      console.log("Add moive success: ", response);
      refetch();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log("Error adding movie: ", error);
    },
  });
  const { mutate: handleUpdateMovie, isPending: isUpdating } = useMutation({
    mutationFn: (formData) => updateMovieApi(formData),
    onSuccess: (response) => {
      toast.success("Update Phim Thành Công!");
      console.log("Update moive success: ", response);
      refetch();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log("Error Updating movie: ", error);
    },
  });
  const { mutate: handleDeleteMovie, isPending: isDeleting } = useMutation({
    mutationFn: (maPhim) => deleteMovieApi(maPhim),
    onSuccess: () => {
      refetch();
      toast.success("Xóa Phim Thành Công!");
    },
    onError: (error) => {
      console.error("Delete movie failed: ", error);
      alert("Xóa phim thất bại. Vui lòng thử lại.");
    },
  });

  const { handleSubmit, register, setValue, getValues, watch, reset } = useForm(
    {
      defaultValues: {
        tenPhim: "",
        trailer: "",

        moTa: "",
        danhGia: 0,
        hinhAnh: null,
        ngayKhoiChieu: null,
        status: false,
        hot: "",
      },
    }
  );

  const matchFielDate = watch("ngayKhoiChieu");
  const imageFile = watch("hinhAnh");
  const previewImage = (imageFile) => {
    const url = imageFile ? URL.createObjectURL(imageFile) : "";
    return url;
  };
  const [page, setPage] = React.useState(1);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () =>
      listMovieApi({ soTrang: page, soPhanTuTrenTrang: 10, maNhom: "GP01" }),
    queryKey: [
      "movieList",
      { soTrang: page, soPhanTuTrenTrang: 10, maNhom: "GP01" },
    ],
  });
  const onSubmit = (data) => {
    const formData = new FormData();
    console.log(data);
    const formattedDate = format(data.ngayKhoiChieu, "dd/MM/yyyy");
    console.log("Check date formattedDate: ", formattedDate);
    formData.append("maNhom", "GP01");
    formData.append("tenPhim", data.tenPhim);
    formData.append("trailer", data.trailer);
    formData.append("moTa", data.moTa);
    formData.append("danhGia", data.danhGia);
    formData.append("hinhAnh", data.hinhAnh);

    formData.append("ngayKhoiChieu", formattedDate);
    formData.append("dangChieu", data.status);
    formData.append("sapChieu", !data.status);
    formData.append("hot", data.hot);
    if (selectedMovie) {
      // Gọi API cập nhật
      formData.append("maPhim", selectedMovie.maPhim);
      handleUpdateMovie(formData);
      return;
    } else {
      handleAddMovie(formData);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Danh sách phim</h1>
        <Button size="lg" onClick={() => setIsOpen(true)}>
          <Plus />
          Thêm phim
        </Button>
      </div>
      <div className="mt-6">
        <DataTable
          columns={[
            {
              accessorKey: "tenPhim",
              header: "Tên Phim",
              cell: ({ row }) => {
                return (
                  <div className="font-semibold max-w-[120px] overflow-hidden text-ellipsis">
                    {row.original.tenPhim}
                  </div>
                );
              },
              size: 80,
            },
            {
              accessorKey: "hinhAnh",
              header: "Hình Ảnh",
              cell: ({ row }) => {
                return (
                  <img
                    src={row.original.hinhAnh}
                    alt={row.original.biDanh}
                    className="rounded-lg h-16 w-16 object-cover"
                  />
                );
              },
            },
            {
              accessorKey: "moTa",
              header: "Mô Tả",
              cell: ({ row }) => {
                return (
                  <div className="max-w-[200px] overflow-hidden text-ellipsis">
                    {row.original.moTa}
                  </div>
                );
              },
            },
            {
              accessorKey: "ngayKhoiChieu",
              header: "Ngày Khởi Chiếu",
              cell: ({ row }) => {
                return new Date(row.original.ngayKhoiChieu).toLocaleDateString(
                  "vi-VN"
                );
              },
            },
            {
              accessorKey: "dangChieu",
              header: "Trang thái",
              cell: ({ row }) => {
                return (
                  <div>
                    {row.original.dangChieu ? (
                      <span className="inline-block px-2 py-1 text-sm text-green-600 border rounded-lg">
                        Đang chiếu
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-sm text-gray-500 opacity-60 border rounded-lg">
                        Sắp chiếu
                      </span>
                    )}
                  </div>
                );
              },
            },
            {
              accessorKey: "hot",
              header: "Đang hot",
              cell: ({ row }) => {
                return (
                  <div className="text-xl">{row.original.hot ? "🔥" : ""}</div>
                );
              },
            },
            {
              header: "Hành động",
              accessorKey: "actions",
              cell: ({ row }) => {
                return (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isUpdating}
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedMovie(row.original);
                        setValue("tenPhim", row.original.tenPhim);
                        setValue("trailer", row.original.trailer);
                        setValue("moTa", row.original.moTa);
                        setValue("danhGia", row.original.danhGia);
                        setValue(
                          "ngayKhoiChieu",
                          new Date(row.original.ngayKhoiChieu)
                        );
                        setValue("status", row.original.dangChieu);
                        setValue("hot", row.original.hot);
                        setValue("hinhAnh", null);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isDeleting}
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          `Bạn có chắc chắn muốn xóa phim "${row.original.tenPhim}" không?`
                        );
                        if (confirmDelete) {
                          handleDeleteMovie(row.original.maPhim);
                        }
                      }}
                    >
                      Xóa
                    </Button>
                  </div>
                );
              },
            },
          ]}
          data={data?.items || []}
        />
        <Pagination className="mt-4 flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPage(1)} href="#">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPage(2)} href="#">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive onClick={() => setPage(3)} href="#">
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedMovie(null);
            reset();
          }

          setIsOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedMovie ? "Chỉnh sửa phim" : "Thêm phim mới"}
            </DialogTitle>
            <DialogDescription>
              {selectedMovie
                ? "Chỉnh sửa thông tin phim"
                : "Nhập thông tin phim mới để thêm vào hệ thống"}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Tên phim"
              className="w-full"
              {...register("tenPhim")}
            />
            <Input
              placeholder="Trailer"
              className="w-full"
              {...register("trailer")}
            />
            <Input
              placeholder="Đánh giá"
              className="w-full"
              {...register("danhGia")}
            />
            <Textarea
              placeholder="Mô tả"
              className="w-full"
              {...register("moTa")}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {matchFielDate ? (
                    new Date(matchFielDate).toLocaleDateString("vi-VN")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  initialFocus
                  selected={getValues("ngayKhoiChieu")}
                  onSelect={(date) => {
                    console.log("Check date: ", date);
                    setValue("ngayKhoiChieu", date);
                  }}
                />
              </PopoverContent>
            </Popover>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hot"
                onCheckedChange={(checked) => {
                  setValue("hot", checked);
                }}
              />
              <Label htmlFor="hot">Hot</Label>
            </div>
            <div>
              <Input
                type="file"
                hidden
                ref={imageRef}
                accept="image/*"
                // onChange={(event) => {
                //   console.log("Selected file: ", event.target.files[0]);
                //   setValue("hinhAnh", event.target.files[0]);
                // }}
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    const maxSizeMB = 1;
                    const maxSizeBytes = maxSizeMB * 1024 * 1024;
                    if (file.size > maxSizeBytes) {
                      alert(
                        "Ảnh vượt quá dung lượng cho phép (1MB). Vui lòng chọn ảnh nhỏ hơn."
                      );
                      event.target.value = null; // Reset input file
                      return;
                    }
                    setValue("hinhAnh", file);
                  }
                }}
              />
              {imageFile ? (
                <div className="w-full h-64 relative">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={previewImage(imageFile)}
                    alt="Preview"
                  />
                  <Button
                    type="button"
                    className="absolute top-2 right-2 border-red-500"
                    onClick={() => {
                      setValue("hinhAnh", null);
                      imageRef.current.value = null;
                    }}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    imageRef.current.click();
                  }}
                >
                  Thêm ảnh
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                onCheckedChange={(checked) => {
                  setValue("status", checked);
                }}
              />
              <Label htmlFor="status">Trạng thái chiếu</Label>
            </div>
            <div className="flex items-end justify-end mt-4">
              <Button loading={isAdding} disabled={isAdding}>
                {selectedMovie ? "Cập nhật phim" : "Thêm phim mới"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
