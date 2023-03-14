const mongoose = require("mongoose");

const schema = mongoose.Schema;

const TotalAmount = new schema({
    date:{
        type:String,
        default:Date.now,
    },
    amount:{
        type:Number,
        default:0,
    },



   
})

const totalAmount = mongoose.model("TotalAmount",TotalAmount);
module.exports = totalAmount;