export function TutorFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 py-4 shadow-inner">
      {/* Thay thế container mx-auto px-6 max-w-7xl 
        bằng px-6 (hoặc px-4) để giữ padding ngang và xóa căn giữa.
      */}
      <div className="px-6"> 
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-3 md:space-y-0 text-left"> 
          
          {/* Thông tin Liên hệ */}
          <div className="space-y-1 pr-8"> {/* Thêm padding phải để không dính vào phần bên kia */}
            <p className="text-sm font-semibold text-gray-800">Thông tin liên hệ</p>
            <p className="text-sm">
              <span className="font-medium mr-1">Email contact:</span> 
              <a href="mailto:bankt@hcmut.edu.vn" className="text-blue-600 hover:text-blue-700 transition">bankt@hcmut.edu.vn</a>
            </p>
            <p className="text-sm">
              <span className="font-medium mr-1">Số điện thoại:</span> 0905xxxxxx
            </p>
          </div>

          {/* Hỗ trợ */}
          <div className="space-y-1 max-w-md"> {/* Giảm max-width để nội dung hỗ trợ không quá dài */}
            <p className="text-sm font-semibold text-gray-800">Hỗ trợ Tài khoản & Mật khẩu</p>
            <p className="text-xs italic">
              Quý Thầy/Cô chưa có tài khoản hoặc quên mật khẩu, vui lòng liên hệ Trung tâm Dữ liệu & Công nghệ Thông tin:
            </p>
            <p className="text-sm font-medium">
              Phòng 109 nhà A5 để được hỗ trợ.
            </p>
          </div>

        </div>
        
        <hr className="my-4 border-gray-200" />
        
        {/* Bản quyền - Luôn căn trái */}
        <div className="text-left"> 
            <p className="text-xs text-gray-500">
                © 2025 - Trường Đại học Bách Khoa - ĐHQG TP.HCM
            </p>
        </div>
      </div>
    </footer>
  );
}