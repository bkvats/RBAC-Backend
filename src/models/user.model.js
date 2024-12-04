import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    empId: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

// creating mongoDb middleware to hash password
userSchema.pre("save", async function(next) {
    // Password should only be hashed when it is changed i.e either created a new or updating the existing one.
    if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 8);
    next();
});

// method to verify password
userSchema.methods.verifyPassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
}

// method to generate access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

// method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
}
export const User = mongoose.model("User", userSchema);