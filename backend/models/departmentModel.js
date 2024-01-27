const mongoose = require("mongoose");
const validator = require("validator");

const departmentSchema = new mongoose.Schema({
 
    name: {
        type: String,
        unique: true,
        required: [true, "Please Enter Department name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [2, "Name should have more than 4 characters"],
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', required: true 
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("Department", departmentSchema);
