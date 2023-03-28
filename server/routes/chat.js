import express from "express";
import { tokenAuth } from "../middleware/token.js";
import { chatCompletion } from "../controllers/chat.js";

const router = express.Router();

router.post("/", tokenAuth, chatCompletion);

export default router;