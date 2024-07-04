# Money Management App - MERN

A comprehensive MERN stack money management web app with admin and user roles!

# Backend

## ⚙️Tech Stack

| Server, Routing | Express.js |
| --- | --- |
| Language | Node.js |
| Input Validation | Zod |
| Database Connection | Mongoose |
| Session Authentication | JWT |
| Password Hashing  | Bcrypt |
| Cloud storage | Cloudinary  |
| Image uploads | Multer |

---

## Routes

### Admin Routes

- [ ]  signin
- [ ]  signup
- [ ]  addmoney - Admin can add money to verified user’s account only
- [ ]  verification - To verify admins and users account connection and get user’s profile
- [ ]  gettransactions - To get transaction history of user (Verify admin user connection middleware)

### User Routes

- [x]  signin
- [x]  signup
- [x]  getprofile - To get user’s profile
- [x]  customizetags - To add, delete, update tags
- [x]  sendmoney - An interface to record transaction between users (default tag - User/Friend)
- [x]  gettransactions - To get user’s transactions (Verify user)
- [ ]  getweeklytransactions - To get user’s weekly transactions
- [x]  updateprofile - To update user’s profile

### Middlewares

- [x]  adminAuthMiddleware - Session authentication
- [x]  userAuthMiddleware - Session authentication
- [ ]  adminUserConnection - To verify whether particular admin is connected with the user account

---

## Schemas

### User Schema

- Name
- Email
- Password
- Balance
- Tags
- imgURL

### Transactions Schema

- From - ref User Schema
- To
- DateTime
- Tag

### Admin Schema

- Name
- Email
- Password
- User
- imgURL

