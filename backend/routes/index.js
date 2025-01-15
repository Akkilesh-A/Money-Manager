import { Router } from "express";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import transactionRouter from "./transactions.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("apiv1.ejs");
});

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/transactions", transactionRouter);

export { router };
