import { useEffect, useRef, useState } from "react";
import {
  FiMoreHorizontal,
  FiEye,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

interface ActionMenuProps {
  editFunction?: () => void;
  handleOpenDelete?: () => void;
  handleShowView?: () => void;
}

const ActionMenu = ({
  editFunction,
  handleOpenDelete,
  handleShowView,
}: ActionMenuProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !anchorRef.current?.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex justify-end">
      <button
        ref={anchorRef}
        onClick={handleToggle}
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <FiMoreHorizontal size={20} />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50"
        >
          <ul className="flex flex-col py-1">
            {handleShowView && (
              <li
                onClick={() => {
                  handleShowView();
                  setOpen(false);
                }}
                className="flex items-center px-4 py-2 text-blue-900 hover:bg-gray-100 cursor-pointer"
              >
                <FiEye className="mr-2" />
                View
              </li>
            )}
            {editFunction && (
              <li
                onClick={() => {
                  editFunction();
                  setOpen(false);
                }}
                className="flex items-center px-4 py-2 text-blue-900 hover:bg-gray-100 cursor-pointer"
              >
                <FiEdit className="mr-2" />
                Edit
              </li>
            )}
            {handleOpenDelete && (
              <li
                onClick={() => {
                  handleOpenDelete();
                  setOpen(false);
                }}
                className="flex items-center px-4 py-2 text-blue-900 hover:bg-gray-100 cursor-pointer"
              >
                <FiTrash2 className="mr-2" />
                Delete
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
