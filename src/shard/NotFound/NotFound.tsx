import { Link } from "react-router-dom";
import NotFoundImage from "../../assets/notfound.jpg";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#f9f9f9]">
      {/* Text Section */}
      <div className="flex-1 flex flex-col items-start text-left px-8">
        <h1 className="text-[72px] font-bold text-[#203FC7] mb-4">Oops!</h1>
        <p className="text-[20px] text-gray-600 mb-8">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link to="/home">
          <button className="bg-[#203FC7] hover:bg-[#1a3199] text-white font-bold text-[16px] px-6 py-3 rounded-md">
            Back to Home
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <div
        className="flex-1 h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${NotFoundImage})` }}
      />
    </div>
  );
}
