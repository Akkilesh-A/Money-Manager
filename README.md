# Money Management App - MERN

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

- [x]  signin
- [x]  signup
- [x]  addmoney - Admin can add money to verified user’s account only
- [x]  getConnection- To get connection details
- [x]  createConnection - To connect user to admin account
- [x]  updateConnection - To update connection and delete old connection

### User Routes

- [x]  signin
- [x]  signup
- [x]  getprofile - To get user’s profile
- [x]  customizetags - To add, delete, update tags
- [x]  sendmoney - An interface to record transaction between users (default tag - User/Friend)
- [x]  gettransactions - To get user’s transactions (Verify user)
- [x]  updateprofile - To update user’s profile
- [x]  bulk - To get filtered results of other users!
- [x]  getConnection- To verify admins and users account connection

### Middlewares

- [x]  adminAuthMiddleware - Session authentication
- [x]  userAuthMiddleware - Session authentication

---

## Schemas

### User Schema

- Name
- Email
- Password
- Balance
- Tags
- imgURL
- Admin connection status
- Admin Id

### Transactions Schema

- From - ref User Schema
- To
- DateTime
- Tag

### Admin Schema

- Name
- Email
- Password
- imgURL
- User connection status
- User Id
