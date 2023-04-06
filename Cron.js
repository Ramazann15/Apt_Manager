const cron = require('node-cron');


const Person = require("./Model/Person");
const Income = require("./Model/Income")
const Expense = require("./Model/Expense")
const TotalAmount = require("./Model/TotalAmount")
const Total = require("./Controller/GetTotalIncomeAndExpense")



async function  startCronJob() {


  cron.schedule('59 23 28-31 * *', async() => {
   
    const date = new Date();
  
    const getAmount = await Income.find({bringerMonth : String(`${date.getMonth() + 1}.${date.getFullYear()}`)}).select({ "_id":0})
    const getPerson = await Person.find({}).select({"_id":0})
    const getExpense = await Expense.find({ExpenseMonth : String(`${date.getMonth() + 1}.${date.getFullYear()}`)}).select({"total": 1 , "_id":0})
    

    const amount =  Total.getTotalIncomeAndExpense( getAmount ,"TotalIncome")


   
    const Totalamount = await TotalAmount.findOne({})
    console.log(Totalamount)
    console.log(Totalamount)
    Totalamount.Expense = getExpense[0].total
    Totalamount.Income = amount
    Totalamount.amount = amount - getExpense[0].total
    Totalamount.save();
   



    const those_who_do_not_pay = [];
  
    for (let i = 0; i < getPerson.length; i++) {
  
      let nameFound = false;
  
      for (let j = 0; j < getAmount.length; j++) {
  
        if (getPerson[i].name === getAmount[j].bringer) {
          nameFound = true;
          break;
        }
  
      }
  
      if (!nameFound) {
        those_who_do_not_pay.push(getPerson[i]);
      }
    }

    if(!those_who_do_not_pay.length == 0){
      
      those_who_do_not_pay.map( async (key) => {
        await Income.create(
          {
              receiver:"BOT",
              bringer:key.name,
              amount:"0",
              date:date.toLocaleDateString(),
              bringerMonth : String(`${date.getMonth() + 1}.${date.getFullYear()}`),
              fee_to_pay: key.fee_to_pay,
              isBring : false
  
          }
      );

      try{
        const Incomeperson = await Income.findOne({bringer : key.name})
        Incomeperson.fee_to_pay = String(parseInt(Incomeperson.fee_to_pay)  + parseInt(Incomeperson.fee_to_pay))  ;
        Incomeperson.save();
        console.log(Incomeperson);
      }
      catch(error){
        console.log(error);
      }

    }
    
      
    )
    }
  
    console.log(those_who_do_not_pay)

    console.log('Cron job is running...');

    


  });
}

module.exports = {
  startCronJob,
};