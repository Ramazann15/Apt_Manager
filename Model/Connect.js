const mongoose = require("mongoose");

const url = process.env.MONGO_DB_KEY;
exports.connectDatabase = async ()=>{
  try {
    await  mongoose.connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    console.log('DB connected Successfuly');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
    


}
