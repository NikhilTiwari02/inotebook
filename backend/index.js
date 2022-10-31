const connectToMongo=require("./db");
// const Schema=mongoose;
const cors=require('cors');
const express=require('express');
const User=require("./models/User");
const app=express();
const auth=require('./routes/auth');
const notesrouter=require('./routes/noteroutes')
connectToMongo();//connectMongodb
//parsing the request to json
app.use(cors());
app.use(express.json()); 
app.use('/api/auth',auth);
app.use('/api/notes/',notesrouter);
app.get('/',(req,res)=>{
    res.send("hello world");
})
//listening at port 3000
app.listen(4000,()=>{
    console.log("listening on port 4000");
})