const mongoose = require("mongoose");

const schema = mongoose.Schema;

const PersonSchema = new schema({
    name:{
        type:String,
        required : true,
    },
    flat_number:{
        type:String,
        required : true,
    },
    phone_number:{
        type:String,
        required : true,
    },
    fee_to_pay:{
        type:String,
        required : true,
    }
})

const Person = mongoose.model("Person",PersonSchema);
module.exports = Person;