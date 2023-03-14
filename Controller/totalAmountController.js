const Income = require("../Model/Income");
const Expense = require("../Model/Expense");

let amount ,expense;



const getTotalIncomeAndExpense = async (req , value)=>{
   

    if(value === "TotalIncome"){

        //aya göre filtreleme yapıldı.
        const getAmount = await Income.find({bringerMonth : req}).select({"amount": 1 , "_id":0})

        if(!getAmount.length == 0){
            //gelen obje ilk olarak array'e dönüştürüldü sonra toplandı.
            amount  = Object.keys(getAmount).map(key => parseInt(getAmount[key].amount)).reduce( (accumulator,value) => accumulator + value);

            delete getAmount
        
            return amount
        }

        return 0

        
    }

    //aya göre filtreleme yapıldı.
    const getExpense = await Expense.find({ExpenseMonth : req}).select({"total": 1 , "_id":0})


    if(!getExpense.length == 0){
        //gelen obje ilk olarak array'e dönüştürüldü sonra toplandı.
        expense  = Object.keys(getExpense).map(key => parseInt(getExpense[key].total)).reduce( (accumulator,value) => accumulator + value);
        

        delete getExpense

        return expense 
    }
   
    return 0
    

}



exports.getTotalIncome = async (req,res)=>{
    console.log(req.body)
    const amount = await getTotalIncomeAndExpense(req.body.month ,"TotalIncome")

    res.send(JSON.stringify(amount))
    res.status(200)
}

exports.getTotalExpense = async (req,res)=>{
    
    const expense = await  getTotalIncomeAndExpense(req.body.month)


    res.send(JSON.stringify(expense))
    res.status(200)
}


exports.getaccumulating =  async(req,res)=>{
    const expense = await getTotalIncomeAndExpense(req.body.month)
    const amount = await getTotalIncomeAndExpense(req.body.month ,"TotalIncome")

  
    res.send(JSON.stringify(amount  - expense) );
    res.status(200)

}