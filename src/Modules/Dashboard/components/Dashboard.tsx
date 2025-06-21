import { useEffect, useState } from "react";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import CircleChart from "../../Charts/CircleChart";
import UsersChart from "../../Charts/UserChart";
import { getDashboard, axiosInstance } from "../../../api";

interface BookingData {
  completed: number;
  pending: number;
}

interface UsersData {
  admin: number;
  user: number;
}

export default function Home() {
  const [rooms, setRooms] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [ads, setAds] = useState(0);
  const [booking, setBooking] = useState<BookingData>({
    completed: 0,
    pending: 0,
  });
  const [users, setUsers] = useState<UsersData>({ admin: 0, user: 0 });

  const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get("/dashboard"); // ما يحتاج Authorization في local API
    const data = response?.data;

    // تأكدي إن الـ data موجودة
    if (data) {
      setRooms(data.rooms || 0);
      setFacilities(data.facilities || 0);
      setAds(data.ads || 0);
      setBooking({
        completed: data.bookings?.completed || 0,
        pending: data.bookings?.pending || 0,
      });
      setUsers({
        admin: data.users?.admin || 0,
        user: data.users?.user || 0,
      });
    }
  } catch (error) {
    console.log("Dashboard Error:", error);
  }
};


  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="p-4 mt-10">
      {/* Summary Boxes */}
      <div className="flex justify-between gap-4 mb-10">
        {["Rooms", "Facilities", "Ads"].map((label) => (
          <div
            key={label}
            className="flex justify-between items-center w-1/3 bg-[#1A1B1E] text-white p-8 rounded-xl shadow-md"
          >
            <div>
              <p className="text-2xl font-bold mb-1">
                {label === "Rooms" ? rooms : label === "Facilities" ? facilities : ads}
              </p>
              <span className="text-gray-300">{label}</span>
            </div>
            <WorkTwoToneIcon
              sx={{
                backgroundColor: "#203FC733",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                padding: "10px",
              }}
              color="primary"
            />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="flex justify-around flex-wrap gap-8">
        <div className="w-[350px] bg-white shadow-lg rounded-xl py-4">
          <h2 className="text-center text-xl font-bold mb-4">Booking</h2>
          <CircleChart booking={booking} />
        </div>

        <div className="w-[350px] bg-white shadow-lg rounded-xl py-4">
          <h2 className="text-center text-xl font-bold mb-4">Users</h2>
          <UsersChart users={users} />
        </div>
      </div>
    </div>
  );
}
