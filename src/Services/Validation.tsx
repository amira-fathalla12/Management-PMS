export const getRequiredMessage = (filedName: string) =>
  `${filedName} is required`;

export const getRoomValidationRules = () => {
  return {
    imgs: {
      required: getRequiredMessage("Images"),
      validate: (files: File[] | null) =>
        files!.length <= 5 || "You can only upload up to 5 images",
    },
  };
};
