import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import nodataImg from "../../../assets/nodata.jpg";
import { Room } from "../../../interfaces/RoomInterfaces";
import { axiosInstance } from "../../../api";
import DashboardHeading from "../../../shard/DashboardHeading/DashboardHeading";
import DeleteConfirmation from "../../../shard/DeleteConfirmation/DeleteConfirmation";
import ActionMenu from "../../../shard/ActionMenu/ActionMenu";
import NoData from "../../../shard/NoData/NoData";
import ViewModal from "../../../shard/ViewModel/ViewModel";

export default function RoomsList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [viewId, setViewId] = useState<string>("");
  const [view, setView] = useState<boolean>(false);
  const [viewLoading, setViewLoading] = useState<boolean>(false);
  const [viewData, setViewData] = useState({});
  const [page, setPage] = useState<number>(1); // ← New
  const size = 5; // ← Items per page

  const navigate = useNavigate();

  const handleOpen = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

const getRooms = async () => {
  try {
    setLoading(true);
    const response = await axiosInstance.get("/rooms", {
      params: {
        _limit: size,
        _page: page,
      },
    });

    const totalCount = response.headers["x-total-count"];
    if (!totalCount) {
      console.warn("⚠️ Warning: Missing x-total-count header in response.");
    }

    setRooms(response.data);
    setCount(Number(totalCount) || response.data.length); // fallback
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  const deleteRoom = async () => {
    try {
      setDeleting(true);
      await axiosInstance.delete(`/rooms/${selectedId}`);
      toast.success("Room deleted successfully");
      getRooms();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setDeleting(false);
      handleClose();
    }
  };

  useEffect(() => {
    getRooms();
  }, [page]); // ← Reacts to page change

  const handleView = (id: string) => {
    setViewId(id);
    setView(true);
    setViewLoading(true);
  };

  const viewRoom = useCallback(async () => {
    if (!viewId) return;
    try {
      const response = await axiosInstance.get(`/rooms/${viewId}`);
      setViewData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setViewLoading(false);
    }
  }, [viewId]);

  useEffect(() => {
    if (view) viewRoom();
  }, [view, viewRoom]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardHeading label="Rooms" item="Room" />

      <DeleteConfirmation
        handleClose={handleClose}
        open={open}
        deleteFn={deleteRoom}
        deleteItem="Room"
        deleting={deleting}
      />

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-3 text-center">Room Number</th>
              <th className="p-3 text-center">Image</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Discount</th>
              <th className="p-3 text-center">Capacity</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-5 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : rooms.length > 0 ? (
              rooms.map((room) => (
                <tr
                  key={`room-${room.id || room.id}`}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-center">{room.roomNumber}</td>
                  <td className="p-3 text-center">
                    <img
                      src={room.images?.[0] || nodataImg}
                      alt="Room"
                      className="w-14 h-14 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="p-3 text-center">{room.price}</td>
                  <td className="p-3 text-center">{room.discount}</td>
                  <td className="p-3 text-center">{room.capacity}</td>
                  <td className="p-3 text-center">
                    <ActionMenu
                      handleShowView={() => handleView(room.id || room.id)}
                      handleOpenDelete={() => handleOpen(room.id || room.id)}
                      editFunction={() => navigate(`/rooms/${room.id || room.id}`)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-6">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        {Array.from({ length: Math.ceil(count / size) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-md border ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <ViewModal
        loading={viewLoading}
        viewData={viewData}
        view={view}
        closeView={() => setView(false)}
      />
    </div>
  );
}
