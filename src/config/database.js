const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://rajith:bGoq37QG@namastenode.wlqtr.mongodb.net/devTinder")
}


module.exports = connectDB;