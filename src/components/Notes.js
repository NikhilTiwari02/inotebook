import { useContext,useState, useEffect, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import { useNavigate} from "react-router-dom";
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getnotes,editnote } = context;
  const navigate=useNavigate();
  //useeffect load the all the notes from database
  useEffect(() => {
    if(localStorage.getItem('token')){
        getnotes();
        console.log(notes)
    }
    else{ 
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);


  //use ref for refering the button to toggle modal
  const ref=useRef(null);
  const refclose=useRef(null);
// use state hook to update note
  const [note,setnote]=useState({eid:"",etitle:"",edescription:"",etag:""})
  // udpate note is called by on clicking the edit symbol
  const updatenote = (note) => {
      console.log("onclick update is working");
      //ref.current.clcik will click demo modal button logically
      ref.current.click();
      setnote({eid:note._id,etitle:note.title,edescription:note.description,etag:note.tag});
  };
const onsubmit=(e)=>{
//   e.preventDefault();
    console.log(note);
    editnote(note.eid,note.etitle,note.edescription,note.etag);
    refclose.current.click();
}
  const onchange=(e)=>{
    console.log("onchange working");
    setnote({...note,[e.target.name]:e.target.value});
  }
  return (
    <>
      {/* <!-- Button trigger modal --> */}
<button  ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form className="my-3">
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Title</label>
    <input type="text" className="form-control" value={note.etitle} onChange={onchange} id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Enter Title"/>
  </div>
  <div className="form-group">
    <label htmlFor="edescription">Description</label>
    <input type="text" className="form-control" value={note.edescription} onChange={onchange} id="edescription" name="edescription" placeholder="description"/>
  </div>
  <div className="form-group">
    <label htmlFor="tag">Tag</label>
    <input type="text" className="form-control" value={note.etag} onChange={onchange} id="etag" name="etag" placeholder="tag"/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refclose} className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={onsubmit}>Update note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <h4 className="container">
        {notes.length===0 && "No Notes to display" }
        </h4>
        {notes.map((note) => {
            //  console.log(note);
          return  <Noteitem key={note._id} note={note} updatenote={updatenote} />
        })}  
      </div>
    </>
  );
};
export default Notes;
