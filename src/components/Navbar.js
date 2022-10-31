import react from 'react'
import {Link} from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar=()=>{
  const location=useLocation();
  //logout feature
  const navigate=useNavigate();
  const onclick=(event)=>{
     localStorage.removeItem('token');
     navigate('/login');
  }
    return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active" :""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active" :""}`} to="/about">About</Link>
        </li>
      </ul>
    </div>
    {!localStorage.getItem('token')?<form className="d-flex">
     <Link className="btn btn-outline-light mx-2" to="/login" role="button">Login</Link> 
     <Link className="btn btn-outline-light" to="/signup" role="button">Signup</Link>
    </form>: <button className='btn btn-outline-light' onClick={onclick}>logout</button>}
  </div>
</nav>
    )
}
export default Navbar