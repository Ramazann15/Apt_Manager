const Admin = require("../Model/Admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Login = async (req,res)=>{

    try{
        const admin = await Admin.findOne({Name : req.body.Name});
      
     
        if(!admin){
            res.status(404);
            res.send("nope")
            return
        }

        console.log("Hello")
        bcrypt.compare(req.body.password,admin.password,(err, same)=>{
            console.log("Hello")
            console.log(same)
                if(same){
                    const key = process.env.SECRET_KEY
                    const token = jwt.sign({Name :  admin.Name},key,{ expiresIn: '31536000000' })
                    res.send(JSON.stringify(token))
     
                    console.log("Hello")
                    
                }
                if(!same){
                    res.send("password noting match").status(404)
                }
                if(err){
                    console.log(err)
                }
            })
        
       
    }
    catch(error){
        console.log(error);
    }
}

exports.CreateAdmin = async (req,res)=>{
    await Admin.create(req.body)
    res.status(201)
    res.send("success")
}

exports.ResetPassword = async ( req ,res )=>{
    try{
        const admin = await Admin.findOne({Name : req.body.Name});
        const Password = req.body.password
        if(admin){
            bcrypt.genSalt(10, function(err, salt) {
                if (err) return next(err);
                bcrypt.hash(Password, salt, function(err, hash) {
                    if (err) return next(err);
                    Password = hash;
                    next();
                });
            });
        }

        admin.password = Password
        res.status(200);
    }
    catch(error){
        console.log(error);
    }
}
