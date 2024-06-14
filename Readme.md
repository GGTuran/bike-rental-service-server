Technology Stack:

- Programming Language: TypeScript
- Web Framework: Express.js
- ODM & Validation Library: Zod, Mongoose for MongoDB
- Authentication & Authorization : JSON Web Token



# Bike Rental System Backend

I have developed a Bike Rental System Backend Server using Express.js, Mongoose, and TypeScript. This server secures its API endpoints with JWT authentication. The API differentiates between two user roles: Admin and User. Admins have full access to all routes, while Users are restricted to user-specific routes. Access to the data requires a valid token; without one, the user receives a 401 Unauthorized error. An invalid token results in a 403 Forbidden error. Users who attempt to access admin-only routes also encounter a 403 Forbidden error, indicating they lack the necessary permissions. The API supports the following endpoints:

The api has the following endpoints:
API Endpoints:

- /api/bikes
- /api/users
- /api/rentals



more details on route are

## Details on routes

```json

  {
  "routes": {
    "Auth Routes":{
        "Sign Up": {
        "method": "POST",
        "route": "/api/auth/signup"
      },
      "Login": {
        "method": "POST",
        "route": "/api/auth/login"
      },
    }
    "User Routes": {
      "Get Profile": {
        "method": "GET",
        "route": "/api/users/me"
      },
      "Update Profile": {
        "method": "PUT",
        "route": "/api/users/me"
      }
    },
    "Bike Routes": {
      "Create Bike": {
        "method": "POST",
        "route": "/api/bikes"
      },
      "Get All Bikes": {
        "method": "GET",
        "route": "/api/bikes"
      },
      "Update Bike": {
        "method": "PUT",
        "route": "/api/bikes/:id"
      },
      "Delete Bike": {
        "method": "DELETE",
        "route": "/api/bikes/:id"
      }
    },
    "Rental Routes": {
      "Create Rental": {
        "method": "POST",
        "route": "/api/rentals"
      },
      "Return Bike": {
        "method": "PUT",
        "route": "/api/rentals/:id/return"
      },
      "Get All Rentals for User": {
        "method": "GET",
        "route": "/api/rentals"
      }
    }
  }
}


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
