"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const userModel = require("./user.model");
const responseBase = require("../../utils/responseBase");
// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const queryParams = req.query || {};
        const filter = {};
        if ("email" in queryParams) {
            filter.email = { $regex: `^${queryParams.email}` };
        }
        // strictPopulate: false — იცავს populate შეცდომას, თუ ref არასწორია
        const users = await userModel.find(filter).populate({
            path: "posts",
            select: "title content",
            strictPopulate: false,
        });
        res.json(responseBase.success(users));
    }
    catch (error) {
        res
            .status(500)
            .json(responseBase.fail("Failed to fetch users", error.message));
    }
};
// Create user
exports.createUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json(responseBase.fail("User already exists"));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            userName,
            email,
            password: hashedPassword,
        });
        res
            .status(201)
            .json(responseBase.success(newUser, "User created successfully"));
    }
    catch (error) {
        res
            .status(500)
            .json(responseBase.fail("Failed to create user", error.message));
    }
};
// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if (!user)
            return res.status(404).json(responseBase.fail("User not found"));
        res.json(responseBase.success(user));
    }
    catch (error) {
        res
            .status(500)
            .json(responseBase.fail("Failed to fetch user", error.message));
    }
};
// Delete user
exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser)
            return res.status(404).json(responseBase.fail("User not found"));
        res.json(responseBase.success(deletedUser, "User deleted successfully"));
    }
    catch (error) {
        res
            .status(500)
            .json(responseBase.fail("Failed to delete user", error.message));
    }
};
// Update user
exports.updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!updatedUser)
            return res.status(404).json(responseBase.fail("User not found"));
        res.json(responseBase.success(updatedUser, "User updated successfully"));
    }
    catch (error) {
        res
            .status(500)
            .json(responseBase.fail("Failed to update user", error.message));
    }
};
//# sourceMappingURL=user.service.js.map