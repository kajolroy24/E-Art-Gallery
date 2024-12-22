import express from "express";

import adminAuth from "../middleware/adminAuth.js";
import {
  listMembers,
  registerMember,
  removeMember,
} from "../controllers/communityControlles.js";
import authUser from "../middleware/auth.js";

const communityRouter = express.Router();
communityRouter.post("/member",authUser, registerMember);
communityRouter.get("/listmembers",adminAuth,  listMembers);
communityRouter.post("/removemember", adminAuth, removeMember);

export default communityRouter;
