const joi = require("joi")


module.exports = async (req,res,next)=>{
    try{
        await joi.object({
            electricity_bill : joi.number().min(0).max(99999999999).required(),
            elevator_maintenance : joi.number().min(0).max(99999999999).required(),
            total : joi.number().min(0).max(99999999999).required(),
            bringerMonth:joi.string().pattern(new RegExp('[0-12]')).required(),
            amount_collected:joi.string().pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]')).required(),
            date: joi.string().pattern(new RegExp('[0-12]')).required(),
            extra_expenses : joi.object()

        }).validateAsync(req.body)
        next();
    }
    catch(err){
        console.log(err)
        return res.status(400).send('Bad Request(400)');
        
    }
}