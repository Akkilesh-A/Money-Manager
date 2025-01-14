## Tech Stack
| Backend | Middlewares | Other Tools and Libraries | 		
| --- | --- | --- |
| Express.js 🚀 | Authentication 🔒 | JWT Secret Key 🔑 |
| Node.js 🌐 | Rate Limiting ⏳ | Express Rate Limiter ⏱️ |
| MongoDB 🍃 | Error Handling ⚠️ | Dotenv 🗝️ |
| Mongoose 🐱 | File Upload 📂 | EJS 🖥️ |
| Zod 🔏 | Admin 👑 | Prettier ✨ |
| JWT 🔑 | Cloudinary Upload ☁️ | |
| Bcrypt 🔐 | | |
| Cloudinary ☁️ | | |
| Multer 📤 | | |
| Swagger 📜 | | |
| Nodemailer 📧 | | |

## Folder Structure

```markdown
backend/
├── controllers/            # Controllers for handling requests and responses
│   ├── authController.js
│   ├── userController.js
│   └── transactionController.js
│
├── models/                 # Mongoose models (schemas)
│   ├── userModel.js
│   └── transactionModel.js
│
├── routes/                 # API routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── transactionRoutes.js
│
├── middlewares/            # Middlewares for validation, authentication, etc.
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── rateLimitMiddleware.js
│   └── uploadMiddleware.js
│
├── config/                 # Configuration files (e.g., environment variables)
│   └── config.js
│
├── services/               # Logic for business rules (e.g., OTP generation, password hashing)
│   ├── authService.js
│   └── userService.js
│
├── utils/                  # Utility functions (e.g., JWT token verification, email sending)
│   ├── jwtUtils.js
│   ├── emailUtils.js
│   └── cloudinaryUtils.js
│
├── swagger/                # Swagger documentation files
│   └── swagger.js
│
├── uploads/                # File uploads (e.g., bill images)
│   └── billUploads/
│
├── views/                  # EJS views for rendering HTML pages (if necessary)
│   └── status.ejs
│
├── .env                    # Environment variables
├── server.js               # Main entry point for the server
└── package.json            # Project dependencies and scripts

```

## User Routes

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| GET | /api/v1/user/me | Get the details of the authenticated user. | Yes |
| PUT | /api/v1/user/update | Update user profile (name, email, password). | Yes |
| PUT | /api/v1/user/change-password | Change the user's password. | Yes |
| POST | /api/v1/user/upload-avatar | Upload a profile picture for the user. | Yes |

---

## Auth Routes

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| POST | /api/v1/auth/signup | Register a new user. | No |
| POST | /api/v1/auth/verify-otp | Verify the OTP sent to the user's email. | No |
| POST | /api/v1/auth/signin | Log in the user and issue a JWT token. | No |
| POST | /api/v1/auth/forgot-password | Send OTP for password reset. | No |
| POST | /api/v1/auth/reset-password | Reset the user's password using OTP. | No |

---

## Transaction Routes

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| GET | /api/v1/transaction | Get a list of all transactions for the user. | Yes |
| POST | /api/v1/transaction/create | Create a new transaction (send/receive money). | Yes |
| PUT | /api/v1/transaction/update/:id | Update a transaction (e.g., mark as completed). | Yes |
| DELETE | /api/v1/transaction/delete/:id | Delete a transaction. | Yes |
| GET | /api/v1/transaction/filters | Filter transactions by date, amount, or tag. | Yes |

---

## Other Routes

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| GET | /api/v1/status | Check system status (e.g., "All systems operational"). | No |
| POST | /api/v1/upload/bill | Upload a bill image for a transaction. | Yes |
| GET | /api/v1/export/transactions/csv | Export transactions as CSV. | Yes |

---

## Middleware List

| Middleware | Description |
| --- | --- |
| **Authentication Middleware** | Verifies JWT token to authenticate the user. |
| **Rate Limiting Middleware** | Limits the number of requests from a single IP to prevent abuse (e.g., brute-force attacks). |
| **Error Handling Middleware** | Catches unhandled errors and sends a proper response to the client. |
| **File Upload Middleware** | Handles file uploads, e.g., for bill images, using packages like Multer. |
| **Admin Middleware** | Restricts access to specific routes for admin users only. |
| **Cloudinary Upload Middleware** | Handles file uploads to Cloudinary for storing images like user avatars and bills. |