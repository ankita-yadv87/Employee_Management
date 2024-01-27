const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const employeeSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    name: { 
        type: String, 
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [3, "Name should have more than 4 characters"],
    },
    location: { 
        type: String, 
        required: true 
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Department' 
        },
   
    role: {
        type: String,
        default: "employee",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

employeeSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// JWT TOKEN
employeeSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare Password

employeeSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
employeeSchema.methods.getResetPwdToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and just adding resetPasswordToken to employeeSchema but not saving yet to user schema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };

module.exports = mongoose.model("Employee", employeeSchema);
