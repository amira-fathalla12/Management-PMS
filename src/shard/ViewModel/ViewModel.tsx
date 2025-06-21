import { useLocation } from "react-router-dom";
import nodataImg from "../../assets/nodata.jpg";
import { useEffect } from "react";
import { formatDate } from "../helperFuncations/helperFuncations";

interface Iprops {
  view: boolean;
  loading: boolean;
  closeView: () => void;
  viewData: any;
}

const ViewModal = ({ view, loading, closeView, viewData }: Iprops) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (view) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [view]);

  if (!view) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 pt-32">
      <div className="bg-white rounded-2xl w-[90%] max-w-xl p-6 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={closeView}
          className="absolute top-4 right-4 text-red-600 text-xl hover:text-red-800"
        >
          &times;
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {pathname.includes("rooms")
                ? "Room "
                : pathname.includes("booking")
                ? "Booking "
                : pathname.includes("facilities")
                ? "Facility "
                : "Ads "}{" "}
              Details
            </h2>

            {pathname.includes("rooms") ? (
              <div className="text-center space-y-2">
                <img
                  src={
                    viewData?.room?.images[0] ? viewData.room.images[0] : nodataImg
                  }
                  alt="Room"
                  className="w-48 h-48 object-cover rounded-lg mx-auto"
                />
                <p>Room Number: {viewData?.room?.roomNumber}</p>
                <p>Capacity: {viewData?.room?.capacity}</p>
                <p>Discount: {viewData?.room?.discount}</p>
                <p>Price: {viewData?.room?.price}</p>
                <p>
                  Facilities:{" "}
                  {viewData?.room?.facilities?.map(
                    (f: { name: string }) => `${f.name}, `
                  )}
                </p>
              </div>
            ) : pathname.includes("booking") ? (
              <div className="space-y-2">
                <p>Price: {viewData?.booking?.totalPrice}</p>
                <p>Room Number: {viewData?.booking?.room?.roomNumber}</p>
                <p>Status: {viewData?.booking?.status}</p>
                <p>User: {viewData?.booking?.user?.userName}</p>
                <p>Start date: {formatDate(viewData?.booking?.startDate)}</p>
                <p>End date: {formatDate(viewData?.booking?.endDate)}</p>
              </div>
            ) : pathname.includes("facilities") ? (
              <p>Facility Name: {viewData?.facility?.name}</p>
            ) : (
              <div className="space-y-2">
                <p>Active: {viewData?.ads?.isActive ? "Yes" : "No"}</p>
                <p>Room Number: {viewData?.ads?.room?.roomNumber}</p>
                <p>Capacity: {viewData?.ads?.room?.capacity}</p>
                <p>Price: {viewData?.ads?.room?.price}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewModal;
