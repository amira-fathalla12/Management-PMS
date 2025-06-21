import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface CustomInputProps {
  label?: string;
  type: string;
  register?: ReturnType<UseFormRegister<FieldValues>>;
  isError?: FieldError | undefined | boolean;
  errorMessage?: string;
  placeholder?: string;
  bgColor?: string;
  placeColor?: string;
  widthSM?: string;
  widthXS?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  label,
  type,
  register,
  isError,
  errorMessage,
  placeholder,
  bgColor,
  placeColor,
  widthSM,
  widthXS,
  value,
  onChange,
}: CustomInputProps) => {
  return (
    <div
      className={`flex flex-col pb-2 w-full ${
        widthXS ? widthXS : ""
      } sm:${widthSM ? widthSM : "w-full"}`}
    >
      {label && (
        <label
          htmlFor={`${label}-input`}
          className="text-[#152C5B] text-base font-medium mb-1"
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={`${label}-input`}
        placeholder={placeholder}
        className={`
          ${type === "file" ? "hidden" : ""}
          ${bgColor ? bgColor : "bg-gray-50"}
          ${
            placeColor === "#000000"
              ? "placeholder-black placeholder-opacity-100 font-medium rounded-md"
              : "placeholder-gray-500 placeholder-opacity-40"
          }
          px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
        `}
        {...register}
        value={value}
        onChange={onChange}
      />

      {isError && (
        <p className="text-red-600 font-bold text-sm pt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default CustomInput;
