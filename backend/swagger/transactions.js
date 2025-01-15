/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - userId
 *         - amount
 *         - description
 *         - tag
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID of the user who created the transaction
 *         amount:
 *           type: number
 *           description: Transaction amount
 *         description:
 *           type: string
 *           description: Transaction description
 *         tag:
 *           type: string
 *           description: Category tag for the transaction
 *         imgURL:
 *           type: string
 *           nullable: true
 *           description: URL of the bill/receipt image
 *         to:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: ID of the recipient user (for transfers)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * paths:
 *   /api/v1/transactions/create:
 *     post:
 *       tags: [Transactions]
 *       summary: Create a new transaction
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               required:
 *                 - userId
 *                 - amount
 *                 - description
 *                 - tag
 *               properties:
 *                 userId:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 description:
 *                   type: string
 *                 tag:
 *                   type: string
 *                 to:
 *                   type: string
 *                 billImage:
 *                   type: string
 *                   format: binary
 *       responses:
 *         200:
 *           description: Transaction created successfully
 *         400:
 *           description: Invalid input or recipient not found
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/transactions/delete/{transactionId}:
 *     delete:
 *       tags: [Transactions]
 *       summary: Delete a transaction
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: transactionId
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - userId
 *               properties:
 *                 userId:
 *                   type: string
 *       responses:
 *         200:
 *           description: Transaction deleted successfully
 *         400:
 *           description: Transaction not found
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/transactions/update/{transactionId}:
 *     patch:
 *       tags: [Transactions]
 *       summary: Update a transaction
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: transactionId
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               required:
 *                 - userId
 *               properties:
 *                 userId:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 description:
 *                   type: string
 *                 tag:
 *                   type: string
 *                 to:
 *                   type: string
 *                 transactionImage:
 *                   type: string
 *                   format: binary
 *       responses:
 *         200:
 *           description: Transaction updated successfully
 *         400:
 *           description: Transaction not found
 *         403:
 *           description: Not authorized to update this transaction
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/transactions/get/{transactionId}:
 *     get:
 *       tags: [Transactions]
 *       summary: Get a specific transaction
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: transactionId
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Transaction fetched successfully
 *         400:
 *           description: Transaction not found
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/transactions/get-filtered:
 *     get:
 *       tags: [Transactions]
 *       summary: Get filtered transactions
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: query
 *           name: startDate
 *           schema:
 *             type: string
 *             format: date
 *           description: Filter transactions from this date
 *         - in: query
 *           name: endDate
 *           schema:
 *             type: string
 *             format: date
 *           description: Filter transactions until this date
 *         - in: query
 *           name: tag
 *           schema:
 *             type: string
 *           description: Filter by transaction tag
 *         - in: query
 *           name: minAmount
 *           schema:
 *             type: number
 *           description: Minimum transaction amount
 *         - in: query
 *           name: maxAmount
 *           schema:
 *             type: number
 *           description: Maximum transaction amount
 *       responses:
 *         200:
 *           description: Filtered transactions fetched successfully
 *         500:
 *           description: Internal server error
 */

export default {};
