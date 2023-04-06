const mongoose = require("mongoose");

const schema = mongoose.Schema;

const TotalAmount = new schema({

    amount:{
        type:Number,
        default:0,
    },
    Income:{
        type:Number,
        default:0,
    },
    Expense:{
        type:Number,
        default:0,
    },
})

const totalAmount = mongoose.model("TotalAmount",TotalAmount);
module.exports = totalAmount;