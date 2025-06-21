import { useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md"; 

const ShowUploadImgBox = ({
  imgUrl,
  height = "80px",
  width = "150px",
  deleteUrl,
}: {
  imgUrl: File | string;
  height?: string;
  width?: string;
  deleteUrl?: () => void;
}) => {
  const { pathname } = useLocation();

  return (
    <>
      {imgUrl && (
        <div className="flex items-center justify-center mt-4 relative">
          <img
            src={imgUrl instanceof File ? URL.createObjectURL(imgUrl) : imgUrl}
            alt="preview"
            style={{
              height: height,
              width: width,
              borderRadius: "10px",
            }}
          />
          {pathname.includes("rooms") && (
            <MdDelete
              className="absolute top-0 left-0 bg-white rounded cursor-pointer mx-1 my-2 text-lg p-1"
              onClick={deleteUrl}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ShowUploadImgBox;
