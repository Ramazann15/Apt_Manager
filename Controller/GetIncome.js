const Income = require("../Model/Income")



exports.PersonIncomes = async (req,res)=>{
    const person = req.body.person

    const personIncome = await Income.find({bringer: person})

    console.log(personIncome)

    res.send(JSON.stringify(personIncome))
    res.status(200)
}
