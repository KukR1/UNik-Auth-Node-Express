# UNik-Auth Node/Express

This project is a simple authentication server built with Node.js and Express. It exposes endpoints for user registration and login, and has middleware in place to protect certain routes requiring user authentication.

## Features

- User Registration: New users can register by providing an email, username, and password. See [`register`](src/controllers/authentication.ts) function.
- User Login: Registered users can login using their email and password. See [`login`](src/controllers/authentication.ts) function.
- User Management: The API provides endpoints to get all users, delete a user, and update a user. These operations are protected and require user authentication. See [`getAllUsers`](src/controllers/users.ts), [`deleteUser`](src/controllers/users.ts), and [`updateUser`](src/controllers/users.ts) functions.

## Getting Started

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install`.
3. Start the server using `npm start`.

## Environment Variables

The project uses environment variables for configuration. Create a `.env` file in the root directory and set the following variables:

- `MONGODB_URL`: The connection string for your MongoDB database.

## API Endpoints

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login a user.
- `GET /users`: Get all users (requires authentication).
- `DELETE /users/:id`: Delete a user (requires authentication and ownership).
- `PATCH /users/:id`: Update a user (requires authentication and ownership).

## Testing

Currently, the project does not have any tests specified. You can add tests in the `test` script in the [package.json](package.json) file.

## Contributing

Contributions are welcome. Please make sure to update tests as appropriate.

## License

This project is licensed under the ISC License.
