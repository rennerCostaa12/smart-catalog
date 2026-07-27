import { CategoryEnum } from "../types";

export const PRODUCTS_PER_PAGE = 12;

export const LIST_CATEGORIES = [
  {
    id: 1,
    name: CategoryEnum.ELETRONIC,
  },
  {
    id: 2,
    name: CategoryEnum.ACCESSORY,
  },
  {
    id: 3,
    name: CategoryEnum.HOME,
  },
  {
    id: 4,
    name: CategoryEnum.DESK,
  },
];

export function getIdByCategoryName(nameCategory: string | null) {
  if (!nameCategory) {
    return undefined;
  }

  const categoryFinded = LIST_CATEGORIES.find(
    (category) =>
      category.name.toLocaleLowerCase() === nameCategory?.toLocaleLowerCase(),
  );
  return categoryFinded;
}
