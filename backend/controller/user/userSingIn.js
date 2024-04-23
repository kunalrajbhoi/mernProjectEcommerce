const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide an email.");
        }

        if (!password) {
            throw new Error("Please provide a password.");
        }

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found.");
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new Error("Incorrect password.");
        } else {
            // Generate JWT token
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

        
            const tokenOption = {
                httpOnly: true,
                secure: true,
                
            };
            
         
            res.cookie("token", token, tokenOption).json({
                message: "Login successful",
                data: token,
                success: true,
                error: false
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
