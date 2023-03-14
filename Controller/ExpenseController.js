const Expense = require("../Model/Expense")

exports.addExpense =async  (req,res)=>{
    try{
        const expense = await Expense.create(req.body);
        res.status(201);
        res.send(JSON.stringify(expense))
        console.log(expense);
    }
    catch(error){
        console.log(error);
    }
}


