const Person = require("../Model/Person");

exports.createPerson = async (req,res)=>{
    try{
        const person = await Person.create(req.body);
        res.status(201);
        res.send(JSON.stringify(person))
        console.log(person);
    }
    catch(error){
        console.log(error);
    }
}

exports.editPerson = async (req,res)=>{
    try{
        const person = await Person.findById(req.query.id);


        person.name = req.body.name;
        person.flat_number = req.body.flat_number;
        person.phone_number = req.body.phone_number;
        person.fee_to_pay = req.body.fee_to_pay;

        person.save();

        console.log(person);
        res.send(JSON.stringify(person))
        res.status(200)
    }
    catch(error){
        console.log(error);
    }
}