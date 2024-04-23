const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');



async function userSignUpController(req, res) {
    try {
        const { name, email, password, profilePic } = req.body;

        if (!email) {
            throw new Error("Please provide an email.");
        }

        if (!password) {
            throw new Error("Please provide a password.");
        }

        if (!name) {
            throw new Error("Please provide a name.");
        }

        // Check if the email already exists in the database
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error("Email already exists.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with hashed password
        
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            profilePic: profilePic || null,
            role: "GENERAL"
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
