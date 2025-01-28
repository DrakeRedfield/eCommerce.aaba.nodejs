import { productsResolvers } from "../../app/products/resolvers";

export const resolvers = {
  Query: {
    ...productsResolvers.Query,
  },
  Mutation: {
    ...productsResolvers.Mutation,
  }
};
