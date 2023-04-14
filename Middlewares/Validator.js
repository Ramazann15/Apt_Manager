const joi = require("joi")
const jwt = require('jsonwebtoken');
const Admin = require("../Model/Admin");

exports.validateExpense = async (req,res,next)=>{
    try{
        await joi.object({
            electricity_bill : joi.number().min(0).max(99999999999).required(),
            elevator_maintenance : joi.number().min(0).max(99999999999).required(),
            total : joi.number().min(0).max(99999999999).required(),
            ExpenseMonth:joi.string().pattern(new RegExp('[0-123456789]')).required(),
            amount_collected:joi.number().min(0).max(99999999999).required(),
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
            fee_to_pay:  joi.number().min(0).max(99999999999).required(),
            bringerMonth :joi.number().min(0).max(99999999999).required(),
        }).validateAsync(req.body)
        next();
    }
    catch(err){
        console.log(err)
        return res.status(400).send('Bad Request(400)');
        
    }
}

exports.Authorization = async (req, res, next) => {
    const token = req.header("Authorization");
    console.log(token);
  
    if (!token) {
      res.status(400).send(" token not found");
      return; 
    }
  
    let decompileToken;
    try {
      jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, function (err, decoded) {
        if (err) throw new Error(err);
        decompileToken = decoded;
      });
    } catch (error) {
      res.status(400).send("invalid token ");
      return; 
    }
  
    if (!decompileToken) {
      res.status(400).send("token  decompile error");
      return; 
    }
  
    const result = await Admin.find({ Name: decompileToken.Name }).select({ Name: 1, _id: 0 });
  
    global.name = result[0].Name;
  
    next();
  };
