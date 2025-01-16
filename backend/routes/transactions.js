import { Router } from "express";
import { transactionControllers } from "../controllers/transactionControllers.js";
import multer from "multer";
import { jwtAuthorization, emailVerified } from "../middlewares/index.js";

const upload = multer({ dest: "uploads/" });
const transactionRouter = Router();

transactionRouter.post(
  "/create",
  upload.single("billImage"),
  jwtAuthorization,
  emailVerified,
  transactionControllers.createTransactionController,
);

transactionRouter.delete(
  "/delete/:transactionId",
  jwtAuthorization,
  emailVerified,
  transactionControllers.deleteTransactionController,
);

transactionRouter.patch(
  "/update/:transactionId",
  upload.single("billImage"),
  jwtAuthorization,
  emailVerified,
  transactionControllers.updateTransactionController,
);

transactionRouter.get(
  "/get/:transactionId",
  jwtAuthorization,
  emailVerified,
  transactionControllers.getTransactionController,
);

transactionRouter.get(
  "/get-filtered/",
  jwtAuthorization,
  emailVerified,
  transactionControllers.getFilteredTransactionsController,
);

transactionRouter.post(
  "/add-money",
  jwtAuthorization,
  emailVerified,
  transactionControllers.addMoneyToWalletController,
);

transactionRouter.post(
  "/withdraw-money",
  jwtAuthorization,
  emailVerified,
  transactionControllers.withdrawMoneyFromWalletController,
);

transactionRouter.post(
  "/set-budget",
  jwtAuthorization,
  emailVerified,
  transactionControllers.setBudgetController,
);

export default transactionRouter;
