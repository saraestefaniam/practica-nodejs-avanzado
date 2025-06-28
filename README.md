# NodePop

## Installation 

Install dependecies with:

```sh
npm install
```

Copy environment variables example to .env:
```sh
cp .env.example .env
```

Review your new .env values to match your configuration.

On first deploy you can use next command to initialize the database:
```sh
npm run initDB
```

## API

To insert testing users for API:
```sh
npm run api:init
```

This will insert the following users:

- admin@example.com / password: 1234
- user1@example.com / password: 1234

Now, let's test this API!

URL: http://localhost:3000/api 

### Endpoints

- POST /api/login → returns a JWT
- GET /api/products → requires authentication (JWT in Authorization header)
- POST /api/products → create product (authenticated)
- GET /api/products/<productId> → get product by ID
- PUT /api/products/<productId> → update product
- DELETE /api/products/<productId> → delete product

### To authenticate in Postman:

- Do POST /api/login with email and password.
- Copy the tokenJWT from the response.
- In subsequent requests, add this header:
```sh
Authorization: Value: <your-token>
```