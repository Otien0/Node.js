const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: Number,
        required: [true, "Please Enter Your Account Number"],
        unique: true,
    },
    accountType: {
        type: String,
        required: [true, "Please Enter Your Account Type"],
    },
    accountBalance: {
        type: Number,
        required: [true, "Please Enter Your Account Balance"],
    },
    accountCurrency: {
        type: String,
        required: [true, "Please Enter Your Account Currency"],
    },
    accountOwner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Account", accountSchema);

//     expiresIn: process.env.JWT_EXPIRES_TIME,
//   });
// };
//
