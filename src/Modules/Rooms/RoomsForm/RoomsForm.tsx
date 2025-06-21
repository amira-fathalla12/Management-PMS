import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api";
import CustomInput from "../../../shard/CustomInput/CustomInput";

export default function RoomsForm() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { pathname } = useLocation();
  const newRoom = pathname.includes("new-room");

  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [discount, setDiscount] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoom && !roomId) {
      toast.error("Room ID is missing");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      roomNumber,
      price,
      capacity,
      discount,
      images,
    };

    try {
      const response = await axiosInstance[newRoom ? "post" : "put"](
        newRoom ? "/rooms" : `/rooms/${roomId}`,
        payload
      );

      toast.success("Room saved successfully");
      navigate("/rooms");
    } catch (error) {
      toast.error("Failed to save room");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!newRoom && roomId) {
      const fetchRoom = async () => {
        try {
          const response = await axiosInstance.get(`/rooms/${roomId}`);
          const room = response?.data;

          setRoomNumber(room.roomNumber || "");
          setPrice(room.price || "");
          setCapacity(room.capacity || "");
          setDiscount(room.discount || "");
          setImages(room.images || []);
        } catch (error) {
          toast.error("Failed to fetch room data");
        }
      };
      fetchRoom();
    }
  }, [newRoom, roomId]);

  const addImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setImages((prev) => [...prev, url]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="w-3/4 mx-auto pt-20 flex flex-col gap-4">
        <CustomInput
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          placeholder="Room Number"
          type="text"
        />
        <div className="flex gap-4">
          <CustomInput
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="text"
          />
          <CustomInput
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Capacity"
            type="text"
          />
        </div>
        <CustomInput
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Discount"
          type="text"
        />

        {/* Add Image URL Manually */}
        <button
          type="button"
          onClick={addImageUrl}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-fit"
        >
          Add Image URL
        </button>

        {/* Show Added Images */}
        {images.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {images.map((img, index) => (
              <div key={index} className="relative w-36 h-20">
                <img
                  src={img}
                  alt={`img-${index}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white px-1 py-0.5 text-xs rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="pt-10 border-t mt-10" />
        <div className="flex gap-6 justify-end pt-6">
          <RouterLink
            to="/rooms"
            className="border border-blue-700 text-blue-700 py-2 px-6 rounded-md hover:bg-blue-100"
          >
            Cancel
          </RouterLink>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-700 text-white py-2 px-6 rounded-md hover:bg-blue-800"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
