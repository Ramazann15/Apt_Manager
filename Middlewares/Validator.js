const joi = require("joi")


exports.validateExpense = async (req,res,next)=>{
    try{
        await joi.object({
            electricity_bill : joi.number().min(0).max(99999999999).required(),
            elevator_maintenance : joi.number().min(0).max(99999999999).required(),
            total : joi.number().min(0).max(99999999999).required(),
            bringerMonth:joi.string().pattern(new RegExp('[0-123456789]')).required(),
            amount_collected:joi.string().pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]')).required(),
            extra_expenses : joi.object()

        }).validateAsync(req.body)
        next();
    }
    catch(err){
        console.log(err)
        return res.status(400).send('Bad Request(400)');
        
    }
}

exports.validateIncome = async (req,res,next)=>{
    try{
        await joi.object({
            person: joi.string().pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]')).required(),
            amount : joi.number().min(0).max(99999999999).required(),
            bringerMonth:joi.string().pattern(new RegExp('[0-123456789]')).required(),
            receiver:joi.string().pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]')).required(),

        }).validateAsync(req.body)
        next();
    }
    catch(err){
        console.log(err)
        return res.status(400).send('Bad Request(400)');
        
    }
}