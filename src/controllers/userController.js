const userModel = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY000;
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username,
        });
        const token = jwt.sign({
            email: result.email,
            id: result._id,
        }, SECRET_KEY);

        res.status(201).json({ user: result, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({email: email});
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const matchPassword = await bcryptjs.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id,
        }, SECRET_KEY);
        res.status(200).json({ message:"Login Successful",user: existingUser, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { signup, signin };