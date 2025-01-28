import { getProducts } from "../../db/utils/services/products"
import { getPaginationResponse } from "../../utils/services/pagination";

export const getProductsPaginated = async ({ page }: { page: number }) => {
  const [products, count] = await getProducts({ page });
  return getPaginationResponse(products, count, page);
};

export const getProductResolver = async ({ page }: { page: number }) => {
  const [products, count] = await getProducts({ page });
  return getPaginationResponse(products, count, page);
};
