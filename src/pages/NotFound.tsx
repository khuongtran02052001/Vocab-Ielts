
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white rounded-lg shadow-md p-10 max-w-md">
        <h1 className="text-5xl font-bold text-primary-700 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Không tìm thấy trang</p>
        <p className="text-gray-500 mb-8">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
