const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ExpenseSchema = new schema({
    electricity_bill:{
        type:Number,
        required : true,
    },
    elevator_maintenance:{
        type:Number,
        required : true,
    },
    amount_collected:{
        type:String,
        required : true,
    },
    total:{
        type:Number,
        required : true,
    },
    date:{
        type:String,
        required : true,
    },
    extra_expenses:{
        type: Map,
        of: Number
    },
    ExpenseMonth:{
        type:String,
        required : true,
    },
    


})

const Expense = mongoose.model("Expense",ExpenseSchema);
module.exports = Expense;