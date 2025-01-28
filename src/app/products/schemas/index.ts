const productSchema = `#graphql
  type Query {
    products(page: Int!): productsData
    product(id: Int!): productData
  }
`;

const productType = `#graphql
  type productData {
    id: Int
    name: String
    description: String
    image: String
    price: Float
  }

  type productsData {
    data: [productData]
    count: Int
    currentPage: Int
    lastPage: Int
    nextPage: Int
    prevPage: Int
  }
`;

export const productSchemas = [
  productSchema,
  productType
];
