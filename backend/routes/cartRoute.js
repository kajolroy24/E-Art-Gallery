import express from "express";
import {
  addTocart,
  getUserCart,
  updateCart,
} from "../controllers/cartControlles.js";
import authUser from "../middleware/auth.js";


const cartRouter = express.Router();
// console.log("cart");

cartRouter.post("/get",authUser, getUserCart);
cartRouter.post("/add",authUser, addTocart);
cartRouter.post("/update",authUser, updateCart);
export default cartRouter;
