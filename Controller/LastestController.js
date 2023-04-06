const Income = require("../Model/Income");
const Expense = require("../Model/Expense")
const Person = require("../Model/Person");

exports.lastestProcess = async  (req,res)=>{
    //en son gelir arandı
    const getLastIncomes = await Income.find().sort({_id: -1}).limit(9).select(
        {
            "bringerMonth": 0 ,
            "_id":0,
            "receiver":0
        }
    );

    //en son gider arandı
    const getLastExpenses = await Expense.find().sort({_id: -1}).limit(9).select(
        {
            "amount_collected": 0 ,
            "ExpenseMonth":0,
            "receiver":0,
            "_id":0,
        }
    );



    let lastestProcess =[]
    //geliri lastestProcess array'ine pushlandı
    Object.keys(getLastIncomes).map(key => {
        lastestProcess.push(getLastIncomes[key])
    })
    //gider lastestProcess array'ine pushlandı
    Object.keys(getLastExpenses).map(key => {
        lastestProcess.push(getLastExpenses[key])
    })


    //tarihe göre sıralanadı
    lastestProcess.sort((a,b) =>{
        const dateA = new Date(a.date.split('.').reverse().join('-'));
        const dateB = new Date(b.date.split('.').reverse().join('-'));
        return dateB - dateA;
    })

    delete lastestProcess;

    res.send(JSON.stringify(lastestProcess))

}