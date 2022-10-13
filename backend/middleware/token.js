const jwt=require('jsonwebtoken')
const secret="welcometoprogramming";
const fetchuser=(req,res,next)=>{
      const token=req.header('auth-token');
      if(!token)
      {
         return res.status(401).send({error:"please get logged in with us"});
      }
      try{
      const data=jwt.verify(token,secret);
      req.user=data.user;
      }
      catch(error){
        //   console.log(error)
          return res.status(401).send({error:"some error occured"});
      }
      next();
}
module.exports=fetchuser;