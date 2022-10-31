import React, { useState } from "react";
// import { createContext } from "react";
import NoteContext from "./NoteContext";
const host="http://localhost:4000"
const Notestate = (props) => {
  const noteIntial = []
  const [notes,notestate]=useState(noteIntial);
  const getnotes=async ()=>{
    const response= await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
      'Content-Type':'application/json',
      'auth-token':localStorage.getItem('token')
      },
  });
   const json=await response.json();
   notestate(json);
  }
  const addnote=async(title,desc,tag)=>{
    const response=await fetch(`${host}/api/notes/addnotes`,{
      method:'POST',
      headers:{
      'Content-Type':'application/json',
      'auth-token':localStorage.getItem('token')
      },
    body:JSON.stringify({'title':title,"description":desc,"tag":tag})
  });
   const note=await response.json();
   notestate(notes.concat(note));
    //notes.concat returns a new note to update usestate we have to give a new copy 
  }
  const deletenote=async(id)=>{
    const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
      'Content-Type':'application/json',
      'auth-token':localStorage.getItem('token')
      },
    // body:JSON.stringify({'title':title,"description":desc,"tag":tag})
    });
    const newnote=notes.filter((note)=>{return note._id!==id});
     notestate(newnote)
  }
  const editnote=async(id,title,desc,tag)=>{ 
      //api call
      const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
        },
      body:JSON.stringify({'title':title,"description":desc,"tag":tag})
    });
    //  const json=response.json();
    const newnotes=JSON.parse(JSON.stringify(notes));
  for(let index=0;index<notes.length;index++)
    {  
      const element=newnotes[index];
      if(element._id===id)
      {
        newnotes[index].title=title;
        newnotes[index].description=desc;
        newnotes[index].tag=tag;
        break;
      }
    }
    notestate(newnotes);
  }
  return (
    <NoteContext.Provider value={{notes,notestate,addnote,deletenote,getnotes,editnote}}>
      {props.children}
    </NoteContext.Provider>
  )
};
export default Notestate;
