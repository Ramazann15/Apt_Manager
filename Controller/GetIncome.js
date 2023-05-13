const Income = require("../Model/Income")



exports.PersonIncomes = async (req,res)=>{
    const person = req.body.person
    const lessMonth = req.body.lessMonth
    const greaterMonth = req.body.greaterMonth


    console.log(lessMonth)

    const personIncome = await Income.find({
        $and:[
            {bringer: person},
            {bringerMonth :{
                $gte:greaterMonth,
                $lte : lessMonth
            }}
        ]
    })

    console.log(personIncome)

    res.send(JSON.stringify(personIncome))
    res.status(200)
}
