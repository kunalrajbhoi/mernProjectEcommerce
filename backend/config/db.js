const mongoose = require('mongoose')

async function connectDB() {
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
        console.log("mongo db is connect to node");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB