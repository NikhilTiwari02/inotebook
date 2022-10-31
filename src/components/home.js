import react, { useContext, useState } from "react";
import Notes from "./Notes";
import NoteContext from '../context/notes/NoteContext'
const Home = (props) => {
   const {showalert}=props;
  const {addnote}=useContext(NoteContext);
const [note,setnote]=useState({title:"",description:"",tag:""})
const onsubmit=(e)=>{
  e.preventDefault();
  console.log("adding notes");
  // console.log(note)
  setnote({title:"",description:"",tag:""})
  addnote(note.title,note.description,note.tag);
  showalert(" note successfully added","success");
}
const onchange=(e)=>{
  console.log("onchange working");
  setnote({...note,[e.target.name]:e.target.value});
}
  return (
   <div className="container">
  <form className="my-3">
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Title</label>
    <input type="text" className="form-control" onChange={onchange} id="title" name="title" aria-describedby="emailHelp" placeholder="Enter Title" value={note.title}/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control" onChange={onchange} id="description" name="description" placeholder="description" value={note.description}/>
  </div>
  <div className="form-group">
    <label htmlFor="tag">Tag</label>
    <input type="text" className="form-control" onChange={onchange} id="tag" name="tag" placeholder="tag" value={note.tag}/>
  </div>
  <button type="submit"  disabled={note.title.length<5 || note.description.length<10}onClick={onsubmit} className="btn btn-primary my-3">Add note</button>
</form>
     <Notes/>
    </div>
  );
};
export default Home;
