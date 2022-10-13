import React, { useState } from "react";
import { createContext } from "react";
import noteContext from "./notecontext";
const Notestate=(props)=>{
    const noteIntial=[
            {"_id":"63413b3ec2a56070b5cb8727",
            "user":"63412180750972de02aa9857",
            "title":"daily routine",
            "description":"my daily routine as follows",
            "tag":"routine personal"
            ,"date":"2022-10-08T08:46:08.611Z",
            "__v":0}
    ]
    const {notes,setnotes}=useState(noteIntial);
   return (
       <Notestate.provider value={notes,setnotes}>
         {props.children}
       </Notestate.provider>
   )
}
export default Notestate;