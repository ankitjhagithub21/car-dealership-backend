# Car Dealership API Documentation

This document provides an overview of the endpoints available in the Car Dealership API.

## Authentication

The API uses JWT (Json Web Token) for authentication. Users need to obtain a token by logging in before accessing protected endpoints.

## Endpoints

### User Endpoints

#### Get Dealerships with a Certain Car

- **URL:** `/api/user/dealerships/:carId`
- **Method:** `GET`
- **Description:** Retrieve dealerships that have the specified car available.
- **Parameters:**
  - `carId` (string, required): ID of the car to search for.
- **Response:**
  - `200 OK`: Returns an array of dealerships.
  - `404 Not Found`: If no dealerships are found.

#### Get Vehicles Owned by User

- **URL:** `/api/user/vehicles`
- **Method:** `GET`
- **Description:** Retrieve vehicles owned by the authenticated user.
- **Response:**
  - `200 OK`: Returns an array of vehicles owned by the user.
  - `401 Unauthorized`: If the user is not authenticated.

#### Get Deals on a Certain Car

- **URL:** `/api/user/deals/:carId`
- **Method:** `GET`
- **Description:** Retrieve all deals on the specified car.
- **Parameters:**
  - `carId` (string, required): ID of the car to search for.
- **Response:**
  - `200 OK`: Returns an array of deals.
  - `404 Not Found`: If no deals are found.

### Dealership Endpoints

#### Add Car to Dealership

- **URL:** `/api/dealership/add-car`
- **Method:** `POST`
- **Description:** Add a new car to the dealership's inventory.
- **Request Body:**
  - `carId` (string, required): ID of the car to add.
- **Response:**
  - `200 OK`: Car added successfully.
  - `404 Not Found`: If the dealership is not found.

#### Add Deal to Dealership

- **URL:** `/api/dealership/add-deal`
- **Method:** `POST`
- **Description:** Add a new deal to the dealership's records.
- **Request Body:**
  - `dealId` (string, required): ID of the deal to add.
- **Response:**
  - `200 OK`: Deal added successfully.
  - `404 Not Found`: If the dealership is not found.

#### Get Sold Vehicles

- **URL:** `/api/dealership/sold-vehicles`
- **Method:** `GET`
- **Description:** Retrieve all vehicles sold by the dealership along with owner info.
- **Response:**
  - `200 OK`: Returns an array of sold vehicles.
  - `404 Not Found`: If the dealership is not found.
### Admin Endpoints

#### Login

- **URL:** `/api/admin/login`
- **Method:** `POST`
- **Description:** Authenticate admin and generate JWT token.
- **Request Body:**
  - `email` (string, required): Admin email.
  - `password` (string, required): Admin password.
- **Response:**
  - `200 OK`: Returns JWT token.
  - `401 Unauthorized`: If login credentials are incorrect.

#### Logout

- **URL:** `/api/admin/logout`
- **Method:** `GET`
- **Description:** Invalidate JWT token to log out admin.
- **Response:**
  - `200 OK`: Logged out successfully.
  - `401 Unauthorized`: If token is invalid.

#### Change Password

- **URL:** `/api/admin/change-password`
- **Method:** `POST`
- **Description:** Change admin password.
- **Request Body:**
  - `userId` (string, required): Admin ID.
  - `currentPassword` (string, required): Current password.
  - `newPassword` (string, required): New password.
- **Response:**
  - `200 OK`: Password changed successfully.
  - `401 Unauthorized`: If current password is incorrect.

### Error Responses

- `400 Bad Request`: Invalid request format.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Server encountered an unexpected condition.

### Error Responses

- `400 Bad Request`: Invalid request format.
- `401 Unauthorized`: Unauthorized access, invalid credentials, or missing authentication token.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Server encountered an unexpected condition.

## Additional Information

- All endpoints except for login and register require authentication via JWT token in the request headers.
- Make sure to handle errors and edge cases appropriately in your client-side applications.

- All endpoints except for login and register require authentication via JWT token in the request headers.
- Make sure to handle errors and edge cases appropriately in your client-side applications.
- Refer to the API documentation for each endpoint's specific requirements regarding request bodies, parameters, and responses.
- It's recommended to test the API endpoints using tools like Postman or curl to ensure they behave as expected.
- Keep the API documentation updated as you make changes or add new features to your API.
