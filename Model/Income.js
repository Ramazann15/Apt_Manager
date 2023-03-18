const mongoose = require("mongoose");

const schema = mongoose.Schema;

const IncomeSchema = new schema({
    date:{
        type:String,
        default:Date.now,
    },
    bringer:{
        type:String,
        required : true,
        ref: 'Person',
    },
    amount:{
        type:Number,
        required : true,
    },
    receiver:{
        type:String,
        required : true,
    },

    bringerMonth:{
        type:String,
        required : true,
    }

   
})


const Income = mongoose.model("Income",IncomeSchema);
module.exports = Income;