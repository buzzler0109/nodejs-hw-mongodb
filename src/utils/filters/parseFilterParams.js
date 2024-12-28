const isFavouriteList = ['true', 'false'];

export const parseFilterParams = ({ type, isFavourite }, contactTypeList) => {
  const parsedType = contactTypeList.includes(type) ? type : undefined;
  const parsedIsFavourite = isFavouriteList.includes(isFavourite)
    ? isFavourite
    : undefined;

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
