# Billeasy-Assignment

## Installation
Install all dependencies
``` bash
   npm i
```

## How to use
### Step 1: Build the server.
```bash
   npm run build
```

### Step 2: Run the server.
```bash
   npm run Start
```

## How to run the server in development mode
```bash
   npm run dev
```

## Endpoints
### User Endpoint
Used to get all users\
-> Method: Get\
-> Route: '/users'\
-> Request Params: {role: string, active: boolean, page: number, limit: number, sort: boolean }\
-> Response: {status: string, error:string, data:array of users object, msg:string}\

### Product Endpoint
Used to add product to the database.\
-> Method: Post\
-> Route: '/products'\
-> Request Body: {name: string, description: string, catagory: string, price: number, available: boolean}\
-> Response: {status: string, error:string, data:product object, msg:string}


