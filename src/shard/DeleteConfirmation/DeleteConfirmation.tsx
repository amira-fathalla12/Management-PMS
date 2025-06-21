import { useEffect } from "react";
import deleteImg from "../../assets/deleteImg.png";

interface DeleteConfirmationProps {
  deleteItem: string;
  deleteFn: () => void;
  handleClose: () => void;
  open: boolean;
  deleting: boolean;
}

export default function DeleteConfirmation({
  deleteItem,
  deleteFn,
  handleClose,
  open,
  deleting,
}: DeleteConfirmationProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg text-center relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-red-600 text-xl hover:text-red-800"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">
          Delete this {deleteItem}
        </h2>

        {/* Image */}
        <img
          src={deleteImg}
          alt="modal-delete-image"
          className="mx-auto my-4 w-24 h-24 object-contain"
        />

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item? If you are sure, just click on "Delete".
        </p>

        {/* Delete Button */}
        <button
          onClick={deleteFn}
          disabled={deleting}
          className={`w-[95%] sm:w-[80%] h-12 rounded-md text-white text-[17px] font-medium transition duration-300 ${
            deleting
              ? "bg-[#949fcf] text-[#c0c0c0] cursor-not-allowed"
              : "bg-[#3252DF] hover:bg-[#213caa]"
          }`}
        >
          {deleting ? (
            <span className="inline-block animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
}
