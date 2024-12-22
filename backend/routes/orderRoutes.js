import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import {
  allOrders,
  placeOrder,
  // placeOrderStripe,
  updateStatus,
  userOrders,
  // verifyStripe,
} from "../controllers/orderControlles.js";

const orderRouter = express.Router();
//Admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
//Payment features
orderRouter.post("/place", authUser, placeOrder);
// orderRouter.post("/stripe", authUser, placeOrderStripe);
//User Features
orderRouter.post("/userorders", authUser, userOrders);
// verify payment
// orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
