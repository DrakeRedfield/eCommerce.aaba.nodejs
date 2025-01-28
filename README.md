# eCommerce - NodeJs

## Description
**eCommerce Management** is a backend application made with NodeJs and Express to simulates an eCommerce, where you can manage
* **Products**
* **Sales** (WIP)
* **Inventory** (WIP)
* **Customers** (WIP)

## Technologies
* **NodeJs**
* **TypeScript**
* **ExpressJs**
* **Graphql**
* **Apollo server V4**
* **Postgresql**
* **TypeORM**
* **Jest**

## Features
* **Seeder**
  * There's a seeder that can populate the postgresdb with
    * Default Admin User
    * 5 Products
    * 5 Inventory records
    * 5 Inventory Logs Records
* **User Admin**
  * Login with an admin user
* **Products**
  * Get Paginated Products
  * Get Single Product
  * Create Product (only logged admin user can create user)
  * Update Product (only logged admin user can create user)
  * Delete Product (only logged admin user can create user)
* **Logger**
  * Handle app error
  * Save Errors on files
  * Unique Id for each request
* **Unit Testing**
  * Test the app with Jest

**More features are coming in the next versions.**

## Getting started
### Instalation
This is a **NodeJs** application, make sure that you have NodeJs and NPM installed.

If you don't have NodeJs installed, you can downloaded and install on [NodeJS Official Site](https://nodejs.org/en).

You can install all the requiered dependencies with the following command.

```
npm install
```

### Configuration
#### Env variables
A **.env** must be created with all the environment variables.

There's a file named **".env.example"** on **root path** where you can have an example of all the Environment Variable that the application needs.

**Note:** It's necessary have the following **Postgres Data Base Connection Information**.
```shell
DB_HOST=YOUR_DB_HOST
DB_PORT=YOUR_DB_PORT
DB_USERNAME=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_DB_NAME
DB_SYNC=true # Value could be true or false
```

### Build
Now that You have all the dependencies installed and the .env file created and configured, It's time to build the application with the following command:

```
npm run build
```

This comman will create a **dist** folder with the app files builded into JS files.

### Run in Watch Mode
For development porpuses, you can run the application in watch mode with the following command, this will capture any change you made in the TypeScript code and build into JS code in dist folder.

```
npm run dev
```

**Note:** Make sure don't run this command before build at least once.

### Run
Run the application with the following command

```
npm run start
```

**Note:** Make sure don't run this command before build at least once.

### Test
You can test the application with **Jest**, You can create your test files into **src/tests**.

Run test with the following command:

```
npm run test
```
## Resources
### Postman
Here you can download a json file that you could import into Postman

[Download eCommerce Postman Documentation](https://drive.google.com/file/d/1a0YHqbSOGwOEX8wcFLMFAQRnKnz86Ms-/view?usp=sharing)

### Graphql Queries
#### Login Admin
```graphql
mutation LoginAdmin($email: String!, $password: String!) {
    loginUserAdmin(email: $email, password: $password){
        token
        expireIn
        user {
            id
            name
            lastName
            email
        }
    }
}
```

#### Get Products
```graphql
query GetProducts($page: Int!) {
    products(page: $page){
        data {
            id
            name
            description
            image
            price
        }
        count
        currentPage
        lastPage
        nextPage
        prevPage
    }
}
```

#### Get Product
```graphql
query GetProduct($id: Int!) {
    product(id: $id){
        id
        name
        description
        image
        price
    }
}
```

#### Create Product
**Authorization Header** must be included in the request
```graphql
mutation CreateProduct($product: CreateProductInput!) {
    createProduct(product: $product){
        id
        name
        description
        image
        price
    }
}
```
**Example of variable**
```json
{
    "product": {
        "name": "RD-05",
        "description": "Hot Wheel Acceleracer - RD-05, Drone",
        "image": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8a7cf4fe-7767-45be-a4e8-db648968c0ef/depcuoy-27f2d836-f7d6-4963-b1fe-c76aee98d9ce.png/v1/fill/w_1192,h_670,q_70,strp/acceleracers_rd_05_by_valkenvugen_depcuoy-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzhhN2NmNGZlLTc3NjctNDViZS1hNGU4LWRiNjQ4OTY4YzBlZlwvZGVwY3VveS0yN2YyZDgzNi1mN2Q2LTQ5NjMtYjFmZS1jNzZhZWU5OGQ5Y2UucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.2bo1XL3LWff4rj57ZH2Z0yR4ssqjIbuOVptlHrf7ryE",
        "price": 12
    }
}
```

#### Update Product
**Authorization Header** must be included in the request
```graphql
mutation UpdateProduct($product: UpdateProductInput!) {
    updateProduct(product: $product){
        id
        name
        description
        image
        price
    }
}
```
**Example of variable**
```json
{
    "product": {
        "id": 10,
        "price": 14.5
    }
}
```

#### Delete Product
**Authorization Header** must be included in the request
```graphql
mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
}
```
