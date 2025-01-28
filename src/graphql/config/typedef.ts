import { productSchemas } from "../../app/products/schemas";

export const typeDefs = [
  `#graphql
    type paginationInfo {
      next: Int
      pages: Int
      count: Int
      prev: Int
    }
  `,
  ...productSchemas,
];
