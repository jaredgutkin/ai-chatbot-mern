import express from "express";
import { body } from "express-validator";
import { useRegister, userSignIn } from "../controllers/user.js";
import { tokenAuth } from "../middleware/token.js";
import { validate } from "../utils/validator.js";

const router = express.Router();

router.post(
    "/signup",
    body("username")
        .exists().withMessage("username is required")
        .isLength({ min: 6 }).withMessage("username must have at least 6 characters")
        .isLength({ max: 15 }).withMessage("username is maximum of 15 characters"),
    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 8}).withMessage("password must be at least 8 characters"),
    validate,
    useRegister
);

router.post(
    "/signin",
    body("username")
        .exists().withMessage("username is required")
        .isLength({ min: 6 }).withMessage("username must have at least 6 characters"),
    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 8}).withMessage("password must be at least 8 characters"),
    validate,
    userSignIn
);

router.get(
    "/check-token",
    tokenAuth, 
    (req, res) => res.status(200).json({
        username: req.user.username
    })
);

export default router;