import React, { useState } from "react";
import { createContext } from "react";
import NoteContext from "./NoteContext";
const Notestate = (props) => {
  const noteIntial = [
    {
      _id: "63413b3ec2a56070b5cb8727",
      user: "63412180750972de02aa9857",
      title: "daily routine",
      description: "my daily routine as follows",
      tag: "routine personal",
      date: "2022-10-08T08:46:08.611Z",
      __v: 0,
    },
    {
      _id: "63413b3ec2a56070b5cb8727",
      user: "63412180750972de02aa9857",
      title: "daily routine",
      description: "my daily routine as follows",
      tag: "routine personal",
      date: "2022-10-08T08:46:08.611Z",
      __v: 0,
    }
  ]
  const [notes,notestate]=useState(noteIntial);
  return (
    <NoteContext.Provider value={{notes,notestate}}>
      {props.children}
    </NoteContext.Provider>
  )
};
export default Notestate;
