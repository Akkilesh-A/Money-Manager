import {
  responseMessages,
  responseUtil,
  uploadToCloudinary,
} from "../utils/index.js";
import { Transaction, User } from "../models/index.js";

const createTransactionController = async (req, res) => {
  const { userId, amount, description, tag, to } = req.body;
  const billImage = req.file;
  try {
    const imgURL = billImage
      ? await uploadToCloudinary.uploadTransactionPhotoToCloudinary(
          billImage.path,
        )
      : null;
    if (to) {
      const toUser = await User.findById(to);
      if (!toUser) {
        return responseUtil.errorResponse(res, 400, "To user not found");
      } else if (!toUser.isEmailVerified) {
        return responseUtil.errorResponse(res, 400, "To user is not verified");
      } else {
        if (toUser._id === userId) {
          return responseUtil.errorResponse(
            res,
            400,
            "You cannot send money to yourself",
          );
        } else {
          const transaction = await Transaction.create({
            userId,
            amount,
            description,
            tag,
            imgURL,
            to: toUser._id,
          });
          return responseUtil.successResponse(
            res,
            200,
            "Transaction created successfully",
            { transaction },
          );
        }
      }
    } else {
      const transaction = await Transaction.create({
        userId,
        amount,
        description,
        tag,
        imgURL,
      });
      return responseUtil.successResponse(
        res,
        200,
        "Transaction created successfully",
        { transaction },
      );
    }
  } catch (err) {
    return responseUtil.errorResponse(
      res,
      500,
      responseMessages.InternalServerError,
      { error: err.message },
    );
  }
};

const deleteTransactionController = async (req, res) => {
  const { transactionId } = req.params;
  const { userId } = req.body;
  try {
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) {
      return responseUtil.errorResponse(res, 400, "Transaction not found");
    }
    return responseUtil.successResponse(
      res,
      200,
      "Transaction deleted successfully",
      transaction,
    );
  } catch (error) {
    return responseUtil.errorResponse(
      res,
      500,
      responseMessages.InternalServerError,
    );
  }
};

const updateTransactionController = async (req, res) => {
  const { transactionId } = req.params;
  const { userId, amount, description, tag, to } = req.body;
  const transactionImage = req.file;

  try {
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return responseUtil.errorResponse(res, 400, "Transaction not found");
    }

    if (!transaction.userId.equals(userId)) {
      return responseUtil.errorResponse(
        res,
        403,
        "You are not authorized to update this transaction",
      );
    }

    const imgURL = transactionImage
      ? await uploadToCloudinary.uploadTransactionPhotoToCloudinary(
          transactionImage.path,
        )
      : transaction.imgURL;

    transaction.amount = amount;
    transaction.description = description;
    transaction.tag = tag;
    transaction.imgURL = imgURL;
    transaction.to = to;

    await transaction.save();

    return responseUtil.successResponse(
      res,
      200,
      "Transaction updated successfully",
      { transaction },
    );
  } catch (error) {
    console.error(error);
    return responseUtil.errorResponse(
      res,
      500,
      responseMessages.InternalServerError,
    );
  }
};

const getTransactionController = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return responseUtil.errorResponse(res, 400, "Transaction not found");
    }
    return responseUtil.successResponse(
      res,
      200,
      "Transaction fetched successfully",
      { transaction },
    );
  } catch (error) {
    return responseUtil.errorResponse(
      res,
      500,
      responseMessages.InternalServerError,
    );
  }
};

const getFilteredTransactionsController = async (req, res) => {
  console.log("lol");
  const { userId } = req.body;
  console.log(req.query);
  const { startDate, endDate, tag, minAmount, maxAmount } = req.query;
  console.log(startDate, endDate, tag, minAmount, maxAmount);
  try {
    const query = { userId };

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    if (tag) query.tag = tag;

    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = Number(minAmount);
      if (maxAmount) query.amount.$lte = Number(maxAmount);
    }

    console.log("Query:", query);

    const transactions = await Transaction.find(query);

    return responseUtil.successResponse(
      res,
      200,
      "Filtered transactions fetched successfully",
      {
        transactions,
      },
    );
  } catch (error) {
    console.error("Error in getFilteredTransactionsController:", error);
    return responseUtil.errorResponse(
      res,
      500,
      responseMessages.InternalServerError,
    );
  }
};

const addMoneyToWalletController = async (req, res) => {
  const { userId, amount } = req.body;
  if (!amount) {
    return responseUtil.errorResponse(res, 400, "Amount is required");
  }
  try {
    const user = await User.findById(userId);
    user.walletBalance += Number(amount);
    await user.save();
    await Transaction.create({
      userId,
      amount,
      description: "Added money to wallet",
      tag: "Wallet",
      imgURL: null,
    });
    return responseUtil.successResponse(
      res,
      200,
      "Money added to wallet successfully",
      { user },
    );
  } catch (error) {
    return responseUtil.errorResponse(
      res,
      500,
      responseMessages.InternalServerError,
      { error: error.message },
    );
  }
};

const withdrawMoneyFromWalletController = async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.walletBalance < amount) {
      return responseUtil.errorResponse(res, 400, "Insufficient balance");
    }
    user.walletBalance -= amount;
    await user.save();
    await Transaction.create({
      userId,
      amount,
      description: "Withdrawn money from wallet",
      tag: "Wallet",
      imgURL: null,
    });
    return responseUtil.successResponse(
      res,
      200,
      "Money withdrawn from wallet successfully",
      { user },
    );
  } catch (error) {
    return responseUtil.errorResponse(
      res,
      500,
      responseMessages.InternalServerError,
      { error: error.message },
    );
  }
};

export const transactionControllers = {
  createTransactionController,
  deleteTransactionController,
  updateTransactionController,
  getTransactionController,
  getFilteredTransactionsController,
  addMoneyToWalletController,
  withdrawMoneyFromWalletController,
};
