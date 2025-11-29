import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: [true, "please provide the unsername"],
        unique: [true, "this username already exist"],
    },

    email: {
        type: String,
        require: [true, "Please provide the email"],
        unique: [true, "this email already exist"],
    },

    password: {
        type: String,
        require: [true, "Please provide the password"],
    },

    otp: {
        type: String,
        default: ""
    },

    isLoggedIn: {
        type: Boolean,
        default: false
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    expireOtp: {
        type: Date
    },
    
    OtpAttempts: {
        type: String,
        default: 0
    },

}, { timestamps: true })



// HASH PASSWORD STATICS FUNCTION
userSchema.statics.hashPassword = async function (Password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(Password, salt)
}

// COMPARE PASSWORD METHODS
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!candidatePassword || !this.password) {
        throw new Error('Missing candidate password or stored hash');
    }
    return bcrypt.compare(candidatePassword, this.password);
};


// JWT TOKEN GENERATOR
userSchema.methods.jwtGenerator = async function () {
    const Token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return Token;
}


// Defining Models 
export const user = mongoose.model.user || mongoose.model("user", userSchema)