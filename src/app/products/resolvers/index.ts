import { getProduct } from "../../../db/utils/services/products"
import { getProductsPaginated } from "../service";

export const productsResolvers = {
  Query: {
    products: (_parent: any, args: any, _context: any, _info: any) => {
      return getProductsPaginated(args);
    },
    product: (_parent: any, args: any, _context: any, _info: any) => {
      return getProduct(args);
    },
  }
}
