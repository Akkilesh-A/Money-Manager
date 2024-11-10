# Money Manager(MERN)

## ⚙️Tech Stack

### 🖥️ Frontend

| Framework | React.js |
| --- | --- |
| CSS framework | Tailwind CSS |
| UI Library | ShadCN |
| Build Tool | Vite |

### 🔧 Backend

| Server, Routing | Express.js |
| --- | --- |
| Language | Node.js |
| Input Validation | Zod |
| Database Connection | Mongoose |
| Session Authentication | JWT |
| Password Hashing  | Bcrypt |
| Assets cloud storage | Cloudinary  |
| Image uploads | Multer |

## 🔗Routes

### 🖥️ Frontend

| **Path** | **Component** |
| --- | --- |
| / | **`<SignInPage />`** |
| /signup | **`<SignUpPage />`** |
| /signin | **`<SignInPage />`** |
| /home | **`<LandingPage />`** |
| /profile | **`<ProfilePage />`** |
| /tags | **`<TagsPage />`** |
| /transactions | **`<SpendingsPage />`** |
| /send-money | **`<SendMoneyPage />`** |

### 🔧 Backend

| **HTTP Method** | **Endpoint** | **Controller Function** |
| --- | --- | --- |
| POST | /signin | `signIn` |
| POST | /signup | `signUp` |
| GET | /get-user-tags | `getUserTags` |
| POST | /add-new-tag | `addUserTag` |
| DELETE | /delete-user-tag | `deleteUserTag` |
| GET | /get-user-data | `getUserProfile` |
| POST | /update-profile | `updateProfile` |
| GET | /get-all-users | `getAllUsers` |
| GET | /get-user-spendings | `getUserSpendings` |
| POST | /create-spending-record | `createTransactionRecord` |

## 📊 Database Design

### **Transactions Schema**

| **Attributes** | **Data Type** |
| --- | --- |
| from | ObjectId (ref: User) |
| to | ObjectId (ref: User) |
| amount | Number |
| title | String |
| description | String |
| dateTime | Date |
| tag | String |
| receiptURL | String |

### **User Schema**

| **Attributes** | **Data Type** |
| --- | --- |
| name | String |
| email | String |
| password | String |
| imgURL | String |
| accountBalance | Number |
| phoneNumber | String |
| tags | Array of Strings |
| tagColors | Array of Strings |
| transactions | Array of ObjectIds (ref: Transaction) |
| isChild | Boolean |
| childConnectionStatus | Boolean |
| children | Array of ObjectIds (ref: User) |
| parentConnectionStatus | Boolean |
| parent | ObjectId (ref: User) |

# 🤑Features


- [x]  Tags - Transactions can be tagged with custom user tags
- [ ]  Redux Store - To store session data 
- [ ]  Filters - Filter transactions based on tags, dates, etc…
- [x]  Email Verification - Verification of users while signing up
- [ ]  Monthly Mail - Monthly mail with that month’s spendings and transaction details as a csv export!
