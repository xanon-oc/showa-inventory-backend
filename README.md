# Shoes Management Dashboard - Backend

Welcome to the backend of the Shoes Management Dashboard! This section provides details on setting up and running the backend server for the application.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Create a `.env` file in the root of the `backend` directory and add the following environment variables:

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET=50f8175f19fe4f1b8b543e28123d26bbdb140fedf4dab0327b932f37b4091151
   JWT_REFRESH_SECRET=3ae08df898ab8bbc0615989e4676275eed6bd2e87a2771c557ea22b7d261d237775743eb17be44534b1c7ddd019adc380a3798738b8cb4d78e327d199704d0ef
   JWT_ACCESS_EXPIRES_IN=10d
   JWT_REFRESH_EXPIRES_IN=10s
   ```

   Replace `<username>`, `<password>`, `<cluster-url>`, and `<database-name>` with your MongoDB credentials.

4. Install dependencies:

   ```bash
   npm install
   ```

5. Build the TypeScript files:

   ```bash
   npm run build
   ```

6. Start the development server:

   ```bash
   npm run start:dev
   ```

   The backend server will be running at [http://localhost:5000](http://localhost:5000).

## Scripts

- `npm run build`: Compiles TypeScript files to the `dist/` directory.
- `npm run start:dev`: Starts the server in development mode with automatic restart.

## Linting and Formatting

- `npm run lint`: Lints the TypeScript files using ESLint.
- `npm run lint:fix`: Fixes linting issues automatically.
- `npm run prettier`: Formats the TypeScript files using Prettier.
- `npm run prettier:fix`: Fixes formatting issues automatically.

## Technologies Used

- Express.js: Web application framework for Node.js.
- MongoDB: NoSQL database for data storage.
- JWT (JSON Web Tokens): Securely authenticate users.
- Other libraries: bcrypt, cookie-parser, cors, dotenv, http-status, mongoose, zod.
