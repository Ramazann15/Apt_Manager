const Expense = require("../Model/Expense")

const now = new Date().toLocaleDateString();
const month  = new Date().getMonth() + 1;


exports.addExpense =async  (req,res)=>{
    try{
        //gelen veriler db ye eklendi
        const expense = await Expense.create({
            electricity_bill : req.body.electricity_bill,
            elevator_maintenance : req.body.elevator_maintenance,
            total : req.body.total,
            bringerMonth : month,
            amount_collected : req.body.amount_collected,
            date: now,
            extra_expenses : req.body.extra_expenses

        });
        res.status(201);
        res.send(JSON.stringify(expense))
        console.log(expense);
        delete now,month
    }
    catch(error){
        console.log(error);
    }
}


