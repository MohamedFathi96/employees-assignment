# Employee Management Backend

This is a simple Express backend app for employee management, following the MVC design pattern. It provides a RESTful API with CRUD operations for employees.

## Features

- Express.js server
- MVC structure (Models, Views, Controllers)
- CRUD API for employees (in-memory storage)

## Endpoints

- `GET /api/employees` - List all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```
2. Start the server:
   ```bash
   yarn start
   ```

## Project Structure

- `app.js` - Entry point
- `routes/` - Express route definitions
- `controllers/` - Request handlers
- `models/` - Data logic

## Note

This project uses in-memory storage for demonstration. For production, connect to a real database.
