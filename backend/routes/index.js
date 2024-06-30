import { Router } from "express";
import userRouter from "./user.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("apiv1.ejs");
});

router.use("/user", userRouter);

export { router };
