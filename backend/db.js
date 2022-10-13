const mongoose=require("mongoose");
const mongoURL="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const connectMongoose=()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("connected to Mongodb successfully");
    })
}
module.exports=connectMongoose;