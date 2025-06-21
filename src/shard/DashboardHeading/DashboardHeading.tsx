import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const linkTo = (item: string) => {
  if (item === "Room") {
    return "new-room";
  } else {
    return "";
  }
};

const DashboardHeading = ({
  item,
  label,
  handleClick,
}: {
  item: string;
  label: string;
  handleClick?: () => void;
}) => {
  return (
    <div className="flex flex-row justify-between items-center px-8 py-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{label} Table Details</h2>
        <p className="text-sm text-[#323C47] mt-1">You can check all details</p>
      </div>

      {item !== "Booking" && item !== "User" && (
        <Link to={linkTo(item)} onClick={handleClick}>
          <button className="bg-[#203FC7] hover:bg-[#1a3199] text-white text-[16px] font-semibold px-6 h-12 rounded-lg flex items-center gap-2 transition">
            <span className="hidden md:block">Add New</span>
            <span className="block md:hidden">
              <AddCircleOutlineIcon fontSize="small" />
            </span>
            {item}
          </button>
        </Link>
      )}
    </div>
  );
};

export default DashboardHeading;
