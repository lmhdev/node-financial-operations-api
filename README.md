# Financial Back-Office Automation System

This project is designed to simplify financial operations and enhance business management, offering features for user authentication, invoice and expense management, task scheduling, email notifications, and user activity logging.

## Features

### 1. User Authentication

- Secure user login using JSON Web Tokens (JWT) with a token expiration of 7 days.
- Middleware for protecting routes and ensuring only authenticated users have access.

### 2. Invoice Management

- Create, update, delete, and retrieve invoices.
- Invoice fields include client ID, description, amount, and due date.
- Integration with AMS for client data.
- Automatic invoicing at the beginning of each week using `node-cron`.

### 3. Expense Management

- Create, update, delete, and retrieve expenses.
- Expense fields include client ID, description, amount, and date.
- Integration with CRM for client data.

### 4. Task Scheduling

- Automated invoicing task scheduled to run at the beginning of each week.
- Uses `node-cron` for scheduling tasks.

### 5. Email Notifications

- Email notifications for various actions using Nodemailer.
- Sends emails to clients upon invoice creation with details of the invoice.

### 6. User Activity Logging

- Tracks user actions such as login, invoice creation, expense creation, and stores them in an activity log.
- Provides an endpoint to retrieve user activity logs.

## Project Structure

```
/controllers      - Contains the logic for handling requests and interacting with the models.
/middleware       - Contains middleware for authentication and tenant identification.
/models           - Defines the Sequelize models for Users, Invoices, Expenses, and Activity Logs.
/routes           - Defines the routes for authentication, invoices, expenses, and activity logs.
/schedulers       - Contains the cron job definitions for scheduled tasks.
/services         - Contains services for data integration.
/config           - Configuration files for Nodemailer and other settings.
```

## Endpoints

### User Authentication

- **POST /api/auth/login**: Authenticates a user and returns a JWT token.

### Invoice Management

- **POST /api/invoices**: Creates a new invoice.
- **GET /api/invoices**: Retrieves a paginated list of invoices.
- **PUT /api/invoices/:id**: Updates an existing invoice.
- **DELETE /api/invoices/:id**: Deletes an invoice.

### Expense Management

- **POST /api/expenses**: Creates a new expense.
- **GET /api/expenses**: Retrieves a paginated list of expenses.
- **PUT /api/expenses/:id**: Updates an existing expense.
- **DELETE /api/expenses/:id**: Deletes an expense.

### User Activity Logging

- **GET /api/activity-logs**: Retrieves a list of user activity logs.

## Testing

Use the following `curl` commands to test the API endpoints:

**User Authentication:**

```bash
curl -X POST http://localhost:4567/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "password"}'
```

**Create Invoice:**

```bash
curl -X POST http://localhost:4567/api/invoices \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_jwt_token" \
     -d '{"clientId": 1, "description": "Invoice for Client A", "amount": 1200.50, "dueDate": "2024-07-31"}'
```

**Get Invoices:**

```bash
curl -X GET http://localhost:4567/api/invoices \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_jwt_token"
```
