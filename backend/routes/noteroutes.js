const express=require("express");
const fetchuser = require("../middleware/token");
const router=express.Router();
const Notes=require('../models/Notes');
const {body,validationResult}=require('express-validator');
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
      const allnotes=await Notes.find({user:req.user.id});
      res.json(allnotes);
});
// add new notes to the database of that person
router.post('/addnotes',fetchuser,body('title').isLength({min:3}).withMessage('Title should be of length 3'),body('description').isLength({min:10}).withMessage("Description should be of length 10"),async(req,res)=>{
    try{
    const errors=validationResult(req);
    if (!errors.isEmpty()) { 
        //if error occur
        return res.status(400).json({ errors: errors.array() });
      }
    const {title,description,tag}=req.body;
    const note=new Notes({title,description,tag,user:req.user.id});
    const savenotes=await note.save();
    res.json(savenotes);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("interval server error");
    }
})

// update notes of a user
router.put('/updatenote/:id',fetchuser,body('title').isLength({min:3}).withMessage('Title should be of length 3'),body('description').isLength({min:10}).withMessage("Description should be of length 10"),async(req,res)=>{
    try{
    const {title,tag,description}=req.body;
    let newnote={"title":title,
   "tag":tag,
   "description":description};
   // check if note exist for that particular person
    let note=await Notes.findById(req.params.id);
    console.log(req.params.id)
    if(!note)
    return res.status(404).send("Note Not Found");
    //check for note belong to same user or not
    if(note.user.toString()!==req.user.id)
     return res.status(401).send("Not allowed");
    //find by id and update
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json(note);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("internal sever error");
    }
})
//delete note
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try{
    const note=await Notes.findById(req.params.id);
    console.log(note)
    if(!note)
    return res.status(404).send("Not found");
    if(note.user.toString()!==req.user.id)
      return res.status(401).send("cannot delete");
    let deleted=await Notes.findByIdAndDelete(req.params.id);
    res.status(200).send("successfully deleted");
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("internal server error");
    }
})
module.exports=router;