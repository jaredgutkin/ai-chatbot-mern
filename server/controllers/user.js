import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const useRegister = async (req, res) => {
    try {
        const { username, password } = req.body;

        const checkUser = await User.findOne({ username });

        if (checkUser) return res.status(400).json({
            message: "username already used"
        });

        const user = new User({ username });

        user.setPassword(password);

        await user.save();

        res.status(201).json({});

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

export const userSignIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username }).select("username password salt id");

        if (!user) return res.status(400).json({
            message: "User Not Found"
        });

        if (!user.validPassword(password)) return res.status(400).json({
            message: "Wrong Password"
        });

        const token = jwt.sign(
            { data: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24H" }
        );

        res.status(200).json({
            token,
            username,
            id: user._id
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};