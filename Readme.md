# Bike Rental System Backend

## So,here is a backend server for renting bikes.It will allow someone to rent a bike for a time being and return it as his/her will of time,with payment.This system is so helpful for the tourist.This Backend server comes with some exciting features,such as authentication-authorization for security,ensuring proper bike management by an admin assigned to those tasks,better renting system of bikes.User data will be secured.

## Live URL

[https://bike-rental-service-server.vercel.app/](https://bike-rental-service-server.vercel.app/)

## Features

- **User Authentication**: Users can sign up, log in, and see their Booked rentals.
- **Bike Management**: Only an admin will be able to create database about bikes and also can update those.Everyone can see all the bike data to choose the desired bike for renting.
- **Renting Management**: An user can rent a bike of his/her likings.While only an admin can do works for returning a rented bike in database after getting it back from an user.Anyone can see his/her rentals if he/she ever made one.

Technology Stack:

- Programming Language: TypeScript
- Web Framework: Express.js
- Database: MongoDB(Mongoose for ODM)
- Validation Library: Zod
- Authentication & Authorization : JSON Web Token
- Payment : aamarpay
- Deployment : Vercel

The api has the following endpoints:
API Endpoints:

- /api/auth
- /api/users
- /api/bikes
- /api/rentals

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Clone the repository

**Follow this simple step to clone the project:**

```bash
git clone  https://github.com/GGTuran/bike-rental-service-server.git
cd bike-rental-service-server
```

**Now install the dependencies of the project:**

```bash
npm install
```



## Set up the server

**Set up the environment variables in .env file**

```
PORT = 5000
DATABASE_URL=your_own_mongodb_uri
BCRYPT_SALT_ROUNDS= any number
JWT_ACCESS_SECRET= Your JWT Secret
JWT_ACCESS_EXPIRES= Your Jwt Token Expire time
STORE_ID = Your aamarpay store id
SIGNATURE_KEY = Your aamarpay signature key
PAYMENT_URL = aamarpay base url for payment
PAYMENT_VERIFY_URL = aamarpay base url for verifying transaction id
```

**You can compile typescript**

```
npm run build
```

## Start the server

**You can run the server in development mode**

```
npm run start:dev
```

**Or you can start the server by running the js files which is recommended**

```
npm run start:prod
```






To test the api here is the admin credentials:



```json
{
  "email": "john@admin.com",
  "password": "admin123"
}
```



To test the api here is the user credentials:

```json
{
  "email": "john@user.com",
  "password": "user123"
}
```



## file structure in modules

```bash
modules
├── auth
│   ├── auth.controller.ts
│   ├── auth.model.ts
│   ├── auth.route.ts
│   └── auth.validation.ts
│   └── auth.service.ts
├── bike
│   ├── bike.controller.ts
│   ├── bike.interface.ts
│   ├── bike.model.ts
│   └── bike.validation.ts
│   ├── bike.route.ts
│   └── bike.service.ts
├── payment
│   ├── payment.controller.ts
│   ├── payment.model.ts
│   ├── payment.route.ts
│   └── payment.service.ts
├── rental
│   ├── rental.controller.ts
│   ├── rental.interface.ts
│   ├── rental.model.ts
│   ├── rental.utils.ts
│   └── rental.validation.ts
│   ├── rental.route.ts
│   └── rental.service.ts
├── user
│   ├── user.constants.ts
│   ├── user.controller.ts
│   ├── user.interface.ts
│   ├── user.model.ts
│   └── user.validation.ts
│   ├── user.routes.ts
│   └── user.service.ts
```

## Base URL

The base URL for all API endpoints is: `https://bike-rental-service-server.vercel.app/`

## Authentication Routes

### Sign Up

- **Method**: `POST`
- **Route**: `/api/auth/signup`
- **Description**: Register a new user.

### Login

- **Method**: `POST`
- **Route**: `/api/auth/login`
- **Description**: Authenticate a user and return a JWT token.

## User Routes

### Get Profile

- **Method**: `GET`
- **Route**: `/api/users/me`
- **Description**: Retrieve the profile information of the authenticated user.

### Update Profile

- **Method**: `PUT`
- **Route**: `/api/users/me`
- **Description**: Update the profile information of the authenticated user.

## Bike Routes

### Create Bike

- **Method**: `POST`
- **Route**: `/api/bikes`
- **Description**: Add a new bike to the system (Admin only).

### Get All Bikes

- **Method**: `GET`
- **Route**: `/api/bikes`
- **Description**: Retrieve a list of all available bikes.

### Update Bike

- **Method**: `PUT`
- **Route**: `/api/bikes/:id`
- **Description**: Update the details of a specific bike (Admin only).

### Delete Bike

- **Method**: `DELETE`
- **Route**: `/api/bikes/:id`
- **Description**: Remove a specific bike from the system (Admin only).

## Payment Routes

### Confirming Payment

- **Method**: `POST`
- **Route**: `/api/payment/confirmation`
- **Description**: Confirms the payment.

## Rental Routes

### Create Rental

- **Method**: `POST`
- **Route**: `/api/rentals`
- **Description**: Create a new rental for a bike.

### Return Bike

- **Method**: `PUT`
- **Route**: `/api/rentals/:id/return`
- **Description**: Mark a bike as returned for a specific rental(Admin only).

### Get All Rentals for User

- **Method**: `GET`
- **Route**: `/api/rentals`
- **Description**: Retrieve a list of all rentals for the authenticated user.

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request. Common status codes include:

- `200 OK`: The request was successful.
- `201 Created`: The resource was successfully created.
- `400 Bad Request`: The request could not be understood or was missing required parameters.
- `401 Unauthorized`: Authentication failed or user does not have permissions for the requested operation.
- `403 Forbidden`: Authentication succeeded but authenticated user does not have access to the requested resource.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server.

