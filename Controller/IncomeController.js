const Income = require("../Model/Income");
const mongoose = require('mongoose');

const now = new Date().toLocaleDateString();
const month  = new Date().getMonth() + 1;

exports.addIncome = async (req,res)=>{

    

    //gelen veriler db ye eklendi
    const income = await Income.create(
        {
            receiver:req.body.receiver,
            bringer:req.body.person,
            amount:req.body.amount,
            date:now,
            bringerMonth : month

        }
    )

    delete month , now ;


    res.status(201)
    res.send(JSON.stringify(income))
}

