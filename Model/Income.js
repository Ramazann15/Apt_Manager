const mongoose = require("mongoose");

const schema = mongoose.Schema;

const IncomeSchema = new schema({
    income_date:{
        type:String,
        default:Date.now,
    },
    bringer:{
        type:mongoose.Schema.Types.ObjectId,
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