const Income = require("../Model/Income");

const now = new Date().toLocaleDateString();


exports.addIncome = async (req,res)=>{

    const month  = new Date().getMonth() + 1;

    const income = await Income.create(
        {
            receiver:req.body.receiver,
            bringer:req.body.personid,
            amount:req.body.amount,
            income_date:now,
            bringerMonth : month

        }
    )

    delete month , now ;


    res.status(201)
    res.send(JSON.stringify(income))
}

