const Income = require("../Model/Income");
const Expense = require("../Model/Expense");
const Total = require("./GetTotalIncomeAndExpense")
const YearTotal = require("../Model/TotalAmount")


exports.getTotalIncome = async (req,res)=>{
    const getAmount = await Income.find({bringerMonth : req.body.month}).select({"amount": 1 , "_id":0})
    const amount = Total.getTotalIncomeAndExpense(getAmount ,"TotalIncome")

    res.send(JSON.stringify(amount))
    res.status(200)
   
}

exports.getTotalExpense = async (req,res)=>{
    const getExpense = await Expense.find({ExpenseMonth : req.body.month}).select({"total": 1 , "_id":0})
    const expense =  Total.getTotalIncomeAndExpense(getExpense)


    res.send(JSON.stringify(expense))
    res.status(200)
    
}


exports.getaccumulating =  async(req,res)=>{
    const getAmount = await Income.find({bringerMonth : req.body.month}).select({"amount": 1 , "_id":0})
    const getExpense = await Expense.find({ExpenseMonth : req.body.month}).select({"total": 1 , "_id":0})

    const expense =  Total.getTotalIncomeAndExpense(getExpense)
    const amount =  Total.getTotalIncomeAndExpense(getAmount ,"TotalIncome")

  
    res.send(JSON.stringify(amount  - expense) );
    res.status(200)
    
}


exports.getTotalOfYear = async(req,res)=>{
    const amount  = await YearTotal.findOne({}).select({"_id":0})
    console.log(amount)
    res.send(JSON.stringify(amount) );
    res.status(200)
}