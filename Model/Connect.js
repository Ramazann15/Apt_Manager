const mongoose = require("mongoose");

const url = process.env.MONGO_DB_KEY;
exports.connectDatabase =()=>{
    mongoose.connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )

    .then(() => {
        console.log('DB connected Successfuly');
      })
      .catch((err) => {
        console.log(err);
      });
}
