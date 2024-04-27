const mongoose = require('mongoose')

async function connectDB() {
    try{
        // mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
       await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongo db is connect to node");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB