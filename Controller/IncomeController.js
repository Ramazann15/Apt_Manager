const Income = require("../Model/Income");
const mongoose = require('mongoose');

const now = new Date().toLocaleDateString();
const month  = new Date().getMonth() + 1;

exports.addIncome = async (req,res)=>{

    let  lastmonthIncome = await Income.find({bringer : req.body.person ,bringerMonth : req.body.bringerMonth - 1 }).select({ "_id":0 ,"isBring": 1 , fee_to_pay : 1})
    
    if(lastmonthIncome.length == 0  ){
        lastmonthIncome = [
            {
                isBring : true
            }
        ]
    }

    //gelen veriler db ye eklendi
    const income = await Income.create(
        {
            receiver:global.name,
            bringer:req.body.person,
            amount:req.body.amount,
            date:now,
            bringerMonth : req.body.bringerMonth,
            fee_to_pay:lastmonthIncome[0].isBring ? req.body.fee_to_pay : parseInt(lastmonthIncome[0].fee_to_pay) - req.body.amount + parseInt(req.body.fee_to_pay) ,
            isBring: true,
            
        }
    )

    delete month , now ;


    res.status(201)
    res.send(JSON.stringify(income))
}

