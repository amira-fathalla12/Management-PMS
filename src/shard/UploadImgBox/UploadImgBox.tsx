import { MdPhotoCamera } from "react-icons/md";
import ShowUploadImgBox from "../ShowUploadImgBox/ShowUploadImgBox";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { UploadIcon } from "../../shard/SvgIcons/SvgIcons";

type UploadImgBoxProps = {
inputRef: React.RefObject<HTMLInputElement | null>;
  handleButtonClick?: () => void;
  url: string | string[] | null;
  isError?: boolean | string;
  errorMessage?: string;
  currentImgs?: File[];
  setValue: React.Dispatch<React.SetStateAction<File[]>>;
};

const UploadImgBox = ({
  inputRef,
  handleButtonClick,
  url,
  isError,
  errorMessage,
  setValue,
  currentImgs = [],
}: UploadImgBoxProps) => {
  const { pathname } = useLocation();
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: File[]) => {
    const updatedFiles = [...currentImgs, ...files];
    if (updatedFiles.length > 5) {
      toast.error("You can only upload up to 5 images");
      return;
    }
    setValue(updatedFiles);
    toast.success("Image uploaded successfully");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files || []);
    handleFiles(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <>
      {/* Single image upload for register */}
      {pathname === "/register" && (
        <div className="flex flex-col gap-1 w-[95%] sm:w-[80%] pb-2 pt-2">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="border-2 border-dashed border-blue-600 p-4 w-full">
            {typeof url === "string" && (
              <ShowUploadImgBox imgUrl={url} height="40px" />
            )}
            {Array.isArray(url) && url[0] && (
              <ShowUploadImgBox imgUrl={url[0]} height="40px" />
            )}
            <button
              type="button"
              className="flex items-center gap-2 text-blue-600 text-base font-medium mt-2"
              onClick={handleButtonClick}
            >
              <MdPhotoCamera className="text-xl" />
              {url
                ? "Uploaded successfully. Upload another?"
                : "Upload an image file right here"}
            </button>
          </div>
          {isError && (
            <p className="text-red-600 font-bold text-sm mt-1">{errorMessage}</p>
          )}
        </div>
      )}

      {/* Multi-image upload for rooms */}
      {pathname.includes("rooms") && (
        <div className={`w-full ${Array.isArray(url) && url.length === 5 ? "cursor-not-allowed" : "cursor-pointer"}`}>
          <input
            id="room-images"
            type="file"
            accept="image/*"
            multiple
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
            disabled={Array.isArray(url) && url.length >= 5}
          />
          <label
            htmlFor="room-images"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`${
              dragOver ? "border-gray-400" : "border-green-700"
            } border-2 border-dashed bg-green-50 flex flex-col items-center gap-4 w-full py-8 rounded-md`}
          >
            <UploadIcon />
            <span className="text-black">
              Drag & Drop or{" "}
              <span className="text-green-700 font-medium">
                Choose Room Images
              </span>{" "}
              to Upload
            </span>
          </label>
          {isError && (
            <p className="text-red-600 font-bold text-sm mt-1">{errorMessage}</p>
          )}
        </div>
      )}
    </>
  );
};

export default UploadImgBox;
