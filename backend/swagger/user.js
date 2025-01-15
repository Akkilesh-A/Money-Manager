/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - name
 *         - color
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the tag
 *         color:
 *           type: string
 *           description: Color code for the tag (hex format)
 *           example: "#FF6B6B"
 *
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phoneNumber
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's hashed password
 *         phoneNumber:
 *           type: string
 *           description: User's phone number
 *         isEmailVerified:
 *           type: boolean
 *           default: false
 *           description: Email verification status
 *         otp:
 *           type: string
 *           nullable: true
 *           description: One-time password for email verification
 *         otpExpiry:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Expiration time for OTP
 *         walletBalance:
 *           type: number
 *           default: 0
 *           description: User's current wallet balance
 *         monthlyBudget:
 *           type: number
 *           default: 0
 *           description: User's monthly budget limit
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *           description: User's transaction tags
 *         imgURL:
 *           type: string
 *           nullable: true
 *           description: URL to user's profile image
 *
 * paths:
 *   /api/v1/auth/signup:
 *     post:
 *       tags: [Auth]
 *       summary: Register a new user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - email
 *                 - password
 *                 - confirmPassword
 *                 - phoneNumber
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                   format: password
 *                 confirmPassword:
 *                   type: string
 *                   format: password
 *                 phoneNumber:
 *                   type: string
 *       responses:
 *         200:
 *           description: User created successfully
 *         400:
 *           description: User already exists or invalid input
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/auth/verify-otp:
 *     post:
 *       tags: [Auth]
 *       summary: Verify user's email with OTP
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - userId
 *                 - otp
 *               properties:
 *                 userId:
 *                   type: string
 *                 otp:
 *                   type: string
 *       responses:
 *         200:
 *           description: OTP verified successfully
 *         400:
 *           description: Invalid OTP or user not found
 *
 *   /api/v1/auth/signin:
 *     post:
 *       tags: [Auth]
 *       summary: Login user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                   format: password
 *       responses:
 *         200:
 *           description: User signed in successfully
 *         400:
 *           description: Invalid credentials or user not verified
 *
 *   /api/v1/auth/forgot-password:
 *     post:
 *       tags: [Auth]
 *       summary: Send password reset OTP
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *       responses:
 *         200:
 *           description: OTP sent successfully
 *         400:
 *           description: User not found
 *
 *   /api/v1/user/profile:
 *     get:
 *       tags: [User]
 *       summary: Get user profile
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: body
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Profile fetched successfully
 *         500:
 *           description: Internal server error
 *
 *     patch:
 *       tags: [User]
 *       summary: Update user profile
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 phoneNumber:
 *                   type: string
 *                 profileImage:
 *                   type: string
 *                   format: binary
 *       responses:
 *         200:
 *           description: Profile updated successfully
 *         400:
 *           description: User not found
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/user/profile-image:
 *     post:
 *       tags: [User]
 *       summary: Upload profile image
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               required:
 *                 - userId
 *                 - profileImage
 *               properties:
 *                 userId:
 *                   type: string
 *                 profileImage:
 *                   type: string
 *                   format: binary
 *       responses:
 *         200:
 *           description: Profile picture updated successfully
 *         400:
 *           description: User not found
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/auth/change-password:
 *     post:
 *       tags: [Auth]
 *       summary: Change user password
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - userId
 *                 - password
 *                 - newPassword
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: ID of the user
 *                 password:
 *                   type: string
 *                   format: password
 *                   description: Current password
 *                 newPassword:
 *                   type: string
 *                   format: password
 *                   description: New password to set
 *             example:
 *               userId: "507f1f77bcf86cd799439011"
 *               password: "currentPassword123"
 *               newPassword: "newPassword123"
 *       responses:
 *         200:
 *           description: Password changed successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: "Password changed successfully!"
 *         400:
 *           description: Invalid current password
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Invalid password!"
 *         401:
 *           description: Unauthorized - Invalid or missing token
 *         500:
 *           description: Internal server error
 */

export default {};
