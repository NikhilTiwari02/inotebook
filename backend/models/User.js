const mongoose=require('mongoose');
// const { default: mongoose } = require("mongoose");
const Schema=mongoose.Schema;//importing schema from mongoose
const userSchema=new Schema({
   name:{
       type :String,
       required:true
   },
   email:{
       type :String,
       required:true,
       unique:true
   },
   password:{
       type:String,
       required:true
   },
   date:{
       type :Date,
       default :Date.now
   }
});
module.exports=mongoose.model('user',userSchema);//exporting the model