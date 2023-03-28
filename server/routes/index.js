import express from "express";
import userRoute from "./user.js";
import chatRoute from "./chat.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/chats", chatRoute);

export default router;