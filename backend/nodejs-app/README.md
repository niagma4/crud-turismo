# Node.js CRUD Application

This project is a Node.js application that implements a RESTful API for managing activities and reservations in a tourism context. It uses Express for the server framework and MySQL for the database.

## Project Structure

```
nodejs-app
├── src
│   ├── controllers          # Contains the logic for handling requests
│   │   ├── actividadesController.js
│   │   └── reservasController.js
│   ├── middlewares          # Custom middleware functions
│   │   └── index.js
│   ├── routes               # Defines the API routes
│   │   ├── actividadesRoutes.js
│   │   └── reservasRoutes.js
│   ├── db.js                # Database connection logic
│   ├── app.js               # Initializes the Express application
│   └── server.js            # Entry point of the application
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd nodejs-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your database configuration:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   PORT=5000
   ```

## Usage

To start the server, run the following command:
```
npm start
```

The server will be running on `http://localhost:5000`.

## API Endpoints

### Actividades
- `GET /api/actividades` - Retrieve all activities
- `POST /api/actividades` - Create a new activity
- `PUT /api/actividades/:id` - Update an activity by ID
- `DELETE /api/actividades/:id` - Delete an activity by ID

### Reservas
- `GET /api/reservas` - Retrieve all reservations
- `POST /api/reservas` - Create a new reservation
- `PUT /api/reservas/:id` - Update a reservation by ID
- `DELETE /api/reservas/:id` - Delete a reservation by ID

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.