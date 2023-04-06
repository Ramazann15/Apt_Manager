const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const AdminSchema = new schema({
    Name:{
        type:String,
        required : true,
    },
    password:{
        type:String,
        required : true,
    }


})
AdminSchema.pre("save",function(next){
    const admin = this

    if (!admin.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(admin.password, salt, function(err, hash) {
            if (err) return next(err);
            admin.password = hash;
            next();
        });
    });

})

const Admin = mongoose.model("Admin",AdminSchema);
module.exports = Admin;