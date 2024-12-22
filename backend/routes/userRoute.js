import express from "express";
import {
  adminLogin,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js ";
import adminAuth from "../middleware/adminAuth.js";
import { listUsers, removeUser } from "../controllers/userControllers.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/list", listUsers);
userRouter.post("/remove", adminAuth, removeUser);

export default userRouter;
