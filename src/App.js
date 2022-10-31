import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useState} from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/home";
import About from "./components/about";
import Notestate from './context/notes/noteState';
import Login from './components/login';
import Signup from './components/signup';
import Alert from './components/alert';
// import { Component } from 'react';
function App() {
  const [alert,setalert]=useState({type:"",message:""});
  const showalert=(message,type)=>
  { 
    // console.log(message,type);
     setalert({message,type});
     setTimeout(()=>{
       setalert({type:"",message:""});
     },1500);
  }
  return (
    <Notestate>
      {/* wrapping up inside notestate variable so that everyy children and grand children can access these value */}
    <Router>
           <div className="app">
            <Navbar/>
            <Alert alert={alert}/>
            <Routes>
            <Route path="/" element={<Home showalert={showalert}/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login showalert={showalert}/>}/>
            <Route path="/signup" element={<Signup showalert={showalert}/>}/>
            </Routes>
            </div>
    </Router>
    </Notestate>
  );
}

export default App;
