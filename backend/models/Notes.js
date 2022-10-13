const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const noteSchema=new Schema({
    user:{
       type:Schema.Types.ObjectId,
       ref:'users'// reference model 
    },
    title:{
        type : String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag :{
        type :String,
    },
    date:{
      type :Date,
      default:Date.now()
    }
});
module.exports=mongoose.model('Note',noteSchema);