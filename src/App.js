import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/home";
import About from "./components/about";
// import { Component } from 'react';
function App() {
  return (
    
    <Router>
           <div className="app">
            <Navbar/>
            <Routes>
            <Route path="/" 
            element={<Home/>} />
            <Route path="/about" element={<About/>}/>
            </Routes>
            </div>
    </Router>
  );
}

export default App;
