import react, { useContext } from "react";
import Contextvalue from "../context/notes/NoteContext";

const Home = () => {
  const { notes, state } = useContext(Contextvalue);
  return (
    <div>
      <div className="card text-center mx-5">
        <div className="card-header">Featured</div>
        <div className="card-body">
          <h5 className="card-title">{notes[0].title}</h5>
          <p className="card-text">
            {notes[0].description}
          </p>
          <a href="#" className="btn btn-primary">
            readmore         
            </a>
        </div>
        <div className="card-footer text-muted">{notes[0].date}</div>
      </div>
    </div>
  );
};
export default Home;
