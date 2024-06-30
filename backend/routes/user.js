import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("User route is working");
});

export default userRouter;
