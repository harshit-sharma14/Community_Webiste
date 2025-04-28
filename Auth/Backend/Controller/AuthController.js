const bcrypt = require('bcrypt');
const users = require('../Models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await users.findOne({ email }); // Changed 'user' to 'users'
        if (user) {
            return res.status(409)
                .json({ message: "User  already exists, please login", success: false }); // Fixed spelling
        }
        const new_user = new users({ name, email, password });
        new_user.password = await bcrypt.hash(password, 10);
        await new_user.save();
        res.status(201)
            .json({ message: "SignUp Successful", success: true }); // Fixed spelling
    } catch (e) {
        console.error(e); // Log the error for debugging
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email }); // Changed 'user' to 'users'
        if (!user) {
            return res.status(403)
                .json({ message: "Auth Failed", success: false }); // Fixed spelling
        }
        const isPass = await bcrypt.compare(password, user.password);
        if (!isPass) {
            return res.status(403)
                .json({ message: "Auth Failed", success: false }); // Fixed spelling
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200)
            .json({ message: "Login Successful", success: true, jwtToken, email, name: user.name }); // Fixed spelling
    } catch (e) {
        console.error(e); // Log the error for debugging
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
}

module.exports = { signup, login };