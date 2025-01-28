import { createProductResolver, deleteProductResolver, updateProductResolver } from "../service";

export const productsMutationResolvers = {
  Mutation: {
    createProduct: (_parent: any, args: any, _context: any, _info: any) => {
      return createProductResolver(args);
    },
    updateProduct: (_parent: any, args: any, _context: any, _info: any) => {
      return updateProductResolver(args);
    },
    deleteProduct: (_parent: any, args: any, _context: any, _info: any) => {
      return deleteProductResolver(args);
    },
  }
}
