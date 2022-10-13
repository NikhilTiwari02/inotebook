const express =require('express');
const User=require('../models/User');//importing model to save data
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secret="welcometoprogramming";
//secret used in jwt token
const fetchuser=require('../middleware/token')
const {body,validationResult}=require('express-validator');
//express validator for validation
const { json } = require('express');
router.post('/create',body('email').isEmail().withMessage('must be valid email address'),
body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
body('name').isLength({min:3}).withMessage('must be at least 3 chars long'),
async (req,res)=>{  
  //async then only we can use await for promises
  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    //if error occur
    return res.status(400).json({ errors: errors.array() });
  }
    //to await for promist to resolve but function should be async to make it await
  const salt=await bcrypt.genSalt(10);
  const secpass=await bcrypt.hash(req.body.password,salt);
  //generating secret hash using salt with password
  const user= User.create({ //User is imported form models
        name: req.body.name,
        password: secpass,
        email: req.body.email
        
      }).then(user => res.json(user)).catch((error)=>{
        // console.log(secpass);
        res.status(400).json({"error":"email already exist"})});
       const data={
           user:{
             id:user.id
           }}
    const token=jwt.sign(data,secret);
    console.log(token);
})
// creating /login for user login
// validation email should be valid and password cannot be blank

router.post('/login',body('email').isEmail().withMessage('enter the correct email address'),body('password').exists().withMessage("Password cannot be blank"),
async (req,res)=>{
  // if validation error occurs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try{
  const user=await User.findOne({email});
  if(!user)
  {
    return res.status(400).json("Enter email doesn't exist");
  }
  const comp= await bcrypt.compare(password,user.password);
  // console.log(comp)
  if(!comp)
  {
    return res.status(400).json("incorrect password");
  }
  const data={
      user:{
        id:user.id
      }
  }
  const token=jwt.sign(data,secret)
  res.send(token);
}
catch(error)
  {
       res.status(400).json({
         "error":"some error occured"
       })
  }
})

// getting detail of logged in user
// login is required for this purpose
router.get('/getuserdetail',fetchuser,async (req,res)=>{
  const id=req.user.id;
  const user=await User.findOne({id})
  res.send(user);
})
module.exports=router;//exporting the router to use to it index.js